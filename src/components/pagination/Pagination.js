import React, { PropTypes } from 'react';
import PaginationView from './PaginationView';

export default class Pagination extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.state = {
      prevPage: (this.props.currentPage !== 1) ? this.props.currentPage - 1 : null,
      nextPage: (this.props.currentPage !== this.props.totalPages) ? this.props.currentPage + 1 : null
    };

    this.setNextPage = this.setNextPage.bind(this);
    this.setPrevPage = this.setPrevPage.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setPrevPage(nextProps);
    this.setNextPage(nextProps);
  }

  setPrevPage(props) {
    this.setState({
      prevPage: (props.currentPage !== 1) ? props.currentPage - 1 : null
    });
  }

  setNextPage(props) {
    this.setState({
      nextPage: (props.currentPage !== props.totalPages) ? props.currentPage + 1 : null
    });
  }

  render() {
    const { totalPages } = this.props;

    const {
      prevPage,
      nextPage
    } = this.state;

    // end pagination if we have 0 pages
    if (totalPages === 0) {
      return null;
    }

    return (
      <nav className="pagination-container">
        {(totalPages !== 1) && (
          <PaginationView
            {...this.props}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        )}
      </nav>
    );
  }
}

Pagination.propTypes = {
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  handleClick: PropTypes.func,
  namespace: PropTypes.string,
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,
  showEllipses: PropTypes.bool
};

Pagination.defaultProps = {
  handleClick: () => {},
  namespace: 'p'
};
