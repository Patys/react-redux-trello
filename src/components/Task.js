import React from 'react'
import PropTypes from 'prop-types'

class Task extends React.Component {

  render() {
    const {task} = this.props;

    let {onDragStart, onDragOver, onDrop} = this.props;
    return <div draggable={this.props.draggable}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      id={task.id} className="task"><span hidden id={task.listId}></span>{task.label}</div>;
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default Task
