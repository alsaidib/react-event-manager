import React, { Component } from 'react';
//import update from 'immutability-helper';
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom";
import { Menu, Dimmer, Loader, Icon } from 'semantic-ui-react'
import Location from "./components/Location"
import TodoList from "./components/TodoList"
import Events from "./components/Events";
import AddEvents from "./components/AddEvents";
import EventDetail from "./components/EventDetail";
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase from 'firebase/app';
import 'firebase/auth';
import './App.css';
import base, { uiConfig } from "./components/Base";
var _ = require('lodash');

class App extends Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      events: [],
      theMostLikedEvents: [],
      locationList: []
    }
  }
  ////// fitting bounds/////
  getMinOrMax = (markersObj, minOrMax, latOrLng) => {

    if (minOrMax === "max") {
      return _.maxBy(markersObj, function (value) {
        return value[latOrLng]
      })[latOrLng];
    } else {
      return _.minBy(markersObj, function (value) {
        return value[latOrLng]
      })[latOrLng];
    }
  }

  getBounds = (markersObj) => {
    var maxLat = this.getMinOrMax(markersObj, "max", "lat");
    var minLat = this.getMinOrMax(markersObj, "min", "lat");
    var maxLng = this.getMinOrMax(markersObj, "max", "lng");
    var minLng = this.getMinOrMax(markersObj, "min", "lng");

    var southWest = [minLng, minLat];
    var northEast = [maxLng, maxLat];
    return [southWest, northEast];
  }

  // componentWillMount() {
  //   console.log("will mount");
  // }
  ///// firebase config ///////
  componentDidMount() {
    console.log("did mount");

    base.syncState("events/", {
      context: this,
      state: "events",
      asArray: true,
      then: () => {
        this.setState({ isLoading: false })

        this.theMoreLikedEvents()
        this.sendEventsToGetLocation();
      }
    });

    // put the auth func here to be sure that my app is loaded here
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => this.setState({ isSignedIn: !!user })
    );

  }

  componentWillUnmount() {
    this.unregisterAuthObserver();
  }


  ///////getting data from firebase and send it to location///////
  sendEventsToGetLocation = () => {
    const copyOfevents = [...this.state.events];
    const location = copyOfevents.map(eventLocation => {
      return (eventLocation.city)
    })
    this.setState({
      locationList: location
    })
  }

  ///////////Adding event/////
  addEvent = obj => {
    this.setState({
      events: [obj, ...this.state.events]
    });
  }
  //// filtering the more liked events////
  theMoreLikedEvents = () => {
    const copyOfArray = [...this.state.events];
    copyOfArray.sort((a, b) => b.liked - a.liked);
    this.setState({
      theMostLikedEvents: (copyOfArray.splice(0, 3))
    })
    return console.log(this.state.theMostLikedEvents)
  }


  ///// counting likes /////
  countLikes = e => {
    e.preventDefault();

    const key = parseInt(e.currentTarget.getAttribute("index"), 10);
    const copy = this.state.events;
    copy[key].liked++;
    this.setState({
      events: copy
    })
  }

  ///// getting coordinate //////
  getCoordinates = (e) => {

    const copyOfEvents = this.state.events;
    // console.log(copyOfEvents)
    const eventsArray = [];
    copyOfEvents.map((event, index) => {
      return (eventsArray.push(event.location)
      )
    })

    return this.getBounds(eventsArray)
  }

  render() {
    return (
      <BrowserRouter>
        {/* <Helmet>
        <title></title>
        <meta/>
      </Helmet> */}
        <div>
          <header>
            <Menu tabular>
              <Menu.Item name='Events' content="Events" as={NavLink} to="/" exact={true} />
              <Menu.Item name='Add Events' content="Add Events" as={NavLink} to="/add-event" />
              <Menu.Item name='Todo' content="Todo List" as={NavLink} to="/todo" />
              <Menu.Item as={NavLink} to="/login">
                <Icon name="sign out alternate"></Icon>
              </Menu.Item>
            </Menu>
          </header>
          {/**/}
          {this.state.isLoading && <Dimmer active inverted><Loader inverted content="Loading data" /></Dimmer>}
          <Switch>
            <Route exact path="/login">{!this.state.isSignedIn ?
              <div>
                <p>Please sign-in:</p>
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
              </div> : <div>
                <p>Welcome {firebase.auth().currentUser.displayName}! You are now signed-in!</p>
                <a onClick={() => firebase.auth().signOut()}>Sign-out</a>
              </div>
            }
            </Route>

            <Route exact path="/">
              {!this.state.isLoading && <Events events={this.state.events} countLikes={this.countLikes} theMostLikedEvents={this.state.theMostLikedEvents}
                getCoordinates={this.getCoordinates} />}
            </Route>
            <Route exact path="/add-event" render={() => <AddEvents events={this.state.events} addEvent={this.addEvent} />} />
            <Route path="/event/:id/:event" render={(props) => <EventDetail {...props} events={this.state.events} />} />
            <Route path="/todo" render={props => (<TodoList />)}>
            </Route>
            <Route path="/location" render={() => <Location locationsList={this.state.locationList} />} />
          </Switch>
        </div>
      </BrowserRouter >
    );
  }
}

export default App;




