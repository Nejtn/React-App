import React, { Component } from "react";
import "./Tabs.scss";

const tabs = [
  {
    id: "id1",
    name: "Tab 1",
    content: "Content 1"
  },
  {
    id: "id2",
    name: "Tab 2",
    content: "Content 2"
  },
  {
    id: "id3",
    name: "Tab 3",
    content: "Content 3"
  }
];

class Tabs extends Component {
  state = { active: tabs[0].id };

  handleClick = (id) => {
    this.setState({ active: id });
  };

  render() {
    return (
      <div>
        <header className="tabs-header">
          {tabs.map(item => (
            <div>
              <button
                className={`tabs ${(item.id === this.state.active) && 'active'}`}
                onClick={() => this.handleClick(item.id)}>
                {item.name}
              </button>
              { (item.id === this.state.active) && <div>{item.content}</div>}
            </div>
          ))}
        </header>
      </div>
    );
  }
}

export default Tabs;
