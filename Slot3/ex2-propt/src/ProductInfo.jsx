function ProductInfo(props) {
  return (
    <div>
      <h2>{props.name}</h2>
      <p>Giá: {props.price}</p>
      <p>Thẻ tag: {props.tag}</p>
    </div>
  )
}

export default ProductInfo