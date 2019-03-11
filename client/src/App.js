import React, { Component } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import axios from "axios";
import News from "./components/news/news";
import Navbar from "./components/navbar/navbar";
import Search from "./components/search/search";

class App extends Component {
  state = {
    news: []
  };

  componentDidMount() {
    axios.get("http://localhost:5050/api/v1/news").then(res => {
      // console.log(res.data);
      this.setState({ news: res.data });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Navbar changed={this.changeHandler} text={this.state.searchText} />
          <Route
            exact
            path="/"
            render={props => (
              <div className="container">
                <News data={this.state.news} />
              </div>
            )}
          />
          <Route path="/search" component={Search} />
        </div>
      </Router>
    );
  }
}

export default App;
