import React from 'react'
import PropTypes from 'prop-types'

export class Dashboard extends React.Component {

  renderTasks = (list) => {
    let {tasks} = this.props;
    tasks = tasks.filter(task => task.listId===list);
    return (<div>
      {tasks.map(task => <div id={task.id} className="task">{task.label}</div>)}
      </div>)
  }

  renderLists = () => {
    let {lists} = this.props;

    return (<div>
      {lists.map(list => (<div id={list.id} className="list">
            <div className="list-header">{list.name}</div>
            {this.renderTasks(list.id)}
          </div>))}</div>)
  }

  render() {
    console.log(this.props);
    return (<div>
      <div className="board">
        <div className="header">Listy</div>
        <div className="lists">
        {this.renderLists()}
        </div>
      </div>
    </div>);
  }
}

Dashboard.propTypes = {
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired
}

export default Dashboard
