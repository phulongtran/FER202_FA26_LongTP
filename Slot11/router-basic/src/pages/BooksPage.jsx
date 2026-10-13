
import { Badge, Table } from "react-bootstrap";
import { books } from "../data/books";

function BooksPage() {
  return (
    <section className="page-section">
      <div className="page-heading">
        <h1>Danh sách sách</h1>
        <p>Danh sách sách hiện có trong Thư viện FPT University.</p>
      </div>

      <div className="table-responsive">
        <Table bordered hover className="books-table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên sách</th>
              <th>Tác giả</th>
              <th>Thể loại</th>
              <th>Năm xuất bản</th>
              <th>Tình trạng</th>
            </tr>
          </thead>

          <tbody>
            {books.map((book, index) => (
              <tr key={book.id}>
                <td>{index + 1}</td>
                <td className="book-title">{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.year}</td>
                <td>
                  <Badge bg={book.status === "Có sẵn" ? "success" : "warning"}>
                    {book.status}
                  </Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </section>
  );
}

export default BooksPage;
