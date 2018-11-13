import React, { Component } from 'react';
import axios from 'axios';

import Tabs from './Tabs';
import BeerList from './BeerList';
import Filter from './Filter';

import { BEER_DATA_URL } from '../constants/index';

class App extends Component {
  state = {
    results: [],
    filteredResults: [],
    currentPageNumber: 0
  };

  componentDidMount() {
    this.getBeers(1, true);
  }

  //Case insensitive search
  filteredByName = filterValue => {
    const filtered = this.state.results.filter(result => {
      return result.name.toLowerCase().includes(filterValue.toLowerCase());
    });

    this.setState({
      filteredResults: filtered
    });
  };

  //Load more button
  loadMoreButton = () => {
    this.setState(
      prevState => ({
        currentPageNumber: +prevState.currentPageNumber + 1,
      }),
      () => {
        this.getBeers(this.state.currentPageNumber, true);
      }
    );
  };

  //Main API request
  getBeers = (pageNumber, loadMoreItems) => {
    const { results } = this.state;

    axios
      .get(`${BEER_DATA_URL}?page=${pageNumber}&per_page=21`)
      .then(response => {
        const { data } = response;
        const responseData = loadMoreItems ? [...results, ...data] : data;

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

  //API request for random result
  getRandomBeers = () => {
    const fetchUrl = `${BEER_DATA_URL}/random`;
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
        <Tabs getBeers={this.getBeers} />
        <Filter
          filteredByName={this.filteredByName}
          getRandomBeers={this.getRandomBeers}
        />
        <BeerList results={this.state.filteredResults} />
        <div className="d-flex justify-content-center mb-5">
          <button
            className="border border-success loadMore"
            onClick={this.loadMoreButton}
          >
            <span className="textTransform">Load more</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
