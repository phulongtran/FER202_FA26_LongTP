import './Banner.css'

function Banner() {
  return (
    <div
      id="pizzaBanner"
      className="carousel slide"
      data-bs-ride="carousel"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>

        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>

        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>

        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>

        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="/images/pizza1.jpg"
            className="d-block w-100"
            alt="Pizza 1"
          />
        </div>

        <div className="carousel-item">
          <img
            src="/images/pizza2.jpg"
            className="d-block w-100"
            alt="Pizza 2"
          />
        </div>

        <div className="carousel-item">
          <img
            src="/images/pizza3.jpg"
            className="d-block w-100"
            alt="Pizza 3"
          />
        </div>

        <div className="carousel-item">
          <img
            src="/images/pizza4.jpg"
            className="d-block w-100"
            alt="Pizza 4"
          />
        </div>

        <div className="carousel-item">
          <img
            src="/images/pizza5.jpg"
            className="d-block w-100"
            alt="Pizza 5"
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#pizzaBanner"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon"></span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#pizzaBanner"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon"></span>
      </button>
    </div>
  )
}

export default Banner