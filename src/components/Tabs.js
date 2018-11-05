import React, { Component } from "react";
import PropTypes from "prop-types";

import "../styles/Tabs.scss";

const tabs = [
  {
    id: "id1",
    name: "Tab 1",
    pageNumber: "1"
  },
  {
    id: "id2",
    name: "Tab 2",
    pageNumber: "2"
  },
  {
    id: "id3",
    name: "Tab 3",
    pageNumber: "3"
  }
];

class Tabs extends Component {
  state = { active: tabs[0].id };

  handleClick = (id, pageNumber) => {
    this.setState({ active: id });
    this.props.getBeers(pageNumber);
    this.props.handleTabClick();
  };

  render() {
    return (
      <header className="tabsHeader">
        {tabs.map(item => (
          <div className="w-100 blockTransform" key={item.id}>
            <button
              className={`tabs ${item.id === this.state.active && "active"}`}
              onClick={() => this.handleClick(item.id, item.pageNumber)}
            >
              <span className="textTransform">{item.name}</span>
            </button>
          </div>
        ))}
      </header>
    );
  }
}

Tabs.propTypes = {
  getBeers: PropTypes.func.isRequired,
  handleTabClick: PropTypes.func.isRequired
};

export default Tabs;
