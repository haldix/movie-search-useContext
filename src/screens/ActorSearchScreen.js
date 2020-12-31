import React, { useState, useContext } from 'react';
import CardGrid from '../components/CardGrid';
import Pagination from '../components/Pagination';
import Message from '../components/Message';
import './styles/ActorSearchScreen.scss';
import ActorContext from '../context/actor/actorContext';

const ActorSearchScreen = () => {
  const [name, setName] = useState('');

  const actorContext = useContext(ActorContext);
  const {
    loading,
    keywords,
    person,
    message,
    getPerson,
    personNextPage,
  } = actorContext;

  const nameHandler = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    getPerson(name);
    setName('');
  };

  return (
    <div className='container'>
      <h1>Actor Search Screen</h1>
      <form className='form-search' onSubmit={submitHandler}>
        <label htmlFor='name'>Search for Actor by Name</label>
        <div className='input-group'>
          <input id='name' value={name} onChange={nameHandler} />
          <button type='submit'>Submit</button>
        </div>
      </form>
      {loading && <h2>LOADING...</h2>}
      {message && <Message message={message} />}
      {person && person.total_results === 0 && (
        <h2>No Results Found for {keywords.replace('+', ' ')}</h2>
      )}
      {person && person.results.length !== 0 && (
        <>
          <h2>Search Results for {keywords.replace('+', ' ')}</h2>
          <CardGrid persons={person.results} />
        </>
      )}
      {person && person.total_pages > 0 && (
        <Pagination
          keywords={keywords}
          total_pages={person.total_pages}
          page={person.page}
          nextPage={personNextPage}
        />
      )}
    </div>
  );
};

export default ActorSearchScreen;
