import { AppPath } from 'common/enums/enums';
import './style.css';

const PageHeader = () => (
  <header className="page-header">
    <div className="page-header__wrapper">
      <h1 className="page-header__title">
        <a href={AppPath.ROOT}>TODOList</a>
      </h1>
    </div>
  </header>
);

export default PageHeader;
