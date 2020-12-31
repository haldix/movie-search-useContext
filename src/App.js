import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActorScreen from './screens/ActorScreen';
import ActorSearchScreen from './screens/ActorSearchScreen';
import MovieSearchScreen from './screens/MovieSearchScreen';
import MovieScreen from './screens/MovieScreen';
import ActorState from './context/actor/ActorState';
import MovieState from './context/movie/MovieState';
function App() {
  return (
    <ActorState>
      <MovieState>
        <Router>
          <Navbar />
          <Route exact path='/actor/:id' component={ActorScreen} />
          <Route exact path='/movie/:id' component={MovieScreen} />
          <Route path='/movie' exact component={MovieSearchScreen} />
          <Route path='/' exact component={ActorSearchScreen} />
        </Router>
      </MovieState>
    </ActorState>
  );
}

export default App;
