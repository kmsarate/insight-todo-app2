import {NavLink} from 'react-router-dom';
import React from 'react'
import './Menu.css'

const Menu = () => {
  return (
     <div className='menu-container'>
        <div className='menu-bar'>
          <div className='menu-items'>
              <h1>USER</h1>
              <div className='add-task-button'><h1>+ Add a task</h1></div>

              <div className='list'>
                <h1>Lists</h1>
                <div className='list-items'>
                    <NavLink to="/" className={({ isActive }) => (isActive ? 'active-link' : 'app-link')}>
                <h2>All Tasks</h2>
              </NavLink>
              <div className='list-items'>
                     <NavLink to="/Today" className={({ isActive }) => (isActive ? 'active-link' : 'app-link')}>
                <h2>Today</h2>
              </NavLink>
              </div>
              <div className='list-items'>
                     <NavLink to="/Filters" className={({ isActive }) => (isActive ? 'active-link' : 'app-link')}>
                <h2>Filters</h2>
              </NavLink>
              </div>
                </div>
              </div>
              <div className='calendar'>
                <h1>Calendar</h1>
                <div className='calendar-items'>
                <NavLink to="/Upcomings" className={({ isActive }) => (isActive ? 'active-link' : 'app-link')}>
                <h1>Upcomings</h1>
              </NavLink>
                </div>
              </div>

              <div className='signout-button'><h1>Sign Out</h1></div>

          </div>
</div>
        </div>
  )
}

export default Menu