import React, { Component } from 'react';
import './App.css';
import RSS from './components/RSS';
import { BrowserRouter, Route } from "react-router-dom";


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Route path="/Awesome" render={(routeProps) => (
    <RSS {...['https://9gag-rss.com/api/rss/get?code=9GAGAwesome&format=2']} />
  )} exact/>
          <Route path="/Comic" render={(routeProps) => (
        <RSS {...['https://9gag-rss.com/api/rss/get?code=9GAGComic&format=2']} />
        )} exact/>
        <Route path="/Funny" render={(routeProps) => (
      <RSS {...['https://9gag-rss.com/api/rss/get?code=9GAGFunny&format=2']} />
      )} exact/>
      <Route path="/" render={(routeProps) => (
    <RSS {...['https://9gag-rss.com/api/rss/get?code=9GAGHot&format=2']} />
    )} exact/>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
