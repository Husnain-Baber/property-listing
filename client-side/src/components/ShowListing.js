import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
// import PropertyCard from './PropertyCard';
import Spinner from './Spinner'
import { SlTrash, SlEye, SlPencil } from "react-icons/sl";
import { FiPlus } from "react-icons/fi";

const ShowListing = () => {
  const [properties, setProperties] = useState([]);
  const [loader, setLoader] = useState(true);
  const navigate = useNavigate();

  const navigateDetail = (id) => {
    navigate(`/show-listing/${id}`)
  }
  const navigateUpdate = (id) => {
    navigate(`/edit-listing/${id}`)
  }
  const onDeleteClick = (id) => {
    axios
      .delete(`http://localhost:8082/api/properties/${id}`)
      .then((res) => {
        // navigate('/');
        // setProperties(res.data);
        console.log('deleted')
      })
      .catch((err) => {
        console.log('Error: ', err);
      });
  };
  useEffect(() => {
    axios
    .get('http://localhost:8082/api/properties')
    .then((res) => {
      setProperties(res.data);
      setLoader(false)
    })
    .catch((err) => {
      console.log('Error in show listing: ' , err)
    })
  }, [])

  // const propertyList = properties.length === 0 ? 'There is no property listing' : properties.map((property, i) => <PropertyCard property={property} key={i} />)

  const propertyTableList = properties.map((property, idx) => {
    return (
      <tr key={idx++}>
        <td>{idx}</td>
        <td>{property.title}</td>
        <td>{property.property_type}</td>
        <td>{property.rooms}</td>
        <td>{property.bathrooms}</td>
        <td>{property.area} {property.area_unit}</td>
        <td>{property.price}</td>
        <td>
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className="btn btn-success" onClick={() => navigateDetail(property._id)}> <SlEye /> </button>
            <button type="button" className="btn btn-secondary" onClick={() => navigateUpdate(property._id)}> <SlPencil /> </button>
            <button type="button" className="btn btn-danger" onClick={() => 
                onDeleteClick(property._id)}><SlTrash /> </button>
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div className='ShowPropertyList'>
      <div className=''>
        <div className=''>
          <h2 className='display-4 text-center'>Property Listing</h2>
        </div>
        <div className='d-flex align-itmes-center justify-content-between'>
          <Link
            to='/create-listing'
            className='btn btn-outline-warning float-right'
          >
            <FiPlus /> Add Listing
          </Link>
        </div>
        <hr />
        <div className='table-responsive'>
          <table className='table table-hover table-dark'>
            <thead>
              <tr>
                <td>Serial#</td>
                <td>Title</td>
                <td>Type</td>
                <td>Rooms</td>
                <td>Bathrooms</td>
                <td>Area</td>
                <td>Price</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
            {
              loader ?  <tr><td colSpan={8}><Spinner /></td></tr> : propertyTableList
            }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default ShowListing