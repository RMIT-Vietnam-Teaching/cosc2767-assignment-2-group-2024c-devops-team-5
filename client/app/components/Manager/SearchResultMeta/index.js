/**
 *
 * SearchResultMeta
 *
 */

import React from 'react';

const SearchResultMeta = props => {
  const { count, label } = props;

  return (
    <p className='fw-normal' data-cy="search-result-meta">
      {count} {label}
    </p>
  );
};

export default SearchResultMeta;
