import './ExpandedTask.css';
import React from 'react';
import NewButton from '../NewButton/NewButton';
import SubTask from '../SubTask/SubTask';
import SpecialTextArea from '../SpecialTextArea/SpecialTextArea';

class ExpandedTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            task: this.props.data
        };

        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleNewSubTaskClick = this.handleNewSubTaskClick.bind(this);
        this.excludeSubTask = this.excludeSubTask.bind(this);
        this.completeSubTask = this.completeSubTask.bind(this);
        this.renderSubTasks = this.renderSubTasks.bind(this);
    }

    handleTextChange(e) {
        let task = this.state.task;
        // If is the task name input
        if(e.target.id === "task-name") {
            task.name = e.target.value;
        }
        // If is the comment textarea
        else if(e.target.id === "task-coment") {
            task.comment = e.target.value;
        }
        // If is the ToDo textarea
        else if(e.target.id.includes("subtask-todo")) {
            var index = e.target.id.split("subtask-todo-", 2)[1];
            task.subTasks[index].text = e.target.value;
        }
        this.setState({ task });
    }

    resize(e) {
        var el = e.target;
        setTimeout(function() {
            el.style.cssText = 'height:auto; padding:0';
            el.style.cssText = 'height:' + el.scrollHeight + 'px';
        }, 0);
    }

    newSubTaskFactory() {
        return {
            completed: false,
            text: ""
        };
    }

    handleNewSubTaskClick(e) {
        let task = this.state.task;
        task.subTasks.push(this.newSubTaskFactory());
        this.setState({ task });
    }

    excludeSubTask(index) {
        let result = this.state.task;
        result.subTasks.splice(index, 1);
        this.setState({ task: result });
    }

    completeSubTask(e, index) {
        let result = this.state.task;
        result.subTasks[index].completed = e.target.checked;
        // Send a completed task to the end
        if(result.subTasks[index].completed) {
            result.subTasks = [
                ...result.subTasks,
                result.subTasks[index]
            ];
            result.subTasks.splice(index, 1);
        }
        else {
            result.subTasks = [
                result.subTasks[index],
                ...result.subTasks
            ];
            result.subTasks.splice(index + 1, 1);
        }
        this.setState({ task: result });
    }

    renderSubTasks() {
        let subTasks = [];
        this.state.task.subTasks.forEach((item, index) => {
            subTasks.push(
                <SubTask
                    key={ index }
                    index={ index }
                    subTask={ item }
                    status={ item.completed }
                    onTextChange={ this.handleTextChange }
                    onExclusion={ this.excludeSubTask }
                    onComplete={ this.completeSubTask }
                />
            );
        });
        return subTasks;
    }

    render() {
        const style = {
            textDecoration: "underline 5px " + this.props.color
        }
        
        return (
            <div className="ExpandedTask">
                <header>
                    <input type="text" id="task-name" style={ style } value={ this.state.task.name } onChange={ this.handleTextChange } />
                    <h4>Start date: { this.props.data.date }</h4>
                </header>
                <main>
                    <div className="comments">
                        <h1 className="underline" style={ style }>Coments:</h1>
                        <SpecialTextArea id="task-coment" placeholder={ "Add a comment..." } text={ this.state.task.comment } onTextChange={ this.handleTextChange } onExclusion={ null }/>
                    </div>
                    <div className="sub-tasks">
                        <h1 className="underline" style={ style }>Sub-tasks:</h1>
                        { this.renderSubTasks() }
                        <NewButton onClick={ this.handleNewSubTaskClick }/>
                    </div>
                    
                </main>
            </div>
        );
    }
}

class DarkFilter extends React.Component {
    constructor(props) {
        super(props);
        this.thisRef = React.createRef();

        this.handleCloseClick = this.handleCloseClick.bind(this);
    }

    handleCloseClick(e) {
        const domNode = this.thisRef.current;
        if(domNode === e.target || !domNode.contains(e.target)) {
            this.props.onClose();
        }
    }

    render() {
        return (
            <div ref={ this.thisRef } className="dark-filter" onClick={ this.handleCloseClick }>
                {this.props.children}
            </div>
        );
    }
}

export {ExpandedTask, DarkFilter};