import React from 'react'
import PropTypes from 'prop-types'
import Task from './Task'

class List extends React.Component {

  renderTasks = (list) => {
    let {tasks} = this.props;
    tasks = tasks.filter(task => task.listId===list);
    return (<div>
      {tasks.map(task => <Task key={task.id} task={task}/>)}
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
        id={list.id} className="list">
        <div className="list-header">{list.name}</div>
        {this.renderTasks(list.id)}
      </div>);
  }
}

List.propTypes = {
  list: PropTypes.object.isRequired,
  tasks: PropTypes.array.isRequired,
  onDragStart: PropTypes.func.isRequired,
  onDragOver: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired
}

export default List
