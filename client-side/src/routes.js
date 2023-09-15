import React from "react";

const ShowListing = React.lazy(() => import('./components/ShowListing'))
const CreateListing = React.lazy(() => import('./components/CreateListing'))
const ShowSingleListing = React.lazy(() => import('./components/ShowSingleListing'))
const EditListing = React.lazy(() => import('./components/EditListing'))

const routes = [
    { id: 0, path: '/', name: 'All Listing', element: ShowListing },
    { id: 1, path: '/create-listing', name: 'Create Listing', element: CreateListing },
    { id: 2, path: '/show-listing/:id', name: 'Show Listing', element: ShowSingleListing },
    { id: 3, path: '/edit-listing/:id', name: 'Edit Listing', element: EditListing },
    { id: 4, path: '/my-listing', name: 'My Listing', element: ShowListing },

]

export default routes