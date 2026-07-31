import { lazy, Suspense } from 'react'
import { Outlet, Route, Routes } from 'react-router-dom'
import PageState from '../components/Common/PageState/PageState'
import Footer from '../components/Footer/Footer'
import Header from '../components/Header/Header'

export const ROUTES = {
  home: '/',
  productDetail: '/product/:id',
  product: (id) => `/product/${id}`,
}

const ProductList = lazy(() => import('../pages/ProductList/ProductList'))
const ProductDetails = lazy(() => import('../pages/ProductDetails/ProductDetails'))
const NotFound = lazy(() => import('../pages/NotFound/NotFound'))

export const routeConfig = [
  { index: true, Component: ProductList },
  { path: ROUTES.productDetail, Component: ProductDetails },
  { path: '*', Component: NotFound },
]

function RouteFallback() {
  return <PageState type="loading" message="Loading page..." />
}

function SiteLayout() {
  return (
    <div className="appShell">
      <a className="skipLink" href="#main-content">Skip to main content</a>
      <Header />
      <Outlet />
      <Footer />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        <Route element={<SiteLayout />}>
          {routeConfig.map(({ index, path, Component }) => (
            index ? (
              <Route key="home" index element={<Component />} />
            ) : (
              <Route key={path} path={path} element={<Component />} />
            )
          ))}
        </Route>
      </Routes>
    </Suspense>
  )
}
