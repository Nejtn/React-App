import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../styles/Filters.scss";

class Filters extends Component {
    state = {
        beerName: "",
        random: []
    }

    handleChange = (e) => {
        this.setState({
            beerName: e.target.value
        }, () => {
            this.props.getFilterBeerName(this.state.beerName)
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-center py-4">
                <input
                    className="blockTransform mr-3"
                    value={this.state.beerName}
                    onChange={this.handleChange}
                    type="text" 
                    placeholder="Search"
                />
                <button className="btn-light border border-success px-4 py-2 blockTransform" type="submit">
                    <div className="textTransform">Random</div>
                </button>
            </div>
        );
    }
}

Filters.defaultProps = {
    name: ''
};
  
Filters.propTypes = {
    getFilterBeerName: PropTypes.func.isRequired,
    name: PropTypes.string
}
 
export default Filters;
