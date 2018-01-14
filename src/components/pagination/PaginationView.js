import React, { PropTypes } from 'react';
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
    const { handleClick } = this.props;
    const { pageNum, className, ariaLabel, content, clickIndicator } = opts;

    return (
      <a
        aria-label={ariaLabel}
        className={className}
        onClick={(e) => handleClick(e, clickIndicator || pageNum)} // eslint-disable-line
      >
        {content || pageNum}
      </a>
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

    // if we are not on the first or the last page
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
    // if there are more than two pages and we are not on our first or second page
    if (this.props.totalPages > 2 && this.props.currentPage !== 1 && this.props.currentPage !== 2) {
      pageNum = this.props.prevPage;
      pagination.unshift(
        <li key={pageNum}>
          {this.renderPaginationLink({
            pageNum
          })}
        </li>
      );
    }

    // Add previous - 1
    // if there are more than three pages and we are not on the last page
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

    // if there are more than four pages, let's handle ellipses
    if (this.props.totalPages > 4) {

      // if the user is past the 3rd page,let's add previous ellipses
      if (this.props.currentPage > 3) {
        pagination.unshift(<li key="prev-jump" className="divider">...</li>);
      }

      // if there are more than two pages left, let's add next ellipses
      if (this.props.currentPage < (this.props.totalPages -2)) {
        pagination.push(<li key="next-jump" className="divider">...</li>);
      }
    }

    return pagination;
  }

  render() {
    return (
      <ul className="pagination pagination-inner hidden-print">
        {(this.props.currentPage === 1)
          ? (
            <li className="pagination-left">
              <a className={cn(this.props.leftIcon, 'disabled')} />
            </li>
          ) : (
            <li className="pagination-left">
              {this.renderPaginationLink({
                ariaLabel: 'Previous',
                pageNum: this.props.prevPage,
                content: <span aria-hidden="true"><i className={this.props.leftIcon} /></span>,
                clickIndicator: PAGINATION_CONTROLS.PREVIOUS
              })}
            </li>
          )}


        {/* Show our first link */}
        <li className={cn('pagination-first', { active: (this.props.currentPage === 1) })}>
          {this.renderPaginationLink({
            pageNum: 1
          })}
        </li>

        {/* Render our middle links */}
        {this.renderPaginationItems()}

        {/* if we have multiple pages, show our last link */}
        {(this.props.totalPages !== 1) && (
          <li className={cn('pagination-last', { active: (this.props.currentPage === this.props.totalPages) })}>
            {this.renderPaginationLink({
              pageNum: this.props.totalPages
            })}
          </li>
        )}

        {/* if current page and last page are the same, disable our right-icon, otherwise enable it */}
        {(this.props.currentPage === this.props.totalPages)
          ? (
            <li className="pagination-right">
              <a className={cn(this.props.rightIcon, 'disabled')}/>
            </li>
          ) : (
            <li className="pagination-right">
              {this.renderPaginationLink({
                ariaLabel: 'Next',
                pageNum: this.props.nextPage,
                content: (<span aria-hidden="true"><i className={this.props.rightIcon} /></span>),
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
  leftIcon: PropTypes.string,
  rightIcon: PropTypes.string,

  nextPage: PropTypes.number,
  prevPage: PropTypes.number
};

PaginationView.displayName = 'components/Global/Pagination/PaginationView';
