import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom'

const ShowSingleListing = (props) => {
    const [property, setProperty] = useState({});
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:8082/api/properties/${id}`)
        .then((res) => {
            setProperty(res.data);
        })
        .catch((err) => {
            console.log('Error', err);
        })
    }, [id]);

    const onDeleteClick = (id) => {
        axios
          .delete(`http://localhost:8082/api/properties/${id}`)
          .then((res) => {
            navigate('/');
          })
          .catch((err) => {
            console.log('Error: ', err);
          });
      };

    const BookItem = (
        <div>
          <div className='d-flex align-items-center justify-content-between'>
            <h2>{property.title}</h2>
            <div>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(property._id);
              }}
            >
              <i className='fa fa-trash'></i>
            </button>

            <Link
              to={`/edit-listing/${property._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              <i className='fa fa-edit'></i>
            </Link>
            </div>
          </div>
          <p>{property.description}</p>
          <table className='table text-light'>
            <tbody>
              <tr>
                <td>Property Type</td>
                <td>{property.property_type}</td>

                <td>Number of Rooms</td>
                <td>{property.rooms}</td>
              </tr>
              <tr>
                <td>Number of Bathrooms</td>
                <td>{property.bathrooms}</td>
             
                <td>Covered Area</td>
                <td>{property.area} {property.area_unit}</td>
              </tr>
              <tr>
                <td>Status</td>
                <td>{property.status}</td>
             
                <td>Price</td>
                <td>{property.price}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
  return (
    <div className='ShowBookDetails'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-10 m-auto'>
            <br /> <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show All Listing
            </Link>
          </div>
          <br />
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Listing's Record</h1>
            <p className='lead text-center'>View Listing's Info</p>
            <hr /> <br />
          </div>
          <div className='col-md-10 m-auto'>{BookItem}</div>
        </div>
      </div>
    </div>
  )
}

export default ShowSingleListing