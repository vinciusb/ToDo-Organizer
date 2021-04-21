import './ExplorerButton.css';
import React from 'react';

class ExplorerButton extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      aniClass: this.props.start
    }

    this.handleClick = this.handleClick.bind(this); 
  }

  handleClick() {
    this.props.onClick();

    let newClass;
    if(this.state.aniClass === "" || this.state.aniClass === "ani-open") {
      newClass = "ani-close";
    }
    else newClass = "ani-open";
    this.setState({ aniClass: newClass });
  }

  render() {
    return (
      <div className={ "ExplorerButton " + this.state.aniClass } onClick={ this.handleClick }
        onAnimationEndCapture={ this.handleEndAnimation }>
        <div className="mini-bar"></div>
        <div className="mini-bar"></div>
        <div className="mini-bar"></div>
      </div>
    );
  }
}

export default ExplorerButton;