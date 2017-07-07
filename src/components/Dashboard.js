import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

export class Dashboard extends React.Component {
  state = {
      draggedItemIndex: null
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.currentTarget);
    this.setState({draggedItemIndex: e.target.id});
  }

  onDrop = (e) => {
    const droppedItemIndex = e.currentTarget.id;
    this.props.moveList({
      start: this.state.draggedItemIndex,
      end: droppedItemIndex
    });
    this.setState({draggedItemIndex: null});
  }

  renderLists = () => {
    let {lists, tasks} = this.props;

    return (<div>
      {lists.map(list => <List
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        key={list.id}
        list={list}
        tasks={tasks}/>)}
      </div>)
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
