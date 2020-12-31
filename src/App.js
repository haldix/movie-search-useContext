import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ActorScreen from './screens/ActorScreen';
import ActorSearchScreen from './screens/ActorSearchScreen';
import MovieSearchScreen from './screens/MovieSearchScreen';
import MovieScreen from './screens/MovieScreen';
function App() {
  return (
    <Router>
      <Navbar />
      <Route exact path='/actor/:id' component={ActorScreen} />
      <Route exact path='/movie/:id' component={MovieScreen} />
      <Route path='/movie' exact component={MovieSearchScreen} />
      <Route path='/' exact component={ActorSearchScreen} />
    </Router>
  );
}

export default App;
