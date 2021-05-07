import PropTypes from 'prop-types';
import './styles.css';

const Placeholder = ({ text }) => <p className="placeholder">{text}</p>;

Placeholder.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Placeholder;
