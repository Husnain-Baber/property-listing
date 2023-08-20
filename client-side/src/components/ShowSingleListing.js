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
          <table className='table table-hover table-dark'>
            <tbody>
              <tr>
                <th scope='row'>1</th>
                <td>Title</td>
                <td>{property.title}</td>
              </tr>
              <tr>
                <th scope='row'>2</th>
                <td>Author</td>
                <td>{property.author}</td>
              </tr>
              <tr>
                <th scope='row'>3</th>
                <td>ISBN</td>
                <td>{property.isbn}</td>
              </tr>
              <tr>
                <th scope='row'>4</th>
                <td>Publisher</td>
                <td>{property.publisher}</td>
              </tr>
              <tr>
                <th scope='row'>5</th>
                <td>Published Date</td>
                <td>{property.published_date}</td>
              </tr>
              <tr>
                <th scope='row'>6</th>
                <td>Description</td>
                <td>{property.description}</td>
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
          <div className='col-md-6 m-auto'>
            <button
              type='button'
              className='btn btn-outline-danger btn-lg btn-block'
              onClick={() => {
                onDeleteClick(property._id);
              }}
            >
              Delete Listing
            </button>
          </div>
          <div className='col-md-6 m-auto'>
            <Link
              to={`/edit-listing/${property._id}`}
              className='btn btn-outline-info btn-lg btn-block'
            >
              Edit Listing
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ShowSingleListing