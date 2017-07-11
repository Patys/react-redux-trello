import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

class List extends React.Component {
  state = {
    draggedItem: null
  }

  onTaskDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onTaskDragStart = (id) => (e) => {
    e.dataTransfer.effectAllowed = 'move';

    console.log('onDragStart: ', id);
    this.setState({draggedItem: id});
  }

  onTaskDrop = (id) => (e) => {
    e.stopPropagation();

    console.log('onDrop: ', id, ' state: ', this.state.draggedItem);
    if(this.state.draggedItem) {
      this.props.moveTask({
        'id': this.state.draggedItem,
        'dest': id
      });
    }
  }

  renderTasks = (list) => {
    let {tasks} = this.props;
    tasks = tasks.filter(task => parseInt(task.listId)===parseInt(list));
    if(tasks.length > 0) {
    return (<div>
      {tasks.map((task, i) => <Task draggable="true"
        onDragStart={this.onTaskDragStart(task.id)}
        onDrop={this.onTaskDrop(task.listId)}
        onDragOver={this.onTaskDragOver}
        moveTask={this.props.moveTask}
        key={i}
        id={task.id}
        task={task}/>)}
      </div>)
    } else {
      let task = {id: -1, label: '', listId: list};
      return(<div className="first-task">
        <Task draggable="false"
          onDragStart={this.onTaskDragStart}
          onDrop={this.onTaskDrop}
          onDragOver={this.onTaskDragOver}
          moveTask={this.props.moveTask}
          key="-1"
          id="-1"
          task={task}/>
        </div>);
    }
  }

  render() {
    const {list} = this.props;
    let {onDragStart, onDragOver, onDrop} = this.props;

    return (
      <div draggable="true"
        onDragStart={onDragStart}
        onDragOver={onDragOver}
        onDrop={onDrop}
        id={list.index} className="list">
        <div className="list-header">{list.name}</div>
        {this.renderTasks(list.id)}
      </div>);
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  moveTask: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default List
