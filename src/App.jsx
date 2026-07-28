import { Link, Route, Routes } from 'react-router-dom'
import { ROUTES } from './constants/app'
import ProductDetailPage from './pages/ProductDetailPage'
import ProductListPage from './pages/ProductListPage'

export default function App() {
  return (
    <div>
      <header className="site-header">
        <Link to={ROUTES.home} className="brand" aria-label="Product Explorer home">
          Product Explorer
        </Link>
      </header>
      <Routes>
        <Route path={ROUTES.home} element={<ProductListPage />} />
        <Route path={ROUTES.productDetail} element={<ProductDetailPage />} />
      </Routes>
      <footer className="site-footer">
        <p>&copy; {new Date().getFullYear()} Product Explorer · Built with React and Fake Store API</p>
      </footer>
    </div>
  )
}
