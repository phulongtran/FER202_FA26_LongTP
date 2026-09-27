import './ProductInfo.css'

function ProductInfo({ image, name, oldPrice, price, tag }) {
  return (
    <div className="card pizza-card">
      <div className="pizza-image-wrapper">
        {tag && <span className="pizza-tag">{tag}</span>}

        <img
          src={image}
          className="card-img-top"
          alt={name}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title">{name}</h5>

        <div className="pizza-price">
          {oldPrice && (
            <span className="old-price">{oldPrice}</span>
          )}

          <span className="current-price">{price}</span>
        </div>

        <button className="btn buy-button">
          Buy
        </button>
      </div>
    </div>
  )
}

export default ProductInfo