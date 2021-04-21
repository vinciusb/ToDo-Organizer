import './ExplorerBar.css';
import React from 'react';
import NewButton from '../NewButton/NewButton';
import ToDo from '../ToDo/ToDo';

class ExplorerBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleDeleteTodo = this.handleDeleteTodo.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.renderTodos = this.renderTodos.bind(this);
  }

  handleDeleteTodo(index) {
    this.props.onDelete(index);
  }

  handleNameChange(text) {
    this.props.onTextChange(text);
  }

  renderTodos() {
    const style = {
      border: "black 2px dashed"
    };

    let result = [];
    this.props.todos.forEach((item, index) => {
      result.push(
        <ToDo
          key={ index }
          index={ index }
          name={ item.name }
          style={ index === this.props.currentTodo ? style : {} }
          onClick={ this.props.onClick }
          onDelete={ this.handleDeleteTodo }
          onTextChange={ this.handleNameChange }
        />);
    });
    return result;
  }

  render() {
    return (
      <div className="ExplorerBar" onClick={ this.props.onHiden }>
        { this.renderTodos() }
        <NewButton onClick={ this.props.onAdd } />
      </div>
    );
  }
}

export default ExplorerBar;