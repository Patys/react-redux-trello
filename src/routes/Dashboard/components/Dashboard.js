import React from 'react'
import PropTypes from 'prop-types'
import Dashboard from 'components/Dashboard'

export const DashboardRoute = ({ lists, tasks }) => (
  <div>
    <Dashboard lists={lists} tasks={tasks} />
  </div>
)
DashboardRoute.propTypes = {
  lists: PropTypes.array.isRequired,
  tasks: PropTypes.array.isRequired
}

export default DashboardRoute
