import './index.css'
import FrontPage from './components/FrontPage';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Gallery from './components/Gallery';
import Products from './components/Products';
import 'semantic-ui-css/semantic.min.css';



function App() {

  
  
  return (
        <Router>
            <Switch>
                <Route path='/Galleria'>
                    <Gallery/>
                </Route>
                <Route path='/Tuotteet'>
                    <Products/>
                </Route>
                <Route path='/'>
                    <FrontPage/>
                </Route>
            </Switch>
          </Router>
  );
}

export default App;
