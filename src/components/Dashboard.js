import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

export class Dashboard extends React.Component {
  state = {
      draggedItemIndex: null,
      draggedItemType: null
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }

  onDragStart = (list) => (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
    this.setState({draggedItemIndex: list.index, draggedItemType: list.type});
  }

  onDrop = (list) => (e) => {
    if(this.state.draggedItemType === list.type) {
      this.props.moveList({
        start: this.state.draggedItemIndex,
        end: list.index
      });
    }
  }

  renderLists = () => {
    let {lists, tasks, dragId} = this.props;
    return (<div>
      {lists.map(list => <List
        onDragStart={this.onDragStart({index: list.index, type: "list"})}
        onDrop={this.onDrop({index: list.index, type: "list"})}
        onDragOver={this.onDragOver}
        moveTask={this.props.moveTask}
        dragId={dragId}
        dragTask={this.props.dragTask}
        id={list.index}
        key={list.id}
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
  dragId: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  dragTask: PropTypes.func.isRequired
}

export default Dashboard
