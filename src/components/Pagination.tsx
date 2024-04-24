import React from 'react';
import ReactPaginate from 'react-paginate';
import '../assets/styles/components/Pagination.scss';

type PaginationProps = {
  page: number;
  onChangePage: (page: number) => void;
};

const CustomPagination: React.FC<PaginationProps> = ({ page, onChangePage }) => {
  return (
    <div className='pagination'>
      <ReactPaginate
        breakLabel='...'
        nextLabel='>'
        onPageChange={(event) => onChangePage(event.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={50}
        forcePage={page - 1}
        previousLabel='<'
      />
    </div>
  );
};

export default CustomPagination;
