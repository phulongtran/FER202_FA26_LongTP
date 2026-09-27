import './BookTable.css'

function BookTable() {
  return (
    <section className="book-table-section">
      <div className="container">
        <h2 className="book-table-title">Book Your Table</h2>

        <form>
          <div className="row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Your Name *"
              />
            </div>

            <div className="col-md-4">
              <input
                type="email"
                className="form-control"
                placeholder="Your Email *"
              />
            </div>

            <div className="col-md-4">
              <select className="form-select">
                <option value="">Select a Service</option>
                <option value="reservation">Table Reservation</option>
                <option value="delivery">Delivery</option>
                <option value="takeaway">Takeaway</option>
              </select>
            </div>

            <div className="col-12">
              <textarea
                className="form-control"
                rows="5"
                placeholder="Please write your comment"
              ></textarea>
            </div>

            <div className="col-12">
              <button type="submit" className="btn send-button">
                Send Message
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  )
}

export default BookTable