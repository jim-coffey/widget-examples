import React, { Component } from "react";
// We will load the widgets async using react-loadable.
import Loadable from "react-loadable";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);

    // define the initial state where none of the widgets are visible
    this.state = {
      hackerNews: false,
      weather: false
    };
  }

  render() {
    return (
      <div className="App">
        <h1>Widgets</h1>
        <div className="checkboxes">
          <input type="checkbox" onChange={this.onHackerNewsToggled} />
          <label>Hacker News</label>
          <input type="checkbox" onChange={this.onWeatherToggled} />
          <label>Weather</label>
        </div>
        <div className="widgets">{this.renderContent()}</div>
      </div>
    );
  }

  onHackerNewsToggled = () => {
    this.setState({ hackerNews: !this.state.hackerNews });
  };
  onWeatherToggled = () => {
    this.setState({ weather: !this.state.weather });
  };

  renderContent = () => {
    return (
      <>
        {this.getHackerNews()}
        {this.getWeather()}
      </>
    );
  };

  _hackerNews = null;
  getHackerNews() {
    if (!this.state.hackerNews) {
      return null;
    }

    if (this._hackerNews) {
      return this._hackerNews;
    }

    const LoadableHackerNews = Loadable({
      loader: () => import("./widgets/hacker-news"),
      loading: () => <div>Loading Scripts...</div>
    });
    this._hackerNews = <LoadableHackerNews />;
    return this._hackerNews;
  }

  getWeather() {
    if (!this.state.weather) {
      return null;
    }
    if (this._weather) {
      return this._weather;
    }

    const LoadableWeather = Loadable({
      loader: () => import("./widgets/weather"),
      loading: () => <div>Loading Scripts...</div>
    });
    this._weather = <LoadableWeather />;
    return this._weather;
  }
}

export default App;
