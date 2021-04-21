import './TaskContainer.css';
import React from 'react';
import ExplorerButton from '../ExplorerButton/ExplorerButton';
import Task from '../Task/Task';
import NewButton from '../NewButton/NewButton';

class TaskContainer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            hidden: false
        }

        this.handleNewTaskClick = this.handleNewTaskClick.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleDrop = this.handleDrop.bind(this);
        this.handleDragOver = this.handleDragOver.bind(this);
        this.handleExpansion = this.handleExpansion.bind(this);
        this.hidenContainer = this.hidenContainer.bind(this);
        this.renderTasks = this.renderTasks.bind(this);
    }

    newTaskFactory(_name, _date) {
        return {
            name: _name,
            date: _date,
            comment: "",
            subTasks: []
        };
    }

    handleNewTaskClick() {
        this.props.onAdd(this.props.contId, this.newTaskFactory(
            "Name...",
            new Date().toLocaleString())
        );
    }

    handleRemove(taskId) {
        this.props.onRemove(this.props.contId, taskId);
    }

    handleDrop(e) {
        e.preventDefault();

        const taskId = e.dataTransfer.getData('taskId');
        const ids = taskId.split("-", 2);
        // Get the new container id
        const newContId = e.target.closest(".TaskContainer").id.split("-", 2)[1];
        // Get the task
        let tasks = this.props.tasks;
        let task = tasks[ids[0]][ids[1]];

        // If the drop happend in another container
        if(ids[0] !== newContId) {
            // Add the new one
            tasks[newContId] = [
                ...tasks[newContId],
                task
            ];
            // Remove the old one
            tasks[ids[0]].splice(ids[1], 1);
        }

        // Set the tasks
        this.props.onSetTasks(tasks);
    }

    handleDragOver(e) {
        e.preventDefault();
    }

    handleExpansion(id) {
        this.props.onExpansion(id);
    }

    hidenContainer() {
        this.setState({ hidden: !this.state.hidden });
    }

    renderTasks() {
        if(!this.props.tasks[this.props.contId]) return null;
        let result = [];

        // Define the array of tasks
        this.props.tasks[this.props.contId].forEach((item, index) => {
            result.push(
                <Task
                    key={ index }
                    id={ String(this.props.contId) + "-" + String(index) }
                    taskId={ index }
                    taskName={ item.name }
                    taskDate={ item.date }
                    taskColor={ this.props.color }
                    onRemove={ this.handleRemove }
                    onExpansion={ this.handleExpansion }
                />);
        });
        return result;
    }

    render() {
        return (
            <div id={ this.props.id } className="TaskContainer" onDrop={ this.handleDrop } onDragOver={ this.handleDragOver }>
                <header>
                    <h2>{ this.props.title }</h2>
                    <ExplorerButton onClick={ this.hidenContainer } start="" />
                </header>
                <main style={this.state.hidden ? { display: 'none' } : {} }>
                    { this.renderTasks() }
                    {
                        (this.props.contId === 0) &&
                        <NewButton onClick={ this.handleNewTaskClick }/>
                    }
                </main>
            </div>
        );
    }
}

export default TaskContainer;