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
    </>
  )
}

export default DefaultLayout