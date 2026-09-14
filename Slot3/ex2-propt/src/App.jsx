import './App.css'
import ProductInfo from './ProductInfo'

function App() {
  return (
    <>
      <ProductInfo 
        name="iPhone 15"
        price="20.000.000 VNĐ"
        tag="Điện thoại"
        image="/iphone15.jpg"
      />

      <ProductInfo 
        name="Laptop Dell"
        price="25.000.000 VNĐ"
        tag="Laptop"
        image="/laptop.jpg"
      />
    </>
  )
}

export default App