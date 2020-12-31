import React, { useEffect, useContext } from 'react';
import noPhoto from '../images/no-image-available.png';
import './styles/MovieScreen.scss';
import MovieContext from '../context/movie/movieContext';

const MovieScreen = ({ match }) => {
  const movieContext = useContext(MovieContext);

  const {
    loading,
    error,
    getMovieDetails,
    movie: { overview, title, poster_path, backdrop_path, release_date },
  } = movieContext;

  const formatDate = (date) => {
    return date.slice(0, 4);
  };

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl = !backdrop_path
    ? poster_path
      ? `${baseUrl}${poster_path}`
      : noPhoto
    : `${baseUrl}${backdrop_path}`;

  useEffect(() => {
    getMovieDetails(match.params.id);
    // eslint-disable-next-line
  }, [match]);

  return (
    <div className='container'>
      <h1>Movie Details</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p>error</p>
      ) : (
        <div className='movie-details'>
          <figure>
            <img src={imgUrl} alt={title} />
          </figure>
          {title && release_date && (
            <h2>
              {title}&nbsp;&nbsp;
              <span className='date'>({formatDate(release_date)})</span>
            </h2>
          )}

          <p className='overview'>{overview}</p>
        </div>
      )}
    </div>
  );
};

export default MovieScreen;
