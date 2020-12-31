import React from 'react';
import { Link } from 'react-router-dom';
import './styles/MovieCard.scss';
import noPhoto from '../images/no-image-available.png';

const MovieCard = (props) => {
  const { id, title, poster_path } = props.movie;

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl = !poster_path ? noPhoto : `${baseUrl}${poster_path}`;
  return (
    <div className='movie-card'>
      <Link to={`/movie/${id}`}>
        <figure>
          <img src={imgUrl} alt={title} />
        </figure>
        <div className='card-info'>
          <p className='title'>{title}</p>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
