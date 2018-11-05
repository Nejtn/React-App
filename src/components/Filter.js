import React, { Component } from "react";
import PropTypes from 'prop-types';

import "../styles/Filter.scss";

class Filter extends Component {
    state = {
        filterValue: "",
        randomFilterButton: []
    }

    handleChange = (e) => {
        this.setState({
            filterValue: e.target.value
        }, () => {
            this.props.filteredByName(this.state.filterValue)
        })
    }

    render() {
        return (
            <div className="d-flex justify-content-center py-4">
                <input
                    className="blockTransform mr-3"
                    value={this.state.filterValue}
                    onChange={this.handleChange}
                    type="text" 
                    placeholder="Search"
                />
                <button 
                    className="btn-light border border-success px-4 py-2 blockTransform" 
                    type="submit"
                    onClick={this.props.getRandomBeers}
                >
                    <div className="textTransform">Random</div>
                </button>
            </div>
        );
    }
}

Filter.defaultProps = {
    name: ''
};
  
Filter.propTypes = {
    filteredByName: PropTypes.func.isRequired,
    name: PropTypes.string
};
 
export default Filter;
