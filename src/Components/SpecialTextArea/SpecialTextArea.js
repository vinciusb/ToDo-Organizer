import './SpecialTextArea.css';
import React from 'react';

class SpecialTextArea extends React.Component {
    constructor(props) {
        super(props);
        this.thisRef = React.createRef();
        
        this.state = {
            numNulls: 0
        }

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    }

    handleTextChange(e) {
        this.props.onTextChange(e);
    }

    handleKeyUp(e) {
        if(e.target.value === "") {
            if(e.keyCode === 8) {
                if(this.state.numNulls === 0) {
                    this.setState({ numNulls: this.state.numNulls + 1 });
                }
                else {
                    if(this.props.onExclusion) this.props.onExclusion(this.props.index);
                }
            }
            else {
                this.setState({ numNulls: 0 });
            }
        }
    }

    componentDidMount() {
        var el = this.thisRef.current;
        setTimeout(function() {
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }

    componentDidUpdate() {
        var el = this.thisRef.current;
        setTimeout(function() {
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }

    render() {
        return (
            <textarea ref={ this.thisRef } className="SpecialTextArea" name="subtask-todo" id={ this.props.id } maxLength={ this.props.maxL } rows="1" placeholder={ this.props.placeholder }
                value={ this.props.text } readOnly={ this.props.readonly } onChange={ this.handleTextChange } onKeyUpCapture={ this.handleKeyUp }></textarea>
        );
    }
}

export default SpecialTextArea;