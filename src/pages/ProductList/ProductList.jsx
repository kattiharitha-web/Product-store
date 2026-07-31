import { useMemo, useState } from 'react'
import Pagination from '../../components/Pagination/Pagination'
import ProductCard from '../../components/ProductCard/ProductCard'
import SearchBar from '../../components/SearchBar/SearchBar'
import EmailValidation from '../../components/Common/EmailValidation/EmailValidation'
import AsyncState from '../../components/Common/AsyncState/AsyncState'
import { PRODUCTS_PER_PAGE } from '../../utils/constants'
import { useProducts } from '../../hooks/useProducts'
import './ProductList.css'

function getSearchableText(product) {
  const title = typeof product?.title === 'string' ? product.title : ''
  const category = typeof product?.category === 'string' ? product.category : ''

  return `${title} ${category}`.toLowerCase()
}

export default function ProductList() {
  const [query, setQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const { products, loading, error, retry } = useProducts()

  const keywords = useMemo(
    () => query.toLowerCase().trim().split(/\s+/).filter(Boolean),
    [query],
  )
  const filteredProducts = useMemo(
    () => products.filter((product) => keywords.every((keyword) => getSearchableText(product).includes(keyword))),
    [keywords, products],
  )
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)
  const currentProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
    return filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE)
  }, [currentPage, filteredProducts])

  function handleSearch(nextQuery) {
    setQuery(nextQuery ?? '')
    setCurrentPage(1)
  }

  const firstProductNumber = filteredProducts.length ? (currentPage - 1) * PRODUCTS_PER_PAGE + 1 : 0
  const lastProductNumber = Math.min(currentPage * PRODUCTS_PER_PAGE, filteredProducts.length)
  let pageContent

  if (filteredProducts.length === 0) {
    pageContent = (
      <>
        <p className="homePageResultsCount" role="status" aria-live="polite">
          No products found
          {query.trim() && ` matching "${query.trim()}"`}
        </p>
        <div className="emptyState homePageEmptyState" role="status">
          <p>No products found. Try adjusting your search.</p>
        </div>
      </>
    )
  } else {
    pageContent = (
      <>
        <p className="homePageResultsCount" role="status" aria-live="polite">
          {`Showing ${firstProductNumber}\u2013${lastProductNumber} of ${filteredProducts.length} product${filteredProducts.length === 1 ? '' : 's'}`}
          {query.trim() && ` matching "${query.trim()}"`}
        </p>
        <div className="homePageProductGrid">
          {currentProducts.map((product) => (
            <ProductCard key={product?.id} product={product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </>
    )
  }

  return (
    <main id="main-content" className="pageContainer homePage" tabIndex="-1" aria-busy={loading}>
      <div className="homePageHeader">
        <h1>Browse Products</h1>
        <p className="homePageSubtitle">Search products by name or category.</p>
      </div>

      <SearchBar onSearch={handleSearch} />

      <AsyncState
        loading={loading}
        error={error}
        retry={retry}
        loadingMessage="Loading products..."
      >
        {pageContent}
      </AsyncState>

      <EmailValidation />
    </main>
  )
}
