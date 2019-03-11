import React, { Component } from "react";
import axios from "axios";
import SearchTron from "./searchTron";
import News from "../news/news";

export default class search extends Component {
  state = {
    searchNews: [],
    searchText: ""
  };

  waitTimer = null;

  getData = text => {
    axios.get(`http://localhost:5050/api/v1/news?query=${text}`).then(res => {
      this.setState({ news: res.data });
    });
  };

  changeHandler = event => {
    const tempText = event.target.value;
    this.setState({
      searchText: tempText
    });
    this.checkSearch(tempText);
  };

  checkSearch = text => {
    if (this.waitTimer) clearTimeout(this.waitTimer); // Clearing previosuly present Timer
    if (text.length >= 3) {
      this.waitTimer = setTimeout(this.getData, 2000, text); // Setting New timer for 2 secs.
    } else {
      this.setState({ news: [] });
    }
  };

  render() {
    return (
      <div className="container">
        <SearchTron
          changed={this.changeHandler}
          value={this.state.searchText}
        />
        <News data={this.state.news} />
      </div>
    );
  }
}
