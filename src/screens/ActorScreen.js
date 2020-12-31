import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getActorDetails } from '../actions/actorActions';
import noPhoto from '../images/no-image-available.png';
import format from 'date-fns/format';
import './styles/ActorScreen.scss';

const ActorScreen = ({ match }) => {
  const actorData = useSelector((state) => state.actorData);

  const {
    loading,
    error,
    actor: { biography, birthday, deathday, name, profile_path },
  } = actorData;

  const formatDate = (date) => {
    let fdate = new Date(`${date} 00:00`);
    console.log(date, fdate);
    return format(fdate, 'MMMM d, yyyy');
  };

  const baseUrl = 'https://image.tmdb.org/t/p/w500';
  const imgUrl = !profile_path ? noPhoto : `${baseUrl}${profile_path}`;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getActorDetails(match.params.id));
  }, [dispatch, match]);

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
