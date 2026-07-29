import './Footer.css'

export default function Footer() {
  return (
    <footer className="siteFooter">
      <p>&copy; {new Date().getFullYear()} Product Explorer &middot; Built with React and Fake Store API</p>
    </footer>
  )
}
