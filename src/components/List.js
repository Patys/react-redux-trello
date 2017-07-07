import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

class List extends React.Component {
  state = {
    draggedItemIndex: null
  }

  onTaskDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onTaskDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
    console.log('on start', e.target.id);
    this.setState({draggedItemIndex: e.target.id});
  }

  onTaskDrop = (e) => {
    console.log('maybe start', this.state.draggedItemIndex);

    const droppedList = e.currentTarget.children[0].id;
    if(this.state.draggedItemIndex && droppedList) {
      this.props.moveTask({
        id: this.state.draggedItemIndex,
        dest: droppedList
      });
    }
    e.stopPropagation();
    // this.setState({draggedItemIndex: null});
  }

  renderTasks = (list) => {
    let {tasks} = this.props;
    tasks = tasks.filter(task => task.listId===list);
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
