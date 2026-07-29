# Product Explorer

A React application that displays products from the [Fake Store API](https://fakestoreapi.com/).

## Features

- Product listing page
- Product detail page
- Search by product name or category
- Responsive layout for desktop, tablet, and mobile
- Ten products per page with Previous, Next, and page controls
- Loading, empty, retryable error, invalid-ID, and not-found states
- Basic client-side email form validation
- Lazy-loaded pages and lazy-loaded product images

## Project structure

```text
src/
├── components/
│   ├── Common/
│   ├── Footer/
│   ├── Header/
│   ├── Pagination/
│   ├── ProductCard/
│   └── SearchBar/
├── hooks/
├── pages/
├── routes/
├── services/
├── styles/
└── utils/
```

## Accessibility

- Semantic headings, `main`, `header`, `footer`, and pagination `nav`
- Accessible labels for search and email inputs
- Descriptive image alternative text and lazy image loading
- Announced loading, success, and error states
- Keyboard-visible focus styles and accessible buttons

## Day 15 quality checks

- 20 automated tests cover validation, API error handling, routing, product states, search, pagination, and the Home page's ten-item pagination.
- The UI uses accessible landmarks, labelled inputs, descriptive image text, keyboard focus styles, and announced loading/error feedback.
- Run `npm run test` and `npm run build` before submitting changes.

## Run locally

```bash
npm install
npm run dev
```

## Verify the project

```bash
npm run test
npm run build
```

In PowerShell, use `npm.cmd` instead of `npm` if script execution is disabled.

## Tech used

- React
- React Router
- Vite
- Fake Store API
- Vitest and React Testing Library
