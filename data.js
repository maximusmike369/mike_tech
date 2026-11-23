/* ==========================================================================
   Software Development & Tech Stack Capabilities — Structured Data & Icons
   ========================================================================== */

(function () {
  "use strict";

  const ICONS = {
    globe: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M2 12h20"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    smartphone: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="5" y="2" width="14" height="20" rx="2.5"/><path d="M12 18h.01"/></svg>`,
    shoppingBag: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
    building: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="2" width="16" height="20" rx="2"/><path d="M9 22v-4h6v4"/><path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/><path d="M12 10h.01"/><path d="M12 14h.01"/><path d="M16 10h.01"/><path d="M16 14h.01"/><path d="M8 10h.01"/><path d="M8 14h.01"/></svg>`,
    server: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="2" y="3" width="20" height="7" rx="2"/><rect x="2" y="14" width="20" height="7" rx="2"/><path d="M6 6.5h.01"/><path d="M6 17.5h.01"/><path d="M10 6.5h8"/><path d="M10 17.5h8"/></svg>`,
    sparkles: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z"/><path d="M5 3v4"/><path d="M3 5h4"/></svg>`,
    layout: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2.5"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`,
    code: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/><line x1="14" y1="4" x2="10" y2="20"/></svg>`,
    database: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/></svg>`,
    cloud: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/></svg>`,
    plug: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 22v-5"/><path d="M9 8V2"/><path d="M15 8V2"/><path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"/></svg>`,
    rocket: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09Z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2Z"/><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0"/><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5"/></svg>`,
    workflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><path d="M10 6.5h4a3 3 0 0 1 3 3V14"/><path d="M6.5 10v4a3 3 0 0 0 3 3H14"/></svg>`,
    gauge: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m12 14 4-4"/><path d="M3.34 19a10 10 0 1 1 17.32 0"/></svg>`,
    layers: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>`,
    checkCircle: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
    link: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`,
    sliders: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="2" y1="14" x2="6" y2="14"/><line x1="10" y1="8" x2="14" y2="8"/><line x1="18" y1="16" x2="22" y2="16"/></svg>`,
    plus: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
    check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>`,
    externalLink: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
    arrowRight: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`,
    x: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`
  };

  const PLATFORMS = [
    {
      id: "web-saas",
      title: "Web Applications & SaaS Platforms",
      badge: "Web & SaaS",
      accent: "blue",
      icon: "globe",
      descriptionHtml:
        "Multi-tenant web apps, customer/partner portals, internal operations dashboards, and real-time collaborative tools.",
      highlights: ["Multi-Tenant", "Customer Portals", "Ops Dashboards", "Real-Time Collab"]
    },
    {
      id: "mobile-apps",
      title: "Mobile Applications (iOS & Android)",
      badge: "Mobile",
      accent: "orange",
      icon: "smartphone",
      descriptionHtml:
        "Native-feel mobile experiences, cross-platform apps from a single codebase, offline-first field apps, and push/location-enabled workflows.",
      highlights: ["Single Codebase", "Offline-First", "Push & Location", "iOS & Android"]
    },
    {
      id: "ecommerce",
      title: "E-Commerce & Marketplaces",
      badge: "Commerce",
      accent: "blue",
      icon: "shoppingBag",
      descriptionHtml:
        "Custom storefronts, multi-vendor marketplaces, subscription billing engines, inventory/OMS sync, and checkout/payment orchestration.",
      highlights: ["Custom Storefronts", "Multi-Vendor", "Subscriptions", "OMS Sync"]
    },
    {
      id: "enterprise-crm",
      title: "Enterprise Systems, CRM & ERP Extensions",
      badge: "Enterprise",
      accent: "orange",
      icon: "building",
      descriptionHtml: `Custom modules, workflow automation, role-based access control (RBAC), reporting pipelines, and ERP/CRM bridges (like the <a href="https://crm.mna369.com/" target="_blank" rel="noopener noreferrer" class="inline-glass-link">CRM Essentials${ICONS.externalLink}</a> pipeline &amp; client activity workflows).`,
      highlights: ["RBAC & Modules", "Workflow Automation", "ERP/CRM Bridges", "Reporting"]
    },
    {
      id: "apis-backend",
      title: "APIs, Microservices & Backend Platforms",
      badge: "Backend",
      accent: "blue",
      icon: "server",
      descriptionHtml:
        "RESTful & GraphQL APIs, event-driven architectures, webhooks, background job queues, and high-throughput data services.",
      highlights: ["REST & GraphQL", "Event-Driven", "Webhooks", "Job Queues"]
    },
    {
      id: "ai-data",
      title: "AI-Enabled & Data-Driven Products",
      badge: "AI & Data",
      accent: "orange",
      icon: "sparkles",
      descriptionHtml:
        "LLM-powered assistants, semantic search/RAG pipelines, automated document/email triage, analytics dashboards, and ETL/ELT data pipelines.",
      highlights: ["LLM Assistants", "RAG Search", "Auto-Triage", "ETL/ELT"]
    }
  ];

  const TECH_CATEGORIES = [
    {
      id: "frontend-mobile",
      name: "Frontend & Mobile",
      shortName: "Frontend & Mobile",
      accent: "blue",
      icon: "layout",
      tagline: "Responsive interfaces, accessible design systems, and cross-platform mobile apps.",
      groups: [
        {
          title: "Web Frameworks & Libraries",
          items: [
            "React",
            "Next.js",
            "Vue.js",
            "Nuxt",
            "Angular",
            "TypeScript",
            "JavaScript (ES6+)",
            "HTML5",
            "CSS3"
          ]
        },
        {
          title: "Styling & UI Systems",
          items: [
            "Tailwind CSS",
            "Shadcn UI",
            "Material UI",
            "Ant Design",
            "Chakra UI",
            "Sass/SCSS",
            "responsive & accessible (WCAG) design systems"
          ]
        },
        {
          title: "State, Forms & Data Fetching",
          items: [
            "TanStack Query",
            "Redux Toolkit",
            "Zustand",
            "React Hook Form",
            "Zod"
          ]
        },
        {
          title: "Mobile",
          items: [
            "React Native",
            "Flutter",
            "Swift (iOS)",
            "Kotlin (Android)"
          ]
        }
      ]
    },
    {
      id: "backend-apis",
      name: "Backend & APIs",
      shortName: "Backend & APIs",
      accent: "orange",
      icon: "code",
      tagline: "High-throughput services, clean API contracts, and real-time event streams.",
      groups: [
        {
          title: "Languages & Runtimes",
          items: [
            "Node.js",
            "TypeScript",
            "Python",
            "Java",
            "C# / .NET",
            "Go (Golang)",
            "PHP"
          ]
        },
        {
          title: "Web & API Frameworks",
          items: [
            "Express",
            "NestJS",
            "Fastify",
            "Next.js API Routes",
            "FastAPI",
            "Django",
            "Flask",
            "Spring Boot",
            "ASP.NET Core",
            "Laravel"
          ]
        },
        {
          title: "API Styles & Realtime",
          items: [
            "REST",
            "GraphQL",
            "WebSockets",
            "Server-Sent Events (SSE)",
            "gRPC",
            "OpenAPI/Swagger"
          ]
        }
      ]
    },
    {
      id: "databases-data",
      name: "Databases & Data Layer",
      shortName: "Databases & Data",
      accent: "blue",
      icon: "database",
      tagline: "Reliable transactional stores, low-latency caching, full-text search, and BI pipelines.",
      groups: [
        {
          title: "Relational Databases",
          items: [
            "PostgreSQL",
            "MySQL",
            "Microsoft SQL Server"
          ]
        },
        {
          title: "NoSQL, Search & Caching",
          items: [
            "MongoDB",
            "Redis",
            "Elasticsearch / OpenSearch",
            "DynamoDB"
          ]
        },
        {
          title: "Data & Analytics",
          items: [
            "Warehousing concepts",
            "ETL/ELT pipelines",
            "SQL modeling",
            "reporting & BI dashboards"
          ]
        }
      ]
    },
    {
      id: "cloud-devops",
      name: "Cloud, DevOps & Infrastructure",
      shortName: "Cloud & DevOps",
      accent: "orange",
      icon: "cloud",
      tagline: "Automated releases, resilient container orchestration, security, and deep observability.",
      groups: [
        {
          title: "Cloud Providers",
          items: [
            "AWS",
            "Google Cloud Platform (GCP)",
            "Microsoft Azure"
          ]
        },
        {
          title: "Containers & Orchestration",
          items: [
            "Docker",
            "Kubernetes",
            "serverless functions"
          ]
        },
        {
          title: "CI/CD & Automation",
          items: [
            "GitHub Actions",
            "GitLab CI",
            "automated testing",
            "staging/production pipelines",
            "Infrastructure as Code (Terraform)"
          ]
        },
        {
          title: "Observability & Security",
          items: [
            "Structured logging",
            "error tracking",
            "performance monitoring",
            "OAuth 2.0 / SSO / JWT",
            "RBAC",
            "secrets management",
            "HTTPS/TLS"
          ]
        }
      ]
    },
    {
      id: "integrations",
      name: "Integrations & Third-Party Ecosystems",
      shortName: "Integrations",
      accent: "blue",
      icon: "plug",
      tagline: "Seamless connections across billing, messaging, enterprise SSO, and AI models.",
      groups: [
        {
          title: "Payments & Billing",
          items: [
            "Stripe",
            "PayPal",
            "local/regional payment gateways",
            "recurring subscriptions",
            "invoicing"
          ]
        },
        {
          title: "Comms, Calendar & Productivity",
          items: [
            "Email (SMTP/SendGrid/Postmark/Gmail/Outlook)",
            "SMS/messaging",
            "calendars",
            "webhooks",
            "notifications"
          ]
        },
        {
          title: "Identity & Auth",
          items: [
            "Auth0",
            "Clerk",
            "Firebase Auth",
            "Google/Microsoft SSO",
            "SAML/OIDC"
          ]
        },
        {
          title: "AI & Automation",
          items: [
            "OpenAI / Anthropic / Gemini APIs",
            "embeddings & vector stores",
            "workflow automation",
            "third-party SaaS webhooks"
          ]
        }
      ]
    }
  ];

  const GOALS = [
    {
      id: "mvp-saas",
      goal: "Fast MVP / SaaS launch",
      shortTitle: "Fast MVP / SaaS",
      icon: "rocket",
      accent: "orange",
      stackSummary: "Next.js / React + TypeScript + PostgreSQL + Auth + Stripe + Cloud hosting",
      stackParts: [
        "Next.js / React",
        "TypeScript",
        "PostgreSQL",
        "Auth",
        "Stripe",
        "Cloud hosting"
      ],
      deliverable: "Production web app with user accounts, billing & admin controls",
      presetPlatforms: ["web-saas"],
      presetTech: [
        { cat: "frontend-mobile", item: "Next.js" },
        { cat: "frontend-mobile", item: "React" },
        { cat: "frontend-mobile", item: "TypeScript" },
        { cat: "databases-data", item: "PostgreSQL" },
        { cat: "integrations", item: "Clerk" },
        { cat: "integrations", item: "Stripe" },
        { cat: "cloud-devops", item: "AWS" }
      ]
    },
    {
      id: "mobile-first",
      goal: "Mobile-first customer or field app",
      shortTitle: "Mobile-First App",
      icon: "smartphone",
      accent: "blue",
      stackSummary: "React Native or Flutter + REST/GraphQL API + Push/Offline sync",
      stackParts: [
        "React Native or Flutter",
        "REST/GraphQL API",
        "Push/Offline sync"
      ],
      deliverable: "iOS & Android app connected to your backend",
      presetPlatforms: ["mobile-apps"],
      presetTech: [
        { cat: "frontend-mobile", item: "React Native" },
        { cat: "frontend-mobile", item: "Flutter" },
        { cat: "backend-apis", item: "REST" },
        { cat: "backend-apis", item: "GraphQL" },
        { cat: "integrations", item: "notifications" }
      ]
    },
    {
      id: "connect-automate",
      goal: "Connecting tools & automating work",
      shortTitle: "Connect & Automate",
      icon: "workflow",
      accent: "orange",
      stackSummary: "Webhooks + REST APIs + Background jobs + Email/CRM/Payment integrations",
      stackParts: [
        "Webhooks",
        "REST APIs",
        "Background jobs",
        "Email/CRM/Payment integrations"
      ],
      deliverable: "Automated data sync, alerts, and operational workflows",
      presetPlatforms: ["enterprise-crm", "apis-backend"],
      presetTech: [
        { cat: "integrations", item: "webhooks" },
        { cat: "backend-apis", item: "REST" },
        { cat: "integrations", item: "Email (SMTP/SendGrid/Postmark/Gmail/Outlook)" },
        { cat: "integrations", item: "Stripe" },
        { cat: "integrations", item: "workflow automation" }
      ]
    },
    {
      id: "modernize-scale",
      goal: "Modernizing or scaling a slow system",
      shortTitle: "Modernize & Scale",
      icon: "gauge",
      accent: "blue",
      stackSummary: "Node.js / Python / .NET / Go + Redis caching + SQL optimization + Docker/CI-CD",
      stackParts: [
        "Node.js / Python / .NET / Go",
        "Redis caching",
        "SQL optimization",
        "Docker/CI-CD"
      ],
      deliverable: "Faster response times, cleaner architecture & safer releases",
      presetPlatforms: ["apis-backend"],
      presetTech: [
        { cat: "backend-apis", item: "Node.js" },
        { cat: "backend-apis", item: "Python" },
        { cat: "backend-apis", item: "C# / .NET" },
        { cat: "backend-apis", item: "Go (Golang)" },
        { cat: "databases-data", item: "Redis" },
        { cat: "databases-data", item: "PostgreSQL" },
        { cat: "cloud-devops", item: "Docker" },
        { cat: "cloud-devops", item: "GitHub Actions" }
      ]
    },
    {
      id: "ai-workflows",
      goal: "Adding smart search or AI workflows",
      shortTitle: "Smart Search & AI",
      icon: "sparkles",
      accent: "orange",
      stackSummary: "Python / Node.js + LLM APIs + Vector/SQL data layer + Guardrails",
      stackParts: [
        "Python / Node.js",
        "LLM APIs",
        "Vector/SQL data layer",
        "Guardrails"
      ],
      deliverable: "AI assistant, copilot, or automated processing pipeline",
      presetPlatforms: ["ai-data"],
      presetTech: [
        { cat: "backend-apis", item: "Python" },
        { cat: "backend-apis", item: "Node.js" },
        { cat: "integrations", item: "OpenAI / Anthropic / Gemini APIs" },
        { cat: "integrations", item: "embeddings & vector stores" },
        { cat: "databases-data", item: "PostgreSQL" },
        { cat: "databases-data", item: "Elasticsearch / OpenSearch" }
      ]
    }
  ];

  const STRENGTHS = [
    {
      num: "01",
      title: "Architecture & System Design",
      accent: "blue",
      icon: "layers",
      description:
        "Translating messy business requirements into modular, maintainable systems that don't fall apart as traffic or features grow."
    },
    {
      num: "02",
      title: "End-to-End Execution",
      accent: "orange",
      icon: "checkCircle",
      description:
        "Owning features from UI and API design through database schema, testing, deployment, and post-launch iteration."
    },
    {
      num: "03",
      title: "Integration Mindset",
      accent: "blue",
      icon: "link",
      description:
        "Designing clean contracts, retries, and idempotency so external APIs, CRMs, payment providers, and internal tools stay in sync."
    },
    {
      num: "04",
      title: "Pragmatic Trade-offs",
      accent: "orange",
      icon: "sliders",
      description:
        "Choosing proven, maintainable tools matched to your team and budget rather than over-engineering for hype."
    }
  ];

  window.STACK_DATA = {
    ICONS,
    PLATFORMS,
    TECH_CATEGORIES,
    GOALS,
    STRENGTHS
  };
})();
