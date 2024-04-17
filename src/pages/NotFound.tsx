import React from 'react';

const NotFound: React.FC = () => {
  return (
    <div className='not-found'>
      <h1>
        <span>&#128546;</span> <br />
        Ничего не найдено{' '}
      </h1>
      <p>К сожалению, данная страница недоступна </p>
    </div>
  );
};

export default NotFound;
