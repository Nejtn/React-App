import React, { Component } from "react";
import PropTypes from "prop-types";

import BeerItem from "./BeerItem";

import "../styles/BeerList.scss";

class BeerList extends Component {
  render() {
    return (
      <div className="beerContainer">
        <ul className="d-flex justify-content-between list-unstyled row mt-2">
          {this.props.results.map(item => (
            <BeerItem key={item.name} {...item} />
          ))}
        </ul>
      </div>
    );
  }
}

BeerList.defaultProps = {
  name: ""
};

BeerList.propTypes = {
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string
    })
  )
};

export default BeerList;
