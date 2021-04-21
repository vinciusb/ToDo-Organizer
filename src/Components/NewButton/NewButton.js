import './NewButton.css';
import React from 'react';

class NewButton extends React.Component {
    render() {
        return (
            <div className="newButton" onClick={ this.props.onClick }>
                <span>+</span> New
            </div>
        );
    }
}

export default NewButton;