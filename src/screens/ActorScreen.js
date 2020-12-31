import React, { useEffect, useContext } from 'react';
import ActorContext from '../context/actor/actorContext';
import noPhoto from '../images/no-image-available.png';
import format from 'date-fns/format';
import './styles/ActorScreen.scss';

const ActorScreen = ({ match }) => {
  const actorContext = useContext(ActorContext);

  const {
    loading,
    error,
    getActorDetails,
    actor: { biography, birthday, deathday, name, profile_path },
  } = actorContext;

  const formatDate = (date) => {
    let fdate = new Date(`${date} 00:00`);
    return format(fdate, 'MMMM d, yyyy');
  };

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl = !profile_path ? noPhoto : `${baseUrl}${profile_path}`;

  useEffect(() => {
    getActorDetails(match.params.id);
    // eslint-disable-next-line
  }, [match]);

  return (
    <div className='container'>
      <h1>Actor Details</h1>
      {loading ? (
        <h2>Loading...</h2>
      ) : error ? (
        <p>error</p>
      ) : (
        <div className='actor-details'>
          <figure>
            <img src={imgUrl} alt={name} />
          </figure>
          <h2>{name}</h2>
          <p className='birthday'>
            {birthday && <span>Born: {formatDate(birthday)}&nbsp;&nbsp;</span>}
            {deathday && <span>Died: {formatDate(deathday)}</span>}
          </p>
          <p className='bio'>{biography}</p>
        </div>
      )}
    </div>
  );
};

export default ActorScreen;
