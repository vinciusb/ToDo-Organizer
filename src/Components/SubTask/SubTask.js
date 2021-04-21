import './SubTask.css';
import React from 'react';
import SpecialTextArea from '../SpecialTextArea/SpecialTextArea';

class SubTask extends React.Component {
    constructor(props) {
        super(props);

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleExclusion = this.handleExclusion.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
    }

    handleTextChange(e) {
        this.props.onTextChange(e);
    }

    handleExclusion(index) {
        this.props.onExclusion(index);
    }

    handleStateChange(e) {
        this.props.onComplete(e, this.props.index);
    }

    render() {
        return (
            <div className="SubTask">
                <input type="checkbox" onChange={ this.handleStateChange } checked={ this.props.status }/>
                <SpecialTextArea id={ "subtask-todo-" + this.props.index } placeholder={ "To Do" } index={ this.props.index }
                    onTextChange={ this.handleTextChange } text={ this.props.subTask.text } onExclusion={ this.handleExclusion }/>
            </div>
        );
    }
}

export default SubTask;