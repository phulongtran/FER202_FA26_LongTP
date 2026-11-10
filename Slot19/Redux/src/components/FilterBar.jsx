
import { useDispatch, useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';

import { setFilter } from '../redux/todos/actions';
import { selectFilter } from '../redux/todos/selectors';

const filters = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Chưa hoàn thành', value: 'active' },
  { label: 'Đã hoàn thành', value: 'completed' },
];

export default function FilterBar() {
  const dispatch = useDispatch();
  const currentFilter = useSelector(selectFilter);

  return (
    <div className="d-flex justify-content-center my-3">
      <ButtonGroup>
        {filters.map((filter) => (
          <Button
            key={filter.value}
            variant={
              currentFilter === filter.value
                ? 'primary'
                : 'outline-primary'
            }
            onClick={() => dispatch(setFilter(filter.value))}
          >
            {filter.label}
          </Button>
        ))}
      </ButtonGroup>
    </div>
  );
}
