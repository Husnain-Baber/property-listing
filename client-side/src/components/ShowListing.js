import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from './PropertyCard';

const ShowListing = () => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios
    .get('http://localhost:8082/api/properties')
    .then((res) => {
      setProperties(res.data);
    })
    .catch((err) => {
      console.log('Error in show listing: ' , err)
    })
  }, [])

  const propertyList = properties.length === 0 ? 'There is no property listing' : properties.map((property, i) => <PropertyCard property={property} key={i} />)

  return (
    <div className='ShowBookList'>
      <div className='container'>
      <div className='row'>
          <div className='col-md-12'>
            <br />
            <h2 className='display-4 text-center'>Property Listing</h2>
          </div>

          <div className='col-md-11'>
            <Link
              to='/create-listing'
              className='btn btn-outline-warning float-right'
            >
              + Add New Property
            </Link>
            <br />
            <br />
            <hr />
          </div>
        </div>
        <div className='list'>{propertyList}</div>
      </div>
    </div>

  )
}

export default ShowListing