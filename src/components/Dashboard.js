import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

export class Dashboard extends React.Component {
  state = {
      draggedItemIndex: null,
      draggedItemClass: null,
      droppedItem: null
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // this.setState({droppedItem: e.currentTarget.id});
  }

  onDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
    this.setState({draggedItemIndex: e.target.id, draggedItemClass: e.target.className});
  }

  onDrop = (e) => {
    const droppedItemIndex = e.currentTarget.id;
    if(droppedItemIndex  && this.state.draggedItemIndex && e.currentTarget.className === this.state.draggedItemClass) {
      this.props.moveList({
        start: this.state.draggedItemIndex,
        end: droppedItemIndex
      });
    }
    this.setState({draggedItemIndex: null, draggedItemClass: null});
  }

  renderLists = () => {
    let {lists, tasks} = this.props;
    return (<div>
      {lists.map(list => <List
        onDragStart={this.onDragStart}
        onDrop={this.onDrop}
        onDragOver={this.onDragOver}
        moveTask={this.props.moveTask}
        id={list.index}
        key={list.index}
        list={list}
        tasks={tasks}/>)}
      </div>)
  }

  render() {
    return (
      <div className="board">
        <div className="header">Listy</div>
        <div className="lists">
        {this.renderLists()}
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
