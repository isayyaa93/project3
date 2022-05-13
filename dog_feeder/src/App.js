import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Navbar from './shared/Navbar';
import DogsContainer from './dogs/DogsContainer';
import FeedsContainer from './feeds/FeedsContainer';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/dogs">
          <DogsContainer />
        </Route>
        <Route path="/feeds">
          <FeedsContainer />
        </Route>
        <Redirect to="/dogs"></Redirect>
      </Switch>
    </Router>
    
  );
}

export default App;
