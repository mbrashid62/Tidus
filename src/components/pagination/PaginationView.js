import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import cn from 'classnames';

import { PAGINATION_CONTROLS } from '../pagination/config';

export default class PaginationView extends React.Component {

  constructor(props, context) {
    super(props, context);

    this.renderPaginationLink = this.renderPaginationLink.bind(this);
    this.renderPaginationItems = this.renderPaginationItems.bind(this);
  }

  /**
   * Renders a link to a page. This attaches the passed in click handler as well. The click handler
   * is invoked with the page number unless a separate clickIndicator is provided (e.g. "next", "prev").
   *
   * @param {{
   *   pageNum: Number,
   *   className: ?String,
   *   ariaLabel: ?String,
   *   content: ?React.Element,
   *   clickIndicator: ?String,
   * }} opts
   * @returns {React.Element}
   */
  renderPaginationLink (opts) {
    const { namespace, handleClick, asCanonical } = this.props;
    const { pageNum, className, ariaLabel, content, clickIndicator } = opts;

    const extras = asCanonical ? { rel: 'canonical' } : {};
    return (
      <Link
        aria-label={ariaLabel}
        className={className}
        to={''}
        onClick={(e) => handleClick(e, clickIndicator || pageNum)} // eslint-disable-line
        {...extras}
      >
        {content || pageNum}
      </Link>
    );
  }

  /**
   * Renders the pagination items - indicators for the different pages you can access.
   *
   * @returns {React.Element[]}
   */
  renderPaginationItems () {
    const pagination = [];
    let pageNum = null;

    if (this.props.currentPage !== 1 && this.props.currentPage !== this.props.totalPages) {
      pageNum = this.props.currentPage;
      pagination.push(
        <li key={pageNum} className="active">
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add previous
    if (this.props.currentPage !== 2 && this.props.currentPage !== 1 && this.props.totalPages > 2) {
      pageNum = this.props.prevPage;
      pagination.unshift(
        <li key={pageNum}>
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add previous + 1
    if (this.props.currentPage === this.props.totalPages && this.props.totalPages > 3) {
      pageNum = this.props.prevPage - 1;
      pagination.unshift(
        <li key={pageNum}>
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add next
    if (
      this.props.currentPage !== this.props.totalPages && this.props.totalPages >= 3 && (
        this.props.totalPages < 3 || this.props.currentPage !== (this.props.totalPages - 1)
      )
    ) {
      pageNum = this.props.nextPage;
      pagination.push(
        <li key={pageNum}>
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add next + 1
    if (this.props.currentPage === 1 && this.props.totalPages > 3) {
      pageNum = this.props.nextPage + 1;
      pagination.push(
        <li key={pageNum}>
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add previous ellipsis
    if (this.props.currentPage > 3 && this.props.totalPages > 4) {
      pagination.unshift(<li key="prev-jump" className="divider">...</li>);
    }

    // Add next ellipsis
    if (this.props.currentPage < (this.props.totalPages - 2) && this.props.totalPages > 4) {
      pagination.push(<li key="next-jump" className="divider">...</li>);
    }

    return pagination;
  }

  render() {
    return (
      <ul className="pagination pagination-inner hidden-print">
        {(this.props.currentPage === 1)
          ? (
            <li>
              <a className="glyphicon glyphicon-chevron-left disabled" />
            </li>
          )
          : (
            <li>
              {this.renderPaginationLink({
                ariaLabel: 'Previous',
                className: 'pagination-left',
                pageNum: this.props.prevPage,
                content: <span aria-hidden="true"><i className="glyphicon glyphicon-chevron-left" /></span>,
                clickIndicator: PAGINATION_CONTROLS.PREVIOUS
              })}
            </li>
          )}


        {/* Always show first page */}
        <li className={cn('pagination-first', { active: (this.props.currentPage === 1) })}>
          {this.renderPaginationLink({
            pageNum: 1
          })}
        </li>

        {/* Render the important things */}
        {this.renderPaginationItems()}

        {/* Show last page  */}
        {(this.props.totalPages !== 1) &&
        <li className={cn('pagination-last', { active: (this.props.currentPage === this.props.totalPages) })}>
          {this.renderPaginationLink({
            pageNum: this.props.totalPages
          })}
        </li>
        }

        {/* if current page and last page are the same, hide */}
        {(this.props.currentPage === this.props.totalPages)
          ? (
            <li>
              <a className="glyphicon glyphicon-chevron-right disabled" />
            </li>
          )
          : (
            <li>
              {this.renderPaginationLink({
                ariaLabel: 'Next',
                className: 'pagination-right',
                pageNum: this.props.nextPage,
                content: (<span aria-hidden="true"><i className="glyphicon glyphicon-chevron-right" /></span>),
                clickIndicator: PAGINATION_CONTROLS.NEXT
              })}
            </li>

          )}
      </ul>
    );
  }
}

PaginationView.propTypes = {
  currentPage: PropTypes.number.isRequired,
  totalPages: PropTypes.number.isRequired,
  namespace: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  asCanonical: PropTypes.bool.isRequired,
  nextPage: PropTypes.number,
  prevPage: PropTypes.number
};

PaginationView.displayName = 'components/Global/Pagination/PaginationView';
