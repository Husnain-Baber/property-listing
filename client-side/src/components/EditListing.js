import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


const EditListing = () => {
    const [property, setProperty] = useState({
        title: '',
        description: '',
        property_type: '',
        level: '',
        rooms: '',
        bathrooms: '',
        area: '',
        unit_area: '',
        status: '',
        price: '',
    })
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
          .get(`http://localhost:8082/api/properties/${id}`)
          .then((res) => {
            setProperty({


              title: res.data.title,
              description: res.data.description,
              property_type: res.data.property_type,
              level: res.data.level,
              rooms: res.data.rooms,
              bathrooms: res.data.bathrooms,
              area: res.data.area,
              unit_area: res.data.unit_area,
              status: res.data.status,
              price: res.data.price,
            });
          })
          .catch((err) => {
            console.log('Error: ', err);
          });
      }, [id]);

      
  const onChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const data = {
      title: property.title,
      isbn: property.isbn,
      author: property.author,
      description: property.description,
      published_date: property.published_date,
      publisher: property.publisher,
    };

    axios
      .put(`http://localhost:8082/api/properties/${id}`, data)
      .then((res) => {
        navigate(`/show-listing/${id}`);
      })
      .catch((err) => {
        console.log('Error!', err);
      });
  };
  return (
    <div className='UpdateBookInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show All Listing
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Listing</h1>
            <p className='lead text-center'>Update Listing's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='form-group'>
              <label htmlFor='title'>Title</label>
              <input
                type='text'
                placeholder='Title of the Book'
                name='title'
                className='form-control'
                value={property.title}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='isbn'>ISBN</label>
              <input
                type='text'
                placeholder='ISBN'
                name='isbn'
                className='form-control'
                value={property.isbn}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='author'>Author</label>
              <input
                type='text'
                placeholder='Author'
                name='author'
                className='form-control'
                value={property.author}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='description'>Description</label>
              <textarea
                type='text'
                placeholder='Description of the Book'
                name='description'
                className='form-control'
                value={property.description}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='published_date'>Published Date</label>
              <input
                type='text'
                placeholder='Published Date'
                name='published_date'
                className='form-control'
                value={property.published_date}
                onChange={onChange}
              />
            </div>
            <br />

            <div className='form-group'>
              <label htmlFor='publisher'>Publisher</label>
              <input
                type='text'
                placeholder='Publisher of the Book'
                name='publisher'
                className='form-control'
                value={property.publisher}
                onChange={onChange}
              />
            </div>
            <br />

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Listing
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditListing