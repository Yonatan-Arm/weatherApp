import React from 'react'
import { NavLink } from 'react-router-dom'

export const AppNav = () => {
  return (
    <>
      <nav>
        <NavLink activeClassName='active' to='/home'>
          <button>
            <i className='fa-solid fa-star'></i>
          </button>
        </NavLink>
        <NavLink activeClassName='active' to='/weather'>
          <button>
          <i className='fa-solid fa-cloud-sun-rain'></i>
          </button>
        </NavLink>
      </nav>
    </>
  )
}

