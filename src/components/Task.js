import React from 'react'
import PropTypes from 'prop-types'

class Task extends React.Component {

  render() {
    const {task} = this.props;
    return <div id={task.id} className="task">{task.label}</div>;
  }
}

Task.propTypes = {
  task: PropTypes.object.isRequired
}

export default Task
