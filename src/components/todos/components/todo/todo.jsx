import PropTypes from 'prop-types';
import { getValidClasses } from 'helpers/helpers';
import { todoType } from 'common/prop-types/prop-types';
import { AppPath, TodoStatus } from 'common/enums/enums';
import { Link } from 'components/common/common';
import './style.css';

const Todo = ({ todo, isDisabled, onStatusChange, onTodoEdit, onTodoDelete }) => {
  const isDone = todo.status === TodoStatus.DONE;

  const handleStatusChange = () => {
    const status = isDone ? TodoStatus.OPEN : TodoStatus.DONE;

    onStatusChange(todo, status);
  };

  const handleTodoEdit = () => {
    onTodoEdit(todo);
  };

  const handleTodoDelete = () => {
    onTodoDelete(todo);
  };

  return (
    <li className={getValidClasses('todo', isDone && 'todo--done')}>
      <h3 className="todo__title">
        <Link to={`${AppPath.TODOS}/${todo.id}`}>{todo.title}</Link>
      </h3>
      <p className="todo__description">{todo.description}</p>
      <footer className="todo__footer">
        <strong className="todo__status">{todo.priority}</strong>
        <div className="todo__nav-wrapper" tabIndex="0" role="button">
          <span className="todo__nav">...</span>
          <ul className="todo__nav-list">
            <li className="todo__nav-item">
              <button
                onClick={handleStatusChange}
                disabled={isDisabled}
                className="todo__button todo__button--done"
                type="button"
              >
                done
              </button>
            </li>
            <li className="todo__nav-item">
              <button
                onClick={handleTodoEdit}
                disabled={isDisabled}
                className="todo__button todo__button--edit"
                type="button"
              >
                edit
              </button>
            </li>
            <li className="todo__nav-item">
              <button
                onClick={handleTodoDelete}
                disabled={isDisabled}
                className="todo__button todo__button--delete"
                type="button"
              >
                delete
              </button>
            </li>
          </ul>
        </div>
      </footer>
    </li>
  );
};

Todo.propTypes = {
  todo: todoType.isRequired,
  isDisabled: PropTypes.bool.isRequired,
  onStatusChange: PropTypes.func.isRequired,
  onTodoEdit: PropTypes.func.isRequired,
  onTodoDelete: PropTypes.func.isRequired,
};

export default Todo;
