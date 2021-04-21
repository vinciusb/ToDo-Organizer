import './Task.css';
import React from 'react';
import drag from './drag.png';
import trashCan from './trash-can.png';
import SpecialTextArea from '../SpecialTextArea/SpecialTextArea';

class Task extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            display: true,
            mouseOver: false
        }

        this.handleExcludeClick = this.handleExcludeClick.bind(this);
        this.handleDragStart = this.handleDragStart.bind(this);
        this.handleDragEnd = this.handleDragEnd.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleMouseEnter = this.handleMouseEnter.bind(this);
        this.handleMouseLeave = this.handleMouseLeave.bind(this);
        this.handleExpandClick = this.handleExpandClick.bind(this);
    }

    handleExcludeClick() {
        this.props.onRemove(this.props.taskId);
    }

    handleDragStart(e) {
        const target = e.target.closest(".Task");
        
        // Transfer the data within the event
        e.dataTransfer.setData('taskId', target.id);
        
        setTimeout(() => {
            this.setState({ display: false });
        }, 0);
        
    }

    handleDragEnd() {
        this.setState({ display: true });
    }

    handleDragOver(e) {
        e.stopPropagation();
    }

    handleMouseEnter() {
        this.setState({mouseOver: true})
    }

    handleMouseLeave() {
        this.setState({mouseOver: false})
    }

    handleExpandClick() {
        this.props.onExpansion(this.props.id);
    }

    render() {
        const taskStyle = {};
        const colorBarStyle = { backgroundColor: this.props.taskColor };
        //
        if(this.state.display) taskStyle.display = 'block';
        else taskStyle.display = 'none';
        //
        if(this.state.mouseOver) colorBarStyle.height = '40px';

        return (
            <div className="Task" id={ this.props.id } style={ taskStyle } onMouseEnter={ this.handleMouseEnter } onMouseLeave={ this.handleMouseLeave }>
                <div className="task-color" style={ colorBarStyle } onClick={ this.handleExpandClick }>
                    { this.state.mouseOver && <TransitionDiv text="EXPAND TASK"/> }
                </div>
                <div className="container">
                    <div className="task-resume-data">
                        <SpecialTextArea id="task-coment" placeholder="Name..." text={ this.props.taskName } readonly={ true }/>
                        <p className="date">Start: { this.props.taskDate }</p>
                    </div>
                    <div className="task-util">
                        <img className="remove button" src={ trashCan } alt="remove button" onClick={ this.handleExcludeClick }/>
                        <img className="drag button" src={ drag } alt="drag button"
                            onDragStart={ this.handleDragStart } onDragOver={ this.handleDragOver } onDragEnd={ this.handleDragEnd }/>
                    </div>
                </div>
            </div>
        );
    }
}

class TransitionDiv extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            style: {
                fontSize: "1px"
            }
        }

        this.setStyle = this.setStyle.bind(this);
    }

    setStyle() {
        this.setState({
            style: {
                fontSize: "1rem",
                transition: "font-size ease-out 0.12s",
                fontWeight: "bolder"
            }
        });
    }

    componentDidMount() {
        setTimeout(this.setStyle, 10);
    }

    render() {
        return (
            <div className="TransitionDiv" style={ this.state.style }>
                { this.props.text }
            </div>
        );
    }
}

export default Task;