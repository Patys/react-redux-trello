import React from 'react'
import PropTypes from 'prop-types'
import Dashboard from 'components/Dashboard'

export const DashboardRoute = ({ lists, tasks, dragId, moveTask, moveList, dragTask }) => (
  <div>
    <Dashboard moveTask={moveTask} dragTask={dragTask} moveList={moveList} lists={lists} tasks={tasks} dragId={dragId} />
  </div>
)
DashboardRoute.propTypes = {
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  dragId: PropTypes.number.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired,
  dragTask: PropTypes.func.isRequired
}

export default DashboardRoute
