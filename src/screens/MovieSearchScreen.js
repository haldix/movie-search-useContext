import React, { useState, useContext } from 'react';
import MovieGrid from '../components/MovieGrid';
import Pagination from '../components/Pagination';
import Message from '../components/Message';
import './styles/MovieSearchScreen.scss';
import MovieContext from '../context/movie/movieContext';

const MovieSearchScreen = () => {
  const [title, setTitle] = useState('');

  const movieContext = useContext(MovieContext);
  const {
    loading,
    movies,
    keywords,
    message,
    getMovie,
    movieNextPage,
  } = movieContext;

  const titleHandler = (e) => {
    const title = e.target.value;
    setTitle(title);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getMovie(title);
    setTitle('');
  };

  return (
    <div className='container'>
      <h1>Movie Search Screen</h1>
      <form className='form-search' onSubmit={submitHandler}>
        <label htmlFor='name'>Search for Movie By Title</label>
        <div className='input-group'>
          <input id='name' value={title} onChange={titleHandler} />
          <button type='submit'>Submit</button>
        </div>
      </form>
      {loading && <h2>LOADING...</h2>}
      {message && <Message message={message} />}
      {movies && movies.total_results === 0 && (
        <h2>No Results Found for {keywords.replace('+', ' ')}</h2>
      )}
      {movies && movies.results.length !== 0 && (
        <>
          <h2>Search Results for {keywords.replace('+', ' ')}</h2>
          <MovieGrid movies={movies.results} />
        </>
      )}
      {movies && movies.total_pages > 0 && (
        <Pagination
          keywords={keywords}
          total_pages={movies.total_pages}
          page={movies.page}
          nextPage={movieNextPage}
        />
      )}
    </div>
  );
};

export default MovieSearchScreen;
