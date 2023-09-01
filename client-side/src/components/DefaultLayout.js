import React from 'react'
import AppContent from './AppContent'
import Header from './layout/Header'
import Footer from './layout/Footer'
import FilterListing from './FilterListing'

const DefaultLayout = () => {

  return (
    <>
        <Header />
        <FilterListing />
        <AppContent />
        <Footer />
        {/* <AppSidebar />
        <div className="wrapper d-flex flex-column min-vh-100 bg-light wrapper_space">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
          <AppContent />
          </div>
          <AppFooter />
        </div> */}
    </>
  )
}

export default DefaultLayout