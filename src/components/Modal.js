import React, { Component } from "react";
import PropTypes from 'prop-types';
import "../styles/Modal.scss";

class ModalInfo extends Component {
  
  render() {
    return (
      <div className={`showModal showModal--active`}>
        <div className="modalContent pt-3 border-top border-bottom border-light">
          <h3 className="pb-4 mx-2 border-bottom border-light">
            {this.props.data.name}
          </h3>
          <ul className="list-unstyled position-relative py-2">
            <li className="rotatedText">Pairing food</li>
            {this.props.data.food_pairing.map(item => {
              return (
                <li className="pl-5 py-1" key={item}>
                  - {item}
                </li>
              );
            })}
          </ul>
          <button
            className="btn-light px-2 py-0 blockTransform closeBtn btn-outline-light"
            onClick={this.props.closeModal}
          >
            <small className="textTransform">Close</small>
          </button>
        </div>
      </div>
    );
  }
}

ModalInfo.propTypes = {
  closeModal: PropTypes.func.isRequired,
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    food_pairing: PropTypes.array.isRequired
  }),
}

export default ModalInfo;
