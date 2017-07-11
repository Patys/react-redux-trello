import React from 'react'
import PropTypes from 'prop-types'
import List from './List'

export class Dashboard extends React.Component {
  state = {
      draggedItemIndex: null,
      draggedItemClass: null
  }

  onDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    // this.setState({droppedItem: e.currentTarget.id});
  }

  onDragStart = (list) => (e) => {
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData("text/html", e.target);
    this.setState({draggedItemIndex: list.index, draggedItemClass: list.className});
  }

  onDrop = (list) => (e) => {
    if(this.state.draggedItemClass === e.currentTarget.className) {
      this.props.moveList({
        start: this.state.draggedItemIndex,
        end: list.index
      });
    }
  }

  renderLists = () => {
    let {lists, tasks} = this.props;
    return (<div>
      {lists.map(list => <List
        onDragStart={this.onDragStart({index: list.index, className: "list"})}
        onDrop={this.onDrop({index: list.index, className: "list"})}
        onDragOver={this.onDragOver}
        moveTask={this.props.moveTask}
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
  moveTask: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired
}

export default Dashboard
