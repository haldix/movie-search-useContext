import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMovieDetails } from '../actions/movieActions';
import noPhoto from '../images/no-image-available.png';
import './styles/MovieScreen.scss';

const MovieScreen = ({ match }) => {
  const movieData = useSelector((state) => state.movieData);

  const {
    loading,
    error,
    movie: { overview, title, poster_path, backdrop_path, release_date },
  } = movieData;

  const formatDate = (date) => {
    return date.slice(0, 4);
  };

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl = !backdrop_path
    ? poster_path
      ? `${baseUrl}${poster_path}`
      : noPhoto
    : `${baseUrl}${backdrop_path}`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMovieDetails(match.params.id));
  }, [dispatch, match]);

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
