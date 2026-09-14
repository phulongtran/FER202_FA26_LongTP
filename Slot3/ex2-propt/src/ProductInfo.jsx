function ProductInfo(props) {
  return (
    <div>
      <img 
        src={props.image} 
        alt={props.name}
        width="200"
      />

      <h2>{props.name}</h2>
      <p>Giá: {props.price}</p>
      <p>Thẻ tag: {props.tag}</p>
    </div>
  )
}

export default ProductInfo