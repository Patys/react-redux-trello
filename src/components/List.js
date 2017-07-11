import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

class List extends React.Component {
  onTaskDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onTaskDragStart = (id) => (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
    this.props.dragTask({id});
  }

  onTaskDrop = (id) => (e) => {
    this.props.moveTask({
      'id': this.props.dragId,
      'dest': id
    });
    e.stopPropagation();
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
        key={task.id}
        id={task.id}
        task={task}/>)}
      </div>)
    } else {
      // dumb task to keep place in list
      let task = {id: -1, label: '', listId: list};
      return(<div className="first-task">
        <Task draggable="false"
          onDragStart={this.onTaskDragStart(task.id)}
          onDrop={this.onTaskDrop(task.listId)}
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
  dragId: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  dragTask: PropTypes.func.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default List
