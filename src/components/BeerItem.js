import React, { Component } from "react";
import PropTypes from "prop-types";
import ModalInfo from "./Modal";

class BeerItem extends Component {
  state = {
    show: false
  };

  openModal = () => {
    this.setState({
      show: true
    });
  };

  closeModal = () => {
    this.setState({
      show: false
    });
  };

  render() {
    const { image_url, name, ibu, brewers_tips, tagline } = this.props;
    return (
      <li className="beerItem mb-4 col-12 col-md-6 col-lg-4">
        <div className="row">
          <div className="beerPhoto col-4">
            <img
              className="px-2 beerPhoto"
              src={image_url}
              alt="beer"
            />
          </div>
          <div className="col-8">
            <h4 className="text-success">{name}</h4>
            <div className="d-flex align-items-center">
              <p className="font-weight-bold mb-2">IBU: {ibu}</p>
              <button
                onClick={this.openModal}
                className="btn-light border border-success ml-3 mb-2 px-2 py-0 blockTransform"
              >
                <small className="textTransform">More</small>
              </button>
              {this.state.show &&
                <div className="d-flex justify-content-center">
                  <ModalInfo
                    data={this.props}
                    closeModal={this.closeModal}
                  />
                </div>
              }
            </div>
            <p>
              <small>{brewers_tips}</small>
            </p>
            <cite className="mb-2">{tagline}</cite>
            <div className="d-flex justify-content-center" />
          </div>
        </div>
      </li>
    );
  }
}

BeerItem.propTypes = {
  brewers_tips: PropTypes.string.isRequired,
  ibu: PropTypes.number.isRequired,
  image_url: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
};

export default BeerItem;
