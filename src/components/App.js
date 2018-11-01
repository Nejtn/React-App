import React, { Component } from "react";
import axios from "axios";
import Tabs from "./Tabs";
import BeerList from "./BeerList";
import Filters from "./Filters";

class App extends Component {
  state = {
    results: [],
    filteredResults: [],
    currentPageNumber: 0,
    activeTab: false,
  };

  componentDidMount() {
    this.getBeers(1);
  }

  handleTabClick = () => {
    this.setState({
      activeTab: true
    });
  };

  getFilterBeerName = (beerName) => {
    const filtered = this.state.results.filter(result => {
      return result.name.includes(beerName);
    })
    this.setState({
      filteredResults: filtered
    })
  }

  handleClick = () => {
    this.setState(prevState => ({
      currentPageNumber: +prevState.currentPageNumber + 1,
      activeTab: false
    }), () => {
      this.getBeers(this.state.currentPageNumber);
    });
  };

  getBeers = pageNumber => {
    axios
      .get(`https://api.punkapi.com/v2/beers?page=${pageNumber}&per_page=21`)
      .then(response => {
        const results = this.state.activeTab === true ? response.data : [...this.state.results, ...response.data];
        this.setState({
          results,
          filteredResults: results,
          currentPageNumber: pageNumber
        });
      })
      .catch(error => {
        console.log(error.response.data.message);
      });
  };

  getRandomBeers = () => {
      const fetchUrl = `https://api.punkapi.com/v2/beers/random`;
      axios
        .get(fetchUrl)
        .then(response => {
           this.setState({
            results: response.data,
            filteredResults: response.data,
            currentPageNumber: 0
          });
        })
        .catch(error => {
          console.log(error.response.data.message);
        });
  }

  render() {
    return (
      <div className="container">
        <Tabs 
          getBeers={this.getBeers}
          handleTabClick={this.handleTabClick}
        />
        <Filters
          getFilterBeerName={this.getFilterBeerName}
          getRandomBeers={this.getRandomBeers}
        />
        <BeerList
          results={this.state.filteredResults}
        />
        <div className="d-flex justify-content-center mb-5">
          <button
            className="border border-success loadMore"
            onClick={this.handleClick}
            >
            <span className="textTransform">Load more</span>
          </button>
        </div>
      </div>
    );
  }
}

export default App;
