import React from 'react';
import ActorCard from './ActorCard';
import './styles/CardGrid.scss';

const CardGrid = ({ persons }) => {
  // Sort to push actors w/o image to back of array
  let sortedPersons = noImgToBack(persons);

  return (
    <section className='card-grid'>
      {sortedPersons.map((actor) => (
        <ActorCard key={actor.id} actor={actor} />
      ))}
    </section>
  );
};

function noImgToBack(arr) {
  const hasImgs = [];
  const noImgs = [];
  arr.forEach((actor, i) => {
    actor.profile_path ? hasImgs.push(actor) : noImgs.push(actor);
  });
  return [...hasImgs, ...noImgs];
}

export default CardGrid;
