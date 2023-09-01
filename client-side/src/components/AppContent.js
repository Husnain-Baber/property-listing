import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import routes from '../routes'

const AppContent = () => {
  return (
    <Routes>
        {
            routes.map((route) => {
                return(
                    <Route
                        key={route.id}
                        path={route.path}
                        name={route.name}
                        element={<route.element />}
                    />
                )
            })
        }
    </Routes>
  )
}

export default AppContent