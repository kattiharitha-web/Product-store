# Product Explorer

A React application that displays products from the [Fake Store API](https://fakestoreapi.com/).

## Day 5 features

- Product listing page
- Product detail page
- Search by product name or category
- Responsive layout for desktop, tablet, and mobile
- Loading message while products are fetched

## Day 8 improvements

- Reusable `ProductCard`, `SearchBar`, `PageState`, and `EmailValidationForm` components
- A shared `useAsync` React Hook for cancellable API calls and retry behavior
- Clear loading spinner and retryable error states for product list and detail requests
- Helpful API and network error messages
- Client-side email form validation, with feedback on blur and on submit (the demo does not store or send email addresses)
- Shared route constants and a common currency formatter to avoid repeated values
- Organized folders for components, hooks, pages, and services

## Run locally

```bash
npm install
npm run dev
```

## Tech used

- React
- React Router
- Vite
- Fake Store API
