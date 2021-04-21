import './App.css';
import React from 'react';
import ExplorerButton from '../ExplorerButton/ExplorerButton';
import TaskContainer from '../TaskContainer/TaskContainer';
import {ExpandedTask, DarkFilter} from '../ExpandedTask/ExpandedTask';
import ExplorerBar from '../ExplorerBar/ExplorerBar';

const numConts = 4;
const titles = ["No status", "Not started", "In progress", "Completed"];
const colors = ["rgb(109, 109, 109)", "rgb(247, 184, 184)", "rgb(255, 254, 168)", "rgb(178, 255, 168)"];

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      todos: [],
      currentTodo: -1,
      expanded: [-1, -1],
      hiddenExplorer: false
    };
    
    this.setTasks = this.setTasks.bind(this);
    this.addTask = this.addTask.bind(this);
    this.removeTask = this.removeTask.bind(this);
    this.expandTask = this.expandTask.bind(this);
    this.closeExpanded = this.closeExpanded.bind(this);
    this.hidenExplorer = this.hidenExplorer.bind(this);
    this.addTodo = this.addTodo.bind(this);
    this.setTargetTodo = this.setTargetTodo.bind(this);
    this.deleteTodo = this.deleteTodo.bind(this);
    this.renameTodo = this.renameTodo.bind(this);

    this.renderContainers = this.renderContainers.bind(this);
  }

  addTask(contId, newTask) {
    let todos = Array.from(this.state.todos);

    todos[this.state.currentTodo].tasks[contId] = [
      ...todos[this.state.currentTodo].tasks[contId],
      newTask
    ];
    this.setState({ todos });
  }

  removeTask(contId, taskId) {
    let todos = Array.from(this.state.todos);
    todos[this.state.currentTodo].tasks[contId].splice(taskId, 1);
    this.setState({ todos });
  }

  setTasks(tasks) {
    let todos = this.state.todos;
    todos[this.state.currentTodo].tasks = tasks;
    this.setState({ todos });
  }

  expandTask(id) {
    const ids = id.split("-", 2);
    this.setState({ expanded: [ids[0], ids[1]] });
  }

  closeExpanded(e) {
    this.setState({ expanded: [-1, -1] });
  }

  hidenExplorer() {
    this.setState({ hiddenExplorer: !this.state.hiddenExplorer });
  }

  todosFactory() {
    return {
      name: "",
      tasks: [[], [], [], []]
    };
  }

  addTodo() {
    let result = this.state.todos;
    result.push(this.todosFactory());
    this.setState({
      todos: result,
      currentTodo: result.length - 1
    });
  }

  setTargetTodo(index) {
    this.setState({ currentTodo: index });
  }

  deleteTodo(index) {
    let newIndex = index - 1;
    if(this.state.todos.length > 1 && index === 0) {
      newIndex++;
    }

    let result = this.state.todos;
    result.splice(index, 1);
    this.setState({
      todos: result,
      currentTodo: newIndex
    });
  }

  renameTodo(text) {
    let result = this.state.todos;
    result[this.state.currentTodo].name = text;
    this.setState({ todos: result });
  }

  renderContainers() {
    let result = [];

    for(let i = 0; i < numConts; i++) {
      result.push(
        <TaskContainer
          key={ i }
          id={ "cont-" + String(i) }
          contId={ i }
          title={ titles[i] }
          tasks={ this.state.todos[this.state.currentTodo].tasks }
          color={ colors[i] }
          onSetTasks={ this.setTasks }
          onAdd={ this.addTask }
          onRemove={ this.removeTask }
          onExpansion={ this.expandTask }
          onColorRequest={ this.requestColor }
        />
      );
    }

    return result;
  }

  render() {
    return (
      <div className="App">
        <header>
          <ExplorerButton onClick={ this.hidenExplorer } start="ani-open" />
          <h1>ToDo</h1>
        </header>
        <main>
          { !this.state.hiddenExplorer &&
            <ExplorerBar
              todos={ this.state.todos }
              currentTodo={ this.state.currentTodo }
              onAdd={ this.addTodo }
              onClick={ this.setTargetTodo }
              onDelete={ this.deleteTodo }
              onTextChange={ this.renameTodo }
            />
          }
          <div className="main-container">
            { (this.state.currentTodo > - 1) && this.renderContainers() }
            { (this.state.expanded[0] !== -1 && this.state.expanded[1] !== -1) &&
              <DarkFilter onClose={ this.closeExpanded }>
                <ExpandedTask
                  data={ this.state.todos[this.state.currentTodo].tasks[this.state.expanded[0]][this.state.expanded[1]] }
                  color={ colors[this.state.expanded[0]] }
                />
              </DarkFilter> }
          </div>
        </main>
      </div>
    );
  }
}

export default App;