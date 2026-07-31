# Product Explorer

A responsive React single-page application for browsing products from the [Fake Store API](https://fakestoreapi.com/). It demonstrates a maintainable component structure, resilient asynchronous UI states, accessible interactions, and automated test coverage.

## Highlights

- Browse a paginated product catalogue with ten products per page.
- Search products by title and category using multi-word matching.
- Open a product detail page with category, price, description, and image.
- Handle loading, empty, invalid-ID, not-found, network-error, and retry states.
- Show a graceful fallback when a product image is missing or fails to load.
- Validate an email address client-side with accessible feedback.
- Use lazy-loaded routes and lazy-loaded catalogue images to reduce initial work.
- Provide a responsive layout and a dedicated 404 page.

## Architecture

```text
src/
|-- components/       # Reusable UI components
|   |-- Common/       # Shared async and page-state UI
|   |-- Pagination/
|   |-- ProductCard/
|   `-- SearchBar/
|-- hooks/            # Product-fetching hooks and request lifecycle logic
|-- pages/            # Product list, detail, and not-found pages
|-- routes/           # Route definitions and application layout
|-- services/         # Fake Store API client and response validation
|-- styles/           # Global design tokens and shared styles
`-- utils/            # Constants, formatting, and validation helpers
```

### Data flow

`Page -> useProducts/useProduct -> API service -> Fake Store API`

The request hook owns loading, error, retry, and cancellation behaviour. `AsyncState` then maps that state to consistent loading or error UI, keeping page components focused on their success content.

## Accessibility

- Semantic landmarks, headings, navigation, and form labels.
- A skip link for keyboard users.
- Keyboard-visible focus states and accessible buttons.
- Descriptive alternative text and an image-unavailable fallback.
- Live announcements for loading, search results, form success, and errors.
- Correct pagination semantics with `aria-current`.

## Performance considerations

- Route-level code splitting through `React.lazy` and `Suspense`.
- Native image lazy loading for product cards below the fold.
- Memoized search keywords, filtering, and paginated result slices.
- Request cancellation with `AbortController` to avoid stale state updates during navigation.

## Tech stack

- React
- React Router
- Vite
- Fake Store API
- Vitest and React Testing Library
- ESLint

## Getting started

### Prerequisites

- Node.js 20.19 or later
- npm

### Install and run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite in your browser.

> On Windows PowerShell, use `npm.cmd` in place of `npm` if script execution is disabled.

## Available scripts

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server. |
| `npm run build` | Create an optimized production build. |
| `npm run preview` | Preview the production build locally. |
| `npm run lint` | Run ESLint across the project. |
| `npm run test` | Run the Vitest test suite once. |

## Quality checks

The test suite covers API responses and errors, routing, async UI states, product cards and details, search, pagination, image fallbacks, and email validation.

Before submitting changes, run:

```bash
npm run lint
npm run test
npm run build
```

## API note

Product data and images are provided by a third-party demo API. The application validates API responses and presents retryable error states when the service is unavailable.
