import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import './styles/Pagination.scss';

const Pagination = ({ total_pages, keywords, page, nextPage }) => {
  const dispatch = useDispatch();

  const pageLinks = [];
  // value of  5 returns first 100 results from API, could use prop
  const numPages = total_pages < 6 ? total_pages : 5;

  for (let i = 1; i <= numPages; i++) {
    let active = i === page ? 'active' : '';
    pageLinks.push(
      <li
        className='pag-item'
        key={i}
        onClick={() => dispatch(nextPage(keywords, i))}
      >
        <a href='#!' className={`${active}`}>
          {i}
        </a>
      </li>
    );
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  return (
    <section className='pagination'>
      <ul className='pag-list'>
        {page > 1 && (
          <li
            className='pag-item prev-next'
            onClick={() => dispatch(nextPage(keywords, page - 1))}
          >
            <a href='#!'>PREV</a>
          </li>
        )}
        {pageLinks}
        {page < numPages && (
          <li
            className='pag-item prev-next'
            onClick={() => dispatch(nextPage(keywords, page + 1))}
          >
            <a href='#!'>NEXT</a>
          </li>
        )}
      </ul>
    </section>
  );
};

export default Pagination;
