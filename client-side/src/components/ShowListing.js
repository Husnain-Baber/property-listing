import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
// import PropertyCard from './PropertyCard';
import Spinner from './Spinner'
import { SlTrash, SlEye, SlPencil } from "react-icons/sl";

const ShowListing = () => {
  let user_id = '';
  const [properties, setProperties] = useState([]);
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState('');
  const [userid, setUserid] = useState();

  const navigate = useNavigate();
  const location = useLocation();
 

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
  useLayoutEffect(() => {
    setStatus(localStorage.getItem("status"));
    user_id = localStorage.getItem("userid");
    // setUserid(user_id);
  }, [location.pathname])

  useEffect(() => {
    let listing = '';
    location.pathname === '/my-listing' ?  listing = `http://localhost:8082/api/properties/property/${user_id}` : listing = `http://localhost:8082/api/properties`;
    console.log(listing);
    console.log(userid);
    axios
    .get(listing)
    .then((res) => {
      setProperties(res.data);
      setLoader(false)
    })
    .catch((err) => {
      console.log('Error in show listing: ' , err)
    })
  },[location.pathname])

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
            {
              (status === 'admin' && 
                <>
                <button type="button" className="btn btn-secondary" onClick={() => navigateUpdate(property._id)}> <SlPencil /> </button>
                <button type="button" className="btn btn-danger" onClick={() => 
                    onDeleteClick(property._id)}><SlTrash /> </button>
                </>
                )
            }
            
          </div>
        </td>
      </tr>
    )
  })

  return (
    <div className='ShowPropertyList'>
      <div className=''>
        <div className=''>
          <h2 className='display-4 text-center'>Property Listing </h2>
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