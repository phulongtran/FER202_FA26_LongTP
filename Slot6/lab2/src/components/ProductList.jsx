import ProductInfo from './ProductInfo'
import './ProductList.css'
function ProductList() {
  const products = [
    {
      image: '/images/menu1.jpg',
      name: 'Margherita Pizza',
      oldPrice: '$40.00',
      price: '$30.00',
      tag: 'SALE',
    },
    {
      image: '/images/menu2.jpg',
      name: 'Mushroom Pizza',
      oldPrice: '',
      price: '$25.00',
      tag: '',
    },
    {
      image: '/images/menu3.jpg',
      name: 'Hawaiian Pizza',
      oldPrice: '',
      price: '$30.00',
      tag: 'NEW',
    },
    {
      image: '/images/menu4.jpg',
      name: 'Pesto Pizza',
      oldPrice: '$40.00',
      price: '$30.00',
      tag: 'SALE',
    },
  ]

  return (
    <section className="menu-section">
      <div className="container">
        <h2 className="menu-title">Our Menu</h2>

        <div className="row g-4">
          {products.map((product, index) => (
            <div className="col-12 col-sm-6 col-lg-3" key={index}>
              <ProductInfo
                image={product.image}
                name={product.name}
                oldPrice={product.oldPrice}
                price={product.price}
                tag={product.tag}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProductList