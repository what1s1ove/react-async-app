
import { useEffect, useSelector, useDispatch, useRouter } from 'hooks/hooks';
import { todo as todoActionCreator } from 'store/actions';
import { DataPlaceholder, DataStatus } from 'common/enums/enums';
import { Loader, Placeholder } from 'components/common/common';
import './styles.css';

const TodoPreview = () => {
  const { todo, status } = useSelector(({ todo }) => ({
    todo: todo.todo,
    status: todo.status,
  }));
  const dispatch = useDispatch();
  const { query } = useRouter();

  useEffect(() => {
    dispatch(todoActionCreator.fetchTodo(query.id));
  }, [dispatch, query.id]);

  if (status !== DataStatus.SUCCESS) {
    return <Loader />;
  }

  if (!todo) {
    return <Placeholder text={DataPlaceholder.NO_TODO} />;
  }

  return (
    <section className="todo-preview">
      <h1 className="todo-preview__title">Todo: {todo.title}</h1>
      <dl className="todo-preview__list">
        <div className="todo-preview__item">
          <dt className="todo-preview__item-title">Description:</dt>
          <dd className="todo-preview__item-desc">{todo.description}</dd>
        </div>
        <div className="todo-preview__item">
          <dt className="todo-preview__item-title">Priority:</dt>
          <dd className="todo-preview__item-desc">{todo.priority}</dd>
        </div>
        <div className="todo-preview__item">
          <dt className="todo-preview__item-title">Status:</dt>
          <dd className="todo-preview__item-desc">{todo.status}</dd>
        </div>
      </dl>
    </section>
  );
};

export default TodoPreview;
