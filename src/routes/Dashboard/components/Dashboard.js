import React from 'react'
import PropTypes from 'prop-types'
import Dashboard from 'components/Dashboard'

export const DashboardRoute = ({ lists, tasks, moveTask, moveList }) => (
  <div>
    <Dashboard moveTask={moveTask} moveList={moveList} lists={lists} tasks={tasks} />
  </div>
)
DashboardRoute.propTypes = {
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired,
  moveTask: PropTypes.func.isRequired,
  moveList: PropTypes.func.isRequired
}

export default DashboardRoute
