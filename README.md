# Production Quality Engineering

A multi-layer quality engineering project focused on reliability, deterministic automation, and production-oriented validation across UI, API, database, accessibility, visual, and mobile layers.

Built with **Playwright and TypeScript**, with cross-browser execution and automated quality gates through GitHub Actions.

---

## Quality Strategy

The project validates the system across independent quality layers:

| Layer | Coverage |
|---|---|
| **UI** | Critical user journeys and functional behavior |
| **Cross-Browser** | Chromium, Firefox, and WebKit |
| **API** | Response contracts, positive and negative scenarios |
| **Database** | PostgreSQL integration, seeded data, and query validation |
| **Accessibility** | Automated WCAG 2.1 AA checks with axe-core |
| **Visual** | Screenshot-based regression detection |
| **Mobile** | Responsive layout and touch interaction |
| **Network** | Deterministic HAR replay without external network dependency |
| **Static Quality** | TypeScript strict mode, ESLint, and type validation |

---

## Architecture

```text
.
├── .github/workflows/       # CI/CD quality gates
├── config/                  # Environment configuration
├── db/                      # Database schema and seed
├── fixtures/                # Playwright fixtures
├── pages/                   # Page Objects
├── support/                 # Focused reusable utilities
├── tests/
│   ├── accessibility/
│   ├── api/
│   ├── db/
│   ├── mobile/
│   ├── ui/
│   └── visual/
├── playwright.config.ts
└── package.json
```

The architecture favors explicit responsibilities and small abstractions over generic framework layers.

---

## Test Execution

Install dependencies:

```bash
npm ci
npx playwright install
```

Run the complete test suite:

```bash
npm run test
```

Run individual quality layers:

```bash
npm run test:ui
npm run test:ui:smoke
npm run test:ui:cross-browser
npm run test:api
npm run test:db
npm run test:a11y
npm run test:visual
npm run test:mobile
```

Static validation:

```bash
npm run lint
npm run typecheck
```

---

## Environment

Local configuration is provided through `.env`.

Use `.env.example` as the reference for the required variables. Secrets and runtime artifacts are excluded from version control.

---

## CI/CD

GitHub Actions provides automated quality gates for:

**Static Analysis → Smoke Validation → Database Validation → Full Regression**

Extended validation covers cross-browser execution, accessibility, visual regression, and mobile behavior.

Test reports and execution artifacts are retained for failure analysis and traceability.

---

## Engineering Decisions

- **Cross-browser validation** verifies behavior across Chromium, Firefox, and WebKit.
- **Isolated Playwright projects** keep execution contexts and test layers independent.
- **HAR replay** provides deterministic network-dependent testing without live requests.
- **Real PostgreSQL integration** validates database behavior instead of replacing it with mocks.
- **Fail-fast configuration** prevents tests from running with incomplete environment setup.
- **Known external SUT limitations** are treated explicitly rather than hidden through arbitrary retries or broad exclusions.

---

## Current Validation

```text
31 tests
31 passed
Chromium ✓
Firefox  ✓
WebKit   ✓
API      ✓
Database ✓
A11y     ✓
Visual   ✓
Mobile   ✓
```

The same quality strategy is integrated into the CI pipeline to provide repeatable validation on repository changes.

---

## Tech Stack

**TypeScript · Playwright · Node.js · PostgreSQL · axe-core · GitHub Actions · Allure**

---

