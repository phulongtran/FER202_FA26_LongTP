import { useState } from 'react';
import { Alert, Button, ButtonGroup, Form } from 'react-bootstrap';
import ProductList from './ProductList';

const getFinalPrice = (product) => {
  return product.price * (1 - product.discount / 100);
};

const sorters = {
  default: () => 0,

  priceAsc: (a, b) => {
    return getFinalPrice(a) - getFinalPrice(b);
  },

  priceDesc: (a, b) => {
    return getFinalPrice(b) - getFinalPrice(a);
  },

  rating: (a, b) => {
    return b.rating.rate - a.rating.rate;
  },
};

function ProductFilter({ products, onAddToCart }) {
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('Tất cả');
  const [onlyInStock, setOnlyInStock] = useState(false);
  const [sortBy, setSortBy] = useState('default');

  const categories = [
    'Tất cả',
    ...new Set(
      products.map((p) => p.category?.name ?? 'Khác'),
    ),
  ];

  const visibleProducts = products
    .filter((product) => {
      const normalizedKeyword = keyword.trim().toLowerCase();
      const productName = product.name.toLowerCase();

      return productName.includes(normalizedKeyword);
    })
    .filter((product) => {
      if (category === 'Tất cả') {
        return true;
      }

      return (product.category?.name ?? 'Khác') === category;
    })
    .filter((product) => {
      if (!onlyInStock) {
        return true;
      }

      return product.inStock;
    })
    .sort(sorters[sortBy]);

  const handleClearFilters = () => {
    setKeyword('');
    setCategory('Tất cả');
    setOnlyInStock(false);
    setSortBy('default');
  };

  return (
    <div>
      <h2 className="mb-4">Tìm kiếm sản phẩm</h2>

      <div className="mb-4">
        <Form.Group className="mb-3">
          <Form.Label>Tìm kiếm theo tên</Form.Label>

          <Form.Control
            type="text"
            placeholder="Nhập tên sản phẩm..."
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </Form.Group>

        <div className="mb-3">
          <Form.Label>Sắp xếp</Form.Label>

          <Form.Select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="priceAsc">Giá tăng dần</option>
            <option value="priceDesc">Giá giảm dần</option>
            <option value="rating">Đánh giá cao</option>
          </Form.Select>
        </div>

        <Form.Check
          type="switch"
          id="stock-switch"
          label="Còn hàng"
          checked={onlyInStock}
          onChange={(e) => setOnlyInStock(e.target.checked)}
          className="mb-3"
        />

        <div className="mb-3">
          <Form.Label>Danh mục</Form.Label>

          <div className="d-flex flex-wrap gap-2">
            {categories.map((name) => (
              <Button
                key={name}
                variant={
                  category === name
                    ? 'primary'
                    : 'outline-primary'
                }
                onClick={() => setCategory(name)}
              >
                {name}
              </Button>
            ))}
          </div>
        </div>

        <Button
          variant="outline-secondary"
          onClick={handleClearFilters}
        >
          Xóa lọc
        </Button>
      </div>

      <div className="mb-3">
        <strong>
          Tìm thấy {visibleProducts.length}/{products.length} sản phẩm
        </strong>
      </div>

      {visibleProducts.length === 0 ? (
        <Alert variant="warning">
          Không có sản phẩm phù hợp
        </Alert>
      ) : (
        <ProductList
          products={visibleProducts}
          onAddToCart={onAddToCart}
        />
      )}
    </div>
  );
}

export default ProductFilter;