import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import Header from './components/Header'
import Banner from './components/Banner'
import ProductList from './components/ProductList'

function App() {
  return (
    <div>
      <Header />
      <Banner />
      <ProductList />
    </div>
  )
}

export default App