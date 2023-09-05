import React from 'react'
import { Route, Routes } from 'react-router-dom'
import routes from '../routes'

const AppContent = () => {
  return (
    <Routes>
        {
            routes.map((route, i) => {
                return(

                    <Route
                        key={i}
                        path={route.path}
                        element={<route.element />}
                    />

                )
            })
        }
     </Routes>
  )
}

export default AppContent