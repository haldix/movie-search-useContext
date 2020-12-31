import React from 'react';
import MovieCard from './MovieCard';
import './styles/MovieGrid.scss';

const MovieGrid = ({ movies }) => {
  // Sort to push movies w/o image to back of array
  let sortedMovies = noImgToBack(movies);

  return (
    <section className='card-grid'>
      {sortedMovies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </section>
  );
};

function noImgToBack(arr) {
  const hasImgs = [];
  const noImgs = [];
  arr.forEach((movie, i) => {
    movie.poster_path ? hasImgs.push(movie) : noImgs.push(movie);
  });
  return [...hasImgs, ...noImgs];
}

export default MovieGrid;
