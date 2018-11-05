import React, { Component } from "react";
import axios from "axios";

import Tabs from "./Tabs";
import BeerList from "./BeerList";
import Filter from "./Filter";

import { URL } from "../constants/index";

class App extends Component {
  state = {
    results: [],
    filteredResults: [],
    currentPageNumber: 0,
    activeTab: false
  };

  componentDidMount() {
    this.getBeers(1);
  }

  handleTabClick = () => {
    this.setState({
      activeTab: true
    });
  };

  filteredByName = filterValue => {
    const filtered = this.state.results.filter(result => {
      return result.name.includes(filterValue);
    });

    this.setState({
      filteredResults: filtered
    });
  };

  handleLoadMoreButton = () => {
    this.setState(
      prevState => ({
        currentPageNumber: +prevState.currentPageNumber + 1,
        activeTab: false
      }),
      () => {
        this.getBeers(this.state.currentPageNumber);
      }
    );
  };

  getBeers = pageNumber => {
    const { activeTab, results } = this.state;
    axios
      .get(`${URL}?page=${pageNumber}&per_page=21`)
      .then(response => {
        const { data } = response;
        const responseData = activeTab === true ? data : [...results, ...data];

        this.setState({
          results: responseData,
          filteredResults: responseData,
          currentPageNumber: pageNumber
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  getRandomBeers = () => {
    const fetchUrl = `${URL}/random`;
    axios
      .get(fetchUrl)
      .then(response => {
        const { data } = response;

        this.setState({
          results: data,
          filteredResults: data,
          currentPageNumber: 0
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  render() {
    return (
      <div className="container">
        <Tabs getBeers={this.getBeers} handleTabClick={this.handleTabClick} />
        <Filter
          filteredByName={this.filteredByName}
          getRandomBeers={this.getRandomBeers}
        />
        <BeerList results={this.state.filteredResults} />
        <div className="d-flex justify-content-center mb-5">
          <button
            className="border border-success loadMore"
            onClick={this.handleLoadMoreButton}
          >
            <span className="textTransform">Load more</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
