import { getLastPath } from 'helpers/helpers';
import { AppPath } from 'common/enums/enums';
import { Header, Footer } from './common/common';
import Todos from './todos/todos';
import TodoPreview from './todo-preview/todo-preview';
import NotFound from './not-found/not-found';

const App = () => {
  const { pathname } = window.location;

  const getScreen = (path) => {
    const id = getLastPath(path);

    switch (path) {
      case AppPath.ROOT: {
        return <Todos />;
      }
      case `${AppPath.TODOS}/${id}`: {
        return <TodoPreview />;
      }
      default: {
        return <NotFound />;
      }
    }
  };

  return (
    <>
      <Header />
      <main>{getScreen(pathname)}</main>
      <Footer />
    </>
  );
};

export default App;