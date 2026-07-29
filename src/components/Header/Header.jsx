import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import './Header.css'

export default function Header() {
  return (
    <header className="siteHeader">
      <Link to={ROUTES.home} className="siteHeaderBrand" aria-label="Product Explorer home">
        Product Explorer
      </Link>
    </header>
  )
}
