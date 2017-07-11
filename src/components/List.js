import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

class List extends React.Component {
  onTaskDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onTaskDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("target", e.target.id);
    e.currentTarget.style = `transform: rotate(3deg);
    -moz-transform: rotate(3deg);
    -webkit-transform: rotate(3deg);`;
  }

  onTaskDrop = (e) => {
    const droppedList = e.currentTarget.children[0].id;

    e.currentTarget.style = `transform: rotate(0deg);
    -moz-transform: rotate(0deg);
    -webkit-transform: rotate(0deg);`;

    if(e.dataTransfer.getData("target") && droppedList) {
      this.props.moveTask({
        id: e.dataTransfer.getData("target"),
        dest: droppedList
      });
    }
    e.stopPropagation();
  }

  renderTasks = (list) => {
    let {tasks} = this.props;
    tasks = tasks.filter(task => parseInt(task.listId)===parseInt(list));
    if(tasks.length > 0) {
    return (<div>
      {tasks.map(task => <Task draggable="true"
        onDragStart={this.onTaskDragStart}
        onDrop={this.onTaskDrop}
        onDragOver={this.onTaskDragOver}
        moveTask={this.props.moveTask}
        key={task.id}
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
