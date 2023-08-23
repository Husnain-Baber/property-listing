import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import PropertyCard from './PropertyCard';


const ShowListing = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  const navigateDetail = (id) => {
    navigate(`/show-listing/${id}`)
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
            <button type="button" className="btn btn-success" onClick={() => navigateDetail(property._id)}> <i className="fa fa-eye"></i> </button>
            <button type="button" className="btn btn-secondary"><i className="fa fa-edit"></i> </button>
            <button type="button" className="btn btn-danger" onClick={() => 
                onDeleteClick(property._id)}><i className="fa fa-trash"></i> </button>
          </div>
        </td>
      </tr>
    )
  })

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
        {/* <div className='list'>{propertyList}</div> */}
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
              {propertyTableList}
            </tbody>
          </table>
      </div>
    </div>

  )
}

export default ShowListing