import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { todos as todosActionCreator } from 'store/actions';
import { DataPlaceholder } from 'common/enums/enums';
import { Placeholder } from 'components/common/common';
import { TodoFilter, TodoList, TodoPopup } from './components/components'; 
import { getFilteredTodos } from './helpers/helpers';
import { DEFAULT_FILTER_VALUES, EMPTY_TODO } from './common/constants';
import './styles.css';

const Todos = () => {
  const { todos } = useSelector(({ todos }) => ({
    todos: todos.todos,
  }));
  const [currentTodo, setCurrentTodo] = useState(null);
  const [filterValues, setFilterValues] = useState(DEFAULT_FILTER_VALUES);

  const dispatch = useDispatch();
  const filteredTodos = getFilteredTodos(todos, filterValues);
  const hasTasks = Boolean(filteredTodos.length);

  const handlerFilterChange = (values) => setFilterValues(values);

  const handleAddPopupOpen = () => setCurrentTodo(EMPTY_TODO);

  const handleAddPopupClose = () => setCurrentTodo(null);


  const handleTodoEdit = (todo) => setCurrentTodo(todo);

  const handleTodoSave = useCallback((todo) => {
    const isUpdate = Boolean(todo.id);

    dispatch(isUpdate ? todosActionCreator.updateTodo(todo) : todosActionCreator.addTodo(todo));

    setCurrentTodo(null)
  }, [dispatch]);

  const handlerTodoStatusChange = useCallback((todo, status) => {
    dispatch(todosActionCreator.changeStatus(todo.id, status));
  }, [dispatch]);

  const handleTodoDelete = useCallback((todo) => {
    dispatch(todosActionCreator.deleteTodo(todo));
  }, [dispatch]);

  useEffect(() => {
    dispatch(todosActionCreator.fetchTodos());
  }, [dispatch]);

  return (
    <>
      <section className="todo-filter">
        <h2 className="sr-only">TODOList filter</h2>
        <TodoFilter
          onChange={handlerFilterChange}
          onPopupOpen={handleAddPopupOpen}
          values={filterValues}
        />
      </section>
      <section className="todos">
        <h2 className="sr-only">Your TODOList</h2>
        {hasTasks ? (
          <TodoList
            todos={filteredTodos}
            onStatusChange={handlerTodoStatusChange}
            onTodoEdit={handleTodoEdit}
            onTodoDelete={handleTodoDelete}
          />
        ) : (
          <Placeholder text={DataPlaceholder.NO_TODOS} />
        )}
      </section>
      {currentTodo && (
        <TodoPopup
          todo={currentTodo}
          onSave={handleTodoSave}
          onClose={handleAddPopupClose}
        />
      )}
    </>
  );
};

export default Todos;