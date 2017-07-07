import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

export class Dashboard extends React.Component {
  renderLists = () => {
    let {lists, tasks} = this.props;

    return (<div>
      {lists.map(list => <List key={list.id} list={list} tasks={tasks}/>)}</div>)
  }

  render() {
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
  tasks: PropTypes.array.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired
}

export default Dashboard
