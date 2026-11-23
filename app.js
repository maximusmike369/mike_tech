/* ==========================================================================
   Software Development & Tech Stack Capabilities — Interactive Controller
   ========================================================================== */

(function () {
  "use strict";

  const DATA = window.STACK_DATA;
  if (!DATA) return;

  const STORAGE_KEY = "maximus_stack_plate_v1";

  const state = {
    selectedPlatforms: new Set(),
    selectedTech: new Set(), // format: `${catId}::${item}`
    activeCategory: "all",
    searchQuery: "",
    activeGoalId: DATA.GOALS[0].id,
    goalViewMode: "interactive", // "interactive" | "matrix"
    drawerOpen: false
  };

  /* ------------------------------------------------------------------------
     DOM References
     ------------------------------------------------------------------------ */
  const els = {
    statTechCount: document.getElementById("stat-tech-count"),
    heroQuickPresets: document.getElementById("hero-quick-presets"),
    platformsGrid: document.getElementById("platforms-grid"),
    buffetTabs: document.getElementById("buffet-tabs"),
    buffetSearch: document.getElementById("buffet-search"),
    buffetSearchClear: document.getElementById("buffet-search-clear"),
    buffetMatchCount: document.getElementById("buffet-match-count"),
    buffetGrid: document.getElementById("buffet-grid"),
    buffetEmpty: document.getElementById("buffet-empty"),
    buffetResetBtn: document.getElementById("buffet-reset-btn"),
    viewInteractiveBtn: document.getElementById("view-interactive-btn"),
    viewMatrixBtn: document.getElementById("view-matrix-btn"),
    goalMatcherView: document.getElementById("goal-matcher-view"),
    goalMatrixView: document.getElementById("goal-matrix-view"),
    goalSelectorList: document.getElementById("goal-selector-list"),
    goalDetailPanel: document.getElementById("goal-detail-panel"),
    goalTableBody: document.getElementById("goal-table-body"),
    matrixMobileCards: document.getElementById("matrix-mobile-cards"),
    strengthsGrid: document.getElementById("strengths-grid"),
    headerPlateBtn: document.getElementById("header-plate-btn"),
    headerPlateCount: document.getElementById("header-plate-count"),
    mobilePlateBtn: document.getElementById("mobile-plate-btn"),
    mobilePlateCount: document.getElementById("mobile-plate-count"),
    ctaOpenPlateBtn: document.getElementById("cta-open-plate-btn"),
    ctaPlateCount: document.getElementById("cta-plate-count"),
    ctaPlateStatus: document.getElementById("cta-plate-status"),
    mobileMenuBtn: document.getElementById("mobile-menu-btn"),
    mobileNavPanel: document.getElementById("mobile-nav-panel"),
    drawerBackdrop: document.getElementById("drawer-backdrop"),
    plateDrawer: document.getElementById("plate-drawer"),
    drawerDragZone: document.getElementById("drawer-drag-zone"),
    drawerCloseBtn: document.getElementById("drawer-close-btn"),
    drawerBody: document.getElementById("drawer-body"),
    drawerCopyBtn: document.getElementById("drawer-copy-btn"),
    drawerClearBtn: document.getElementById("drawer-clear-btn"),
    toastContainer: document.getElementById("toast-container")
  };

  /* ------------------------------------------------------------------------
     Helpers
     ------------------------------------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function techKey(catId, item) {
    return `${catId}::${item}`;
  }

  function parseTechKey(key) {
    const idx = key.indexOf("::");
    return {
      catId: key.slice(0, idx),
      item: key.slice(idx + 2)
    };
  }

  function getTotalTechItems() {
    return DATA.TECH_CATEGORIES.reduce(
      (sum, cat) => sum + cat.groups.reduce((gSum, g) => gSum + g.items.length, 0),
      0
    );
  }

  function getCategoryCount(cat) {
    return cat.groups.reduce((sum, g) => sum + g.items.length, 0);
  }

  function getTotalSelectedCount() {
    return state.selectedPlatforms.size + state.selectedTech.size;
  }

  function saveState() {
    try {
      const payload = {
        platforms: Array.from(state.selectedPlatforms),
        tech: Array.from(state.selectedTech)
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (_) {
      // Ignore storage errors in restricted environments
    }
  }

  function loadState() {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.platforms)) {
        const validIds = new Set(DATA.PLATFORMS.map((p) => p.id));
        parsed.platforms.forEach((id) => {
          if (validIds.has(id)) state.selectedPlatforms.add(id);
        });
      }
      if (Array.isArray(parsed.tech)) {
        parsed.tech.forEach((k) => {
          if (typeof k === "string" && k.includes("::")) {
            state.selectedTech.add(k);
          }
        });
      }
    } catch (_) {
      // Ignore malformed storage
    }
  }

  let toastTimer = null;
  function showToast(message) {
    if (!els.toastContainer) return;
    els.toastContainer.innerHTML = "";
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<span class="toast-dot" aria-hidden="true"></span><span>${escapeHtml(message)}</span>`;
    els.toastContainer.appendChild(toast);

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.add("is-out");
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 250);
    }, 2600);
  }

  function popBadges() {
    [els.headerPlateCount, els.mobilePlateCount].forEach((badge) => {
      if (!badge) return;
      badge.classList.remove("is-pop");
      void badge.offsetWidth; // trigger reflow for replay
      badge.classList.add("is-pop");
      setTimeout(() => badge.classList.remove("is-pop"), 260);
    });
  }

  /* ------------------------------------------------------------------------
     Renderers
     ------------------------------------------------------------------------ */
  function renderHeroQuickPresets() {
    if (els.statTechCount) {
      els.statTechCount.textContent = `${getTotalTechItems()}+`;
    }
    if (!els.heroQuickPresets) return;
    els.heroQuickPresets.innerHTML = DATA.GOALS.map(
      (g) => `
        <button type="button" class="quick-preset-chip" data-load-preset="${escapeHtml(g.id)}">
          <span>+ ${escapeHtml(g.shortTitle)}</span>
        </button>
      `
    ).join("");
  }

  function renderPlatforms() {
    if (!els.platformsGrid) return;
    els.platformsGrid.innerHTML = DATA.PLATFORMS.map((p) => {
      const isAdded = state.selectedPlatforms.has(p.id);
      return `
        <article class="platform-card glass-surface accent-${p.accent}${isAdded ? " is-selected" : ""}">
          <div class="platform-top">
            <div class="icon-vessel">${DATA.ICONS[p.icon] || ""}</div>
            <span class="platform-badge">${escapeHtml(p.badge)}</span>
          </div>
          <h3 class="platform-title">${escapeHtml(p.title)}</h3>
          <p class="platform-desc">${p.descriptionHtml}</p>
          <div class="platform-highlights" aria-label="Key capabilities">
            ${p.highlights.map((h) => `<span class="mini-tag">${escapeHtml(h)}</span>`).join("")}
          </div>
          <div class="platform-footer">
            <button
              type="button"
              class="plate-toggle-btn${isAdded ? " is-added" : ""}"
              data-toggle-platform="${escapeHtml(p.id)}"
              aria-pressed="${isAdded}"
            >
              ${isAdded ? DATA.ICONS.check : DATA.ICONS.plus}
              <span>${isAdded ? "Added to Stack Plate" : "Add to Stack Plate"}</span>
            </button>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderBuffetTabs() {
    if (!els.buffetTabs) return;
    const total = getTotalTechItems();
    const tabsHtml = [
      `
        <button
          type="button"
          role="tab"
          class="buffet-tab${state.activeCategory === "all" ? " is-active" : ""}"
          aria-selected="${state.activeCategory === "all"}"
          data-category="all"
        >
          <span>All Categories</span>
          <span class="tab-count">${total}</span>
        </button>
      `,
      ...DATA.TECH_CATEGORIES.map((cat) => {
        const active = state.activeCategory === cat.id;
        return `
          <button
            type="button"
            role="tab"
            class="buffet-tab${active ? " is-active" : ""}"
            aria-selected="${active}"
            data-category="${escapeHtml(cat.id)}"
          >
            <span>${escapeHtml(cat.shortName)}</span>
            <span class="tab-count">${getCategoryCount(cat)}</span>
          </button>
        `;
      })
    ].join("");

    els.buffetTabs.innerHTML = tabsHtml;
  }

  function renderBuffetGrid() {
    if (!els.buffetGrid) return;
    const query = state.searchQuery.trim().toLowerCase();
    const categories =
      state.activeCategory === "all"
        ? DATA.TECH_CATEGORIES
        : DATA.TECH_CATEGORIES.filter((c) => c.id === state.activeCategory);

    let matchedItemsTotal = 0;
    const cardsHtml = [];

    categories.forEach((cat) => {
      const catMatchesQuery = query && cat.name.toLowerCase().includes(query);
      const filteredGroups = cat.groups
        .map((group) => {
          const groupMatchesQuery = query && group.title.toLowerCase().includes(query);
          const items =
            !query || catMatchesQuery || groupMatchesQuery
              ? group.items
              : group.items.filter((item) => item.toLowerCase().includes(query));
          return { title: group.title, items };
        })
        .filter((g) => g.items.length > 0);

      if (filteredGroups.length === 0) return;

      const catItemCount = filteredGroups.reduce((s, g) => s + g.items.length, 0);
      matchedItemsTotal += catItemCount;

      cardsHtml.push(`
        <article class="buffet-card glass-surface accent-${cat.accent}">
          <div class="buffet-card-header">
            <div class="icon-vessel">${DATA.ICONS[cat.icon] || ""}</div>
            <div>
              <h3 class="buffet-card-title">${escapeHtml(cat.name)}</h3>
              <p class="buffet-card-tagline">${escapeHtml(cat.tagline)}</p>
            </div>
          </div>
          <div class="buffet-groups">
            ${filteredGroups
              .map(
                (group) => `
                  <div class="buffet-group">
                    <h4 class="buffet-group-title">${escapeHtml(group.title)}</h4>
                    <div class="chip-cloud">
                      ${group.items
                        .map((item) => {
                          const key = techKey(cat.id, item);
                          const selected = state.selectedTech.has(key);
                          return `
                            <button
                              type="button"
                              class="tech-chip${selected ? " is-selected" : ""}"
                              data-toggle-tech="${escapeHtml(key)}"
                              aria-pressed="${selected}"
                            >
                              <span class="chip-indicator" aria-hidden="true">
                                ${selected ? DATA.ICONS.check : DATA.ICONS.plus}
                              </span>
                              <span>${escapeHtml(item)}</span>
                            </button>
                          `;
                        })
                        .join("")}
                    </div>
                  </div>
                `
              )
              .join("")}
          </div>
        </article>
      `);
    });

    els.buffetGrid.classList.toggle("is-single-category", cardsHtml.length === 1);
    els.buffetGrid.innerHTML = cardsHtml.join("");

    const hasMatches = matchedItemsTotal > 0;
    if (els.buffetEmpty) els.buffetEmpty.hidden = hasMatches;
    if (els.buffetMatchCount) {
      if (!query && state.activeCategory === "all") {
        els.buffetMatchCount.textContent = `Showing all ${matchedItemsTotal} items`;
      } else {
        els.buffetMatchCount.textContent = `${matchedItemsTotal} ${matchedItemsTotal === 1 ? "item" : "items"} shown`;
      }
    }
    if (els.buffetSearchClear) {
      els.buffetSearchClear.hidden = query.length === 0;
    }
  }

  function renderGoalMatcher() {
    if (!els.goalSelectorList || !els.goalDetailPanel) return;

    els.goalSelectorList.innerHTML = DATA.GOALS.map((g, idx) => {
      const isActive = g.id === state.activeGoalId;
      return `
        <button
          type="button"
          role="tab"
          class="goal-selector-btn accent-${g.accent}${isActive ? " is-active" : ""}"
          aria-selected="${isActive}"
          data-select-goal="${escapeHtml(g.id)}"
        >
          <span class="goal-btn-icon">${DATA.ICONS[g.icon] || ""}</span>
          <span class="goal-btn-text">
            <span class="goal-btn-kicker">Goal 0${idx + 1}</span>
            <span class="goal-btn-title">${escapeHtml(g.goal)}</span>
          </span>
          <span class="goal-btn-arrow" aria-hidden="true">${DATA.ICONS.arrowRight}</span>
        </button>
      `;
    }).join("");

    const activeGoal = DATA.GOALS.find((g) => g.id === state.activeGoalId) || DATA.GOALS[0];
    const flowHtml = activeGoal.stackParts
      .map((part, i) => {
        const sep = i < activeGoal.stackParts.length - 1 ? `<span class="flow-plus" aria-hidden="true">+</span>` : "";
        return `<span class="flow-pill">${escapeHtml(part)}</span>${sep}`;
      })
      .join("");

    els.goalDetailPanel.innerHTML = `
      <div class="goal-detail-top">
        <div class="icon-vessel">${DATA.ICONS[activeGoal.icon] || ""}</div>
        <div>
          <span class="section-tag">If Your Goal Is...</span>
          <h3 class="goal-detail-heading">${escapeHtml(activeGoal.goal)}</h3>
        </div>
      </div>

      <div class="goal-detail-block">
        <span class="goal-block-label">Look at These Stack Items</span>
        <div class="goal-flow-pills">${flowHtml}</div>
      </div>

      <div class="goal-detail-block">
        <span class="goal-block-label goal-block-label-orange">Typical Deliverable</span>
        <p class="goal-deliverable-text">${escapeHtml(activeGoal.deliverable)}</p>
      </div>

      <div class="goal-detail-actions">
        <button type="button" class="btn btn-orange" data-load-preset="${escapeHtml(activeGoal.id)}">
          ${DATA.ICONS.plus}
          <span>Load Preset into My Stack Plate</span>
        </button>
        <button type="button" class="btn btn-glass-blue btn-sm" data-open-plate="true">
          <span>View Stack Plate</span>
        </button>
      </div>
    `;
  }

  function renderGoalMatrix() {
    if (els.goalTableBody) {
      els.goalTableBody.innerHTML = DATA.GOALS.map(
        (g) => `
          <tr>
            <td class="table-goal-cell">${escapeHtml(g.goal)}</td>
            <td class="table-stack-cell">${escapeHtml(g.stackSummary)}</td>
            <td class="table-deliverable-cell">${escapeHtml(g.deliverable)}</td>
            <td class="col-action">
              <button type="button" class="btn btn-glass-blue btn-sm" data-load-preset="${escapeHtml(g.id)}">
                + Load Preset
              </button>
            </td>
          </tr>
        `
      ).join("");
    }

    if (els.matrixMobileCards) {
      els.matrixMobileCards.innerHTML = DATA.GOALS.map(
        (g) => `
          <article class="matrix-mobile-card glass-surface-strong">
            <div>
              <span class="goal-block-label">If Your Goal Is...</span>
              <h3>${escapeHtml(g.goal)}</h3>
            </div>
            <div>
              <span class="goal-block-label">Look at These Stack Items</span>
              <p>${escapeHtml(g.stackSummary)}</p>
            </div>
            <div>
              <span class="goal-block-label goal-block-label-orange">Typical Deliverable</span>
              <p><strong>${escapeHtml(g.deliverable)}</strong></p>
            </div>
            <button type="button" class="btn btn-orange btn-sm" data-load-preset="${escapeHtml(g.id)}">
              ${DATA.ICONS.plus}
              <span>Load Preset into My Plate</span>
            </button>
          </article>
        `
      ).join("");
    }
  }

  function renderStrengths() {
    if (!els.strengthsGrid) return;
    els.strengthsGrid.innerHTML = DATA.STRENGTHS.map(
      (s) => `
        <article class="strength-card glass-surface accent-${s.accent}">
          <div class="strength-top">
            <div class="icon-vessel">${DATA.ICONS[s.icon] || ""}</div>
            <span class="strength-num" aria-hidden="true">${escapeHtml(s.num)}</span>
          </div>
          <h3 class="strength-title">${escapeHtml(s.title)}</h3>
          <p class="strength-desc">${escapeHtml(s.description)}</p>
        </article>
      `
    ).join("");
  }

  function renderPlateCounters() {
    const count = getTotalSelectedCount();
    [els.headerPlateCount, els.mobilePlateCount, els.ctaPlateCount].forEach((node) => {
      if (node) node.textContent = String(count);
    });

    if (els.ctaPlateStatus) {
      if (count === 0) {
        els.ctaPlateStatus.textContent =
          "Pick platforms and technologies anywhere on this page—or load a Goal Preset—to generate a clean, shareable stack brief in one tap.";
      } else {
        const pCount = state.selectedPlatforms.size;
        const tCount = state.selectedTech.size;
        els.ctaPlateStatus.textContent = `You have ${pCount} ${pCount === 1 ? "platform" : "platforms"} and ${tCount} ${tCount === 1 ? "technology" : "technologies"} on your Stack Plate—ready to review or copy as a brief.`;
      }
    }
  }

  function renderDrawerBody() {
    if (!els.drawerBody) return;
    const total = getTotalSelectedCount();

    if (total === 0) {
      els.drawerBody.innerHTML = `
        <div class="drawer-empty">
          <h3>Your Stack Plate is empty</h3>
          <p>Tap any platform card or technology chip in the buffet, or start instantly with one of these proven goal presets:</p>
          <div class="drawer-preset-list">
            ${DATA.GOALS.map(
              (g) => `
                <button type="button" class="btn btn-glass-blue btn-sm" data-load-preset="${escapeHtml(g.id)}">
                  ${DATA.ICONS.plus}
                  <span>${escapeHtml(g.goal)}</span>
                </button>
              `
            ).join("")}
          </div>
        </div>
      `;
      if (els.drawerCopyBtn) els.drawerCopyBtn.disabled = true;
      if (els.drawerClearBtn) els.drawerClearBtn.disabled = true;
      return;
    }

    if (els.drawerCopyBtn) els.drawerCopyBtn.disabled = false;
    if (els.drawerClearBtn) els.drawerClearBtn.disabled = false;

    const sections = [];

    if (state.selectedPlatforms.size > 0) {
      const platformPills = DATA.PLATFORMS.filter((p) => state.selectedPlatforms.has(p.id))
        .map(
          (p) => `
            <span class="drawer-item-pill is-platform">
              <span>${escapeHtml(p.title)}</span>
              <button
                type="button"
                class="drawer-remove-btn"
                data-remove-platform="${escapeHtml(p.id)}"
                aria-label="Remove ${escapeHtml(p.title)}"
              >${DATA.ICONS.x}</button>
            </span>
          `
        )
        .join("");

      sections.push(`
        <div>
          <div class="drawer-section-label">
            <span>Selected Platforms</span>
            <span>${state.selectedPlatforms.size}</span>
          </div>
          <div class="drawer-chip-list">${platformPills}</div>
        </div>
      `);
    }

    // Group selected tech by category in natural display order
    DATA.TECH_CATEGORIES.forEach((cat) => {
      const catItems = [];
      state.selectedTech.forEach((key) => {
        const parsed = parseTechKey(key);
        if (parsed.catId === cat.id) catItems.push({ key, item: parsed.item });
      });

      if (catItems.length === 0) return;

      const pillsHtml = catItems
        .map(
          ({ key, item }) => `
            <span class="drawer-item-pill">
              <span>${escapeHtml(item)}</span>
              <button
                type="button"
                class="drawer-remove-btn"
                data-remove-tech="${escapeHtml(key)}"
                aria-label="Remove ${escapeHtml(item)}"
              >${DATA.ICONS.x}</button>
            </span>
          `
        )
        .join("");

      sections.push(`
        <div>
          <div class="drawer-section-label">
            <span>${escapeHtml(cat.name)}</span>
            <span>${catItems.length}</span>
          </div>
          <div class="drawer-chip-list">${pillsHtml}</div>
        </div>
      `);
    });

    els.drawerBody.innerHTML = sections.join("");
  }

  /* ------------------------------------------------------------------------
     State Mutations
     ------------------------------------------------------------------------ */
  function togglePlatform(id) {
    const platform = DATA.PLATFORMS.find((p) => p.id === id);
    if (!platform) return;

    if (state.selectedPlatforms.has(id)) {
      state.selectedPlatforms.delete(id);
      showToast(`Removed "${platform.badge}" from Stack Plate`);
    } else {
      state.selectedPlatforms.add(id);
      showToast(`Added "${platform.badge}" to Stack Plate`);
    }

    saveState();
    renderPlatforms();
    renderPlateCounters();
    renderDrawerBody();
    popBadges();
  }

  function toggleTech(key) {
    const { item } = parseTechKey(key);
    if (state.selectedTech.has(key)) {
      state.selectedTech.delete(key);
      showToast(`Removed ${item}`);
    } else {
      state.selectedTech.add(key);
      showToast(`Added ${item} to Stack Plate`);
    }

    saveState();
    renderBuffetGrid();
    renderPlateCounters();
    renderDrawerBody();
    popBadges();
  }

  function loadGoalPreset(goalId) {
    const goal = DATA.GOALS.find((g) => g.id === goalId);
    if (!goal) return;

    goal.presetPlatforms.forEach((pId) => state.selectedPlatforms.add(pId));
    goal.presetTech.forEach(({ cat, item }) => state.selectedTech.add(techKey(cat, item)));

    saveState();
    renderPlatforms();
    renderBuffetGrid();
    renderPlateCounters();
    renderDrawerBody();
    popBadges();
    showToast(`Loaded "${goal.shortTitle}" preset into Stack Plate`);
  }

  function clearPlate() {
    if (getTotalSelectedCount() === 0) return;
    state.selectedPlatforms.clear();
    state.selectedTech.clear();
    saveState();
    renderPlatforms();
    renderBuffetGrid();
    renderPlateCounters();
    renderDrawerBody();
    showToast("Cleared your Stack Plate");
  }

  function buildStackBriefText() {
    const lines = [
      "Software Development & Tech Stack Brief",
      "======================================="
    ];

    if (state.selectedPlatforms.size > 0) {
      lines.push("", "Platforms:");
      DATA.PLATFORMS.filter((p) => state.selectedPlatforms.has(p.id)).forEach((p) => {
        lines.push(`- ${p.title}`);
      });
    }

    DATA.TECH_CATEGORIES.forEach((cat) => {
      const items = [];
      state.selectedTech.forEach((key) => {
        const parsed = parseTechKey(key);
        if (parsed.catId === cat.id) items.push(parsed.item);
      });
      if (items.length > 0) {
        lines.push("", `${cat.name}:`);
        lines.push(`- ${items.join(", ")}`);
      }
    });

    return lines.join("\n");
  }

  async function copyStackBrief() {
    if (getTotalSelectedCount() === 0) {
      showToast("Add items to your Stack Plate first");
      return;
    }

    const text = buildStackBriefText();
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      showToast("Stack brief copied to clipboard!");
    } catch (_) {
      showToast("Could not copy automatically — please try again");
    }
  }

  /* ------------------------------------------------------------------------
     Drawer & Mobile Touch Controls
     ------------------------------------------------------------------------ */
  function openDrawer() {
    state.drawerOpen = true;
    closeMobileNav();
    renderDrawerBody();
    if (els.drawerBackdrop) {
      els.drawerBackdrop.hidden = false;
      requestAnimationFrame(() => els.drawerBackdrop.classList.add("is-open"));
    }
    if (els.plateDrawer) {
      els.plateDrawer.classList.add("is-open");
      els.plateDrawer.setAttribute("aria-hidden", "false");
    }
    document.body.classList.add("drawer-open");
    if (els.drawerCloseBtn) els.drawerCloseBtn.focus({ preventScroll: true });
  }

  function closeDrawer() {
    state.drawerOpen = false;
    if (els.plateDrawer) {
      els.plateDrawer.style.transform = "";
      els.plateDrawer.style.transition = "";
      els.plateDrawer.classList.remove("is-open");
      els.plateDrawer.setAttribute("aria-hidden", "true");
    }
    if (els.drawerBackdrop) {
      els.drawerBackdrop.classList.remove("is-open");
      setTimeout(() => {
        if (!state.drawerOpen && els.drawerBackdrop) els.drawerBackdrop.hidden = true;
      }, 280);
    }
    document.body.classList.remove("drawer-open");
  }

  function setupDrawerSwipeToClose() {
    if (!els.drawerDragZone || !els.plateDrawer) return;
    let startY = 0;
    let currentDeltaY = 0;
    let dragging = false;

    els.drawerDragZone.addEventListener(
      "touchstart",
      (e) => {
        if (window.innerWidth > 767 || !state.drawerOpen) return;
        startY = e.touches[0].clientY;
        currentDeltaY = 0;
        dragging = true;
        els.plateDrawer.style.transition = "none";
      },
      { passive: true }
    );

    els.drawerDragZone.addEventListener(
      "touchmove",
      (e) => {
        if (!dragging) return;
        const delta = Math.max(0, e.touches[0].clientY - startY);
        currentDeltaY = delta;
        els.plateDrawer.style.transform = `translate3d(0, ${delta}px, 0)`;
      },
      { passive: true }
    );

    const endDrag = () => {
      if (!dragging) return;
      dragging = false;
      els.plateDrawer.style.transition = "";
      if (currentDeltaY > 90) {
        closeDrawer();
      } else {
        els.plateDrawer.style.transform = "";
      }
    };

    els.drawerDragZone.addEventListener("touchend", endDrag, { passive: true });
    els.drawerDragZone.addEventListener("touchcancel", endDrag, { passive: true });
  }

  function toggleMobileNav() {
    if (!els.mobileMenuBtn || !els.mobileNavPanel) return;
    const isExpanded = els.mobileMenuBtn.getAttribute("aria-expanded") === "true";
    els.mobileMenuBtn.setAttribute("aria-expanded", String(!isExpanded));
    els.mobileNavPanel.hidden = isExpanded;
  }

  function closeMobileNav() {
    if (!els.mobileMenuBtn || !els.mobileNavPanel) return;
    els.mobileMenuBtn.setAttribute("aria-expanded", "false");
    els.mobileNavPanel.hidden = true;
  }

  /* ------------------------------------------------------------------------
     Goal View Mode Switcher
     ------------------------------------------------------------------------ */
  function setGoalViewMode(mode) {
    state.goalViewMode = mode;
    const isInteractive = mode === "interactive";

    if (els.viewInteractiveBtn) {
      els.viewInteractiveBtn.classList.toggle("is-active", isInteractive);
      els.viewInteractiveBtn.setAttribute("aria-pressed", String(isInteractive));
    }
    if (els.viewMatrixBtn) {
      els.viewMatrixBtn.classList.toggle("is-active", !isInteractive);
      els.viewMatrixBtn.setAttribute("aria-pressed", String(!isInteractive));
    }
    if (els.goalMatcherView) els.goalMatcherView.hidden = !isInteractive;
    if (els.goalMatrixView) els.goalMatrixView.hidden = isInteractive;
  }

  /* ------------------------------------------------------------------------
     Scroll Spy & Reveal Animations
     ------------------------------------------------------------------------ */
  function setupObservers() {
    // Scroll Reveal
    const revealEls = document.querySelectorAll(".reveal");
    if ("IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.08, rootMargin: "0px 0px -30px 0px" }
      );
      revealEls.forEach((el) => revealObserver.observe(el));
    } else {
      revealEls.forEach((el) => el.classList.add("is-visible"));
    }

    // Active Nav Scroll-Spy
    const sections = ["platforms", "buffet", "connect", "strengths"]
      .map((id) => document.getElementById(id))
      .filter(Boolean);
    const navLinks = document.querySelectorAll("[data-section]");

    if ("IntersectionObserver" in window && sections.length > 0) {
      const spyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const activeId = entry.target.id;
            navLinks.forEach((link) => {
              link.classList.toggle("is-active", link.getAttribute("data-section") === activeId);
            });
          });
        },
        { rootMargin: "-30% 0px -55% 0px", threshold: 0 }
      );
      sections.forEach((sec) => spyObserver.observe(sec));
    }
  }

  /* ------------------------------------------------------------------------
     Event Delegation & Wiring
     ------------------------------------------------------------------------ */
  function bindEvents() {
    // Global click delegation for dynamic interactive controls
    document.addEventListener("click", (e) => {
      const target = e.target;
      if (!(target instanceof Element)) return;

      const platformBtn = target.closest("[data-toggle-platform]");
      if (platformBtn) {
        togglePlatform(platformBtn.getAttribute("data-toggle-platform"));
        return;
      }

      const techBtn = target.closest("[data-toggle-tech]");
      if (techBtn) {
        toggleTech(techBtn.getAttribute("data-toggle-tech"));
        return;
      }

      const catTab = target.closest("[data-category]");
      if (catTab) {
        state.activeCategory = catTab.getAttribute("data-category");
        renderBuffetTabs();
        renderBuffetGrid();
        // Smoothly scroll clicked tab into center view on mobile
        catTab.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        return;
      }

      const goalBtn = target.closest("[data-select-goal]");
      if (goalBtn) {
        state.activeGoalId = goalBtn.getAttribute("data-select-goal");
        renderGoalMatcher();
        return;
      }

      const presetBtn = target.closest("[data-load-preset]");
      if (presetBtn) {
        loadGoalPreset(presetBtn.getAttribute("data-load-preset"));
        return;
      }

      const removePlatformBtn = target.closest("[data-remove-platform]");
      if (removePlatformBtn) {
        togglePlatform(removePlatformBtn.getAttribute("data-remove-platform"));
        return;
      }

      const removeTechBtn = target.closest("[data-remove-tech]");
      if (removeTechBtn) {
        toggleTech(removeTechBtn.getAttribute("data-remove-tech"));
        return;
      }

      const openPlateAttr = target.closest("[data-open-plate]");
      if (openPlateAttr) {
        openDrawer();
        return;
      }

      const mobileLink = target.closest(".mobile-nav-link");
      if (mobileLink) {
        closeMobileNav();
      }
    });

    // Search input
    if (els.buffetSearch) {
      els.buffetSearch.addEventListener("input", (e) => {
        state.searchQuery = e.target.value || "";
        renderBuffetGrid();
      });
    }

    if (els.buffetSearchClear) {
      els.buffetSearchClear.addEventListener("click", () => {
        state.searchQuery = "";
        if (els.buffetSearch) {
          els.buffetSearch.value = "";
          els.buffetSearch.focus();
        }
        renderBuffetGrid();
      });
    }

    if (els.buffetResetBtn) {
      els.buffetResetBtn.addEventListener("click", () => {
        state.activeCategory = "all";
        state.searchQuery = "";
        if (els.buffetSearch) els.buffetSearch.value = "";
        renderBuffetTabs();
        renderBuffetGrid();
      });
    }

    // View mode buttons
    if (els.viewInteractiveBtn) {
      els.viewInteractiveBtn.addEventListener("click", () => setGoalViewMode("interactive"));
    }
    if (els.viewMatrixBtn) {
      els.viewMatrixBtn.addEventListener("click", () => setGoalViewMode("matrix"));
    }

    // Drawer & mobile nav buttons
    [els.headerPlateBtn, els.mobilePlateBtn, els.ctaOpenPlateBtn].forEach((btn) => {
      if (btn) btn.addEventListener("click", openDrawer);
    });
    if (els.drawerCloseBtn) els.drawerCloseBtn.addEventListener("click", closeDrawer);
    if (els.drawerBackdrop) els.drawerBackdrop.addEventListener("click", closeDrawer);
    if (els.drawerCopyBtn) els.drawerCopyBtn.addEventListener("click", copyStackBrief);
    if (els.drawerClearBtn) els.drawerClearBtn.addEventListener("click", clearPlate);
    if (els.mobileMenuBtn) els.mobileMenuBtn.addEventListener("click", toggleMobileNav);

    // Keyboard accessibility (Escape)
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        if (state.drawerOpen) closeDrawer();
        closeMobileNav();
      }
    });

    setupDrawerSwipeToClose();
  }

  /* ------------------------------------------------------------------------
     Initialize
     ------------------------------------------------------------------------ */
  function init() {
    loadState();
    renderHeroQuickPresets();
    renderPlatforms();
    renderBuffetTabs();
    renderBuffetGrid();
    renderGoalMatcher();
    renderGoalMatrix();
    renderStrengths();
    renderPlateCounters();
    renderDrawerBody();
    bindEvents();
    setupObservers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
