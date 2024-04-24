import React, { useState, useEffect } from 'react';
import { List } from 'antd';
import axios from 'axios';
import { Review } from '../../@types/types';
import ReactPaginate from 'react-paginate';

interface ReviewsProps {
  movieId: number;
}

const API_KEY: string = import.meta.env.VITE_API_KEY as string;

const Reviews: React.FC<ReviewsProps> = ({ movieId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const reviewsPerPage = 1; // Количество отзывов на одной странице

  useEffect(() => {
    async function fetchReviews() {
      try {
        const { data } = await axios.get(
          `https://api.kinopoisk.dev/v1.4/review?movieId=${movieId}`,
          {
            headers: {
              accept: 'application/json',
              'X-API-KEY': API_KEY,
            },
          },
        );
        setReviews(data.docs);
      } catch (error) {
        console.error('Ошибка при получении отзывов:', error);
        alert('Ошибка при получении отзывов!');
      }
    }

    if (movieId) {
      fetchReviews();
    }
  }, [movieId]);

  const handlePageChange = (selectedPage: number) => {
    setCurrentPage(selectedPage);
  };

  const pageCount = Math.ceil(reviews.length / reviewsPerPage);
  const offset = (currentPage - 1) * reviewsPerPage;
  const currentReviews = reviews.slice(offset, offset + reviewsPerPage);

  return (
    <div>
      {reviews.length > 0 ? (
        <>
          <List
            itemLayout='horizontal'
            dataSource={currentReviews}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta title={item.title} description={item.author} />
                {item.review}
              </List.Item>
            )}
          />
          <div className='pagination'>
            <ReactPaginate
              pageCount={pageCount}
              nextLabel='>'
              previousLabel='<'
              onPageChange={(selectedItem) => handlePageChange(selectedItem.selected + 1)}
              containerClassName={'pagination'}
              activeClassName={'active'}
            />
          </div>
        </>
      ) : (
        <p>Пока нет отзывов</p>
      )}
    </div>
  );
};

export default Reviews;
