import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import CreateAuction from "./components/auction/CreateAuction";
import ShoppingList from './components/ShoppingList';
import ItemModal from './components/ItemModal';
import { Container } from 'reactstrap';
import Posts from "./components/Posts";
import RenderAuction from "./components/auction/RenderAuction";
import AuctionDetails from "./components/auction/AuctionDetails";
import LandingPage from "./components/LandingPage";

import { Provider } from 'react-redux';
import store from './store';
import { loadUser } from './actions/authActions';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { returnErrors } from './actions/errorActions';

class App extends Component {

  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Router>
      <Provider store={store}>
        
        <div className='App'>
          <AppNavbar />
          <Route path="/" exact>
             <LandingPage />
          </Route>

          {/* <Container>
            <ItemModal />
            <ShoppingList />
            <Posts/>
          </Container> */}
        <Switch>
          <Route path="/auction_details/:id" exact component={AuctionDetails}/>
          <Route path="/create_auction" exact component={CreateAuction} />
          <Route path="/render_auction" exact component={RenderAuction} />
        </Switch>

        </div>
        
      </Provider>
      </Router>
    );
  }
}

export default App;
