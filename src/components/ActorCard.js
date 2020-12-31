import React from 'react';
import { Link } from 'react-router-dom';
import './styles/ActorCard.scss';
import noPhoto from '../images/no-image-available.png';

const ActorCard = (props) => {
  const { id, name, profile_path } = props.actor;

  const baseUrl = 'https://image.tmdb.org/t/p/w500';

  const imgUrl = !profile_path ? noPhoto : `${baseUrl}${profile_path}`;
  return (
    <div className='actor-card'>
      <Link to={`/actor/${id}`}>
        <figure>
          <img src={imgUrl} alt={name} />
        </figure>
        <div className='card-info'>
          <p className='name'>{name}</p>
        </div>
      </Link>
    </div>
  );
};

export default ActorCard;
