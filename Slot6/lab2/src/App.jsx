import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Header from './components/Header'
import Banner from './components/Banner'
import ProductList from './components/ProductList'
import BookTable from './components/BookTable'

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <ProductList />
      <BookTable />
    </div>
  )
}

export default App