import './ToDo.css';
import React from 'react';
import ExplorerButton from '../ExplorerButton/ExplorerButton';
import SpecialTextArea from '../SpecialTextArea/SpecialTextArea';

class ToDo extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            options: false,
            renaming: false
        };

        this.handleSelectClick = this.handleSelectClick.bind(this);
        this.handleOptionsClick = this.handleOptionsClick.bind(this);
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNameChange = this.handleNameChange.bind(this);
    }

    handleSelectClick(e) {
        this.props.onClick(this.props.index);
    }

    handleOptionsClick() {
        this.setState({ options: !this.state.options });
    }

    handleDeleteClick() {
        this.props.onDelete(this.props.index);
    }

    handleNameChange(e) {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <div className="ToDo">
                <div className="container" onClick={ this.handleSelectClick } style={ this.props.style }>
                    <SpecialTextArea id="todo-name" placeholder={ "New name" } text={ this.props.name } maxL={30} onTextChange={ this.handleNameChange } onExclusion={ null } />
                    <ExplorerButton onClick={ this.handleOptionsClick } start="ani-close" />
                </div>
                { this.state.options &&
                    <div className="options-tab">
                        <h4 onClick={ this.handleDeleteClick }>Exclude</h4>
                    </div>
                }
            </div>
        );
    }
}

export default ToDo;