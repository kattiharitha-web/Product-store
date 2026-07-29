import { Link } from 'react-router-dom'
import { ROUTES } from '../../routes/routes'
import './NotFound.css'

export default function NotFound() {
  return (
    <main id="main-content" className="notFoundPage" tabIndex="-1">
      <section className="notFoundContent" aria-labelledby="not-found-title">
        <p className="notFoundCode">404</p>
        <h1 id="not-found-title">Page not found</h1>
        <p>The page you requested does not exist or may have moved.</p>
        <Link to={ROUTES.home} className="notFoundHomeLink">Return to products</Link>
      </section>
    </main>
  )
}
