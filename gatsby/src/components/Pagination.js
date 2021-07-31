import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import styled from 'styled-components';

export default function Pagination({ pageSize, totalCount, currentPage, skip, base }) {
  const totalPages = Math.ceil(totalCount / pageSize);
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;
  // console.log({ currentPage, nextPage, prevPage });
  // did we reach last page?
  const hasNextPage = nextPage <= totalPages;
  const hasPrevPage = prevPage >= 1;
  console.clear();
  console.log(skip);
  // console.log({ hasPrevPage, hasNextPage });

  const PaginationStyles = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-items: center;
    margin: 2rem 0;
    border: 1px solid var(--grey);
    border-radius: 5px;
    text-align: center;

    & > * {
      flex: 1;
      padding: 1rem;
      border-right: 1px solid var(--grey);
      text-decoration: none;

      &[aria-current],
      &.current {
        color: var(--red);
      }

      &[disabled] {
        color: var(--grey);
        pointer-events: none;
      }
    }
  `;

  return (
    <PaginationStyles>
      <Link disabled={!hasPrevPage} to={`${base}/${prevPage}`}>
        &#8592; Prev
      </Link>
      {Array.from({ length: totalPages }).map((_, i) => (
        <Link className={currentPage === 1 && i === 0 ? 'current' : ''} key={i} to={`${base}/${i > 0 ? i + 1 : ''}`}>
          {i + 1}
        </Link>
      ))}
      <Link disabled={!hasNextPage} to={`${base}/${nextPage}`}>
        Next &#8594;{' '}
      </Link>
    </PaginationStyles>
  );
}

Pagination.propTypes = {
  pageSize: PropTypes.number,
  totalCount: PropTypes.number,
  currentPage: PropTypes.number,
  skip: PropTypes.number,
  base: PropTypes.string,
};
