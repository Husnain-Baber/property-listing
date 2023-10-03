import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link, useNavigate, useParams } from 'react-router-dom'


const EditListing = () => {
  // const [propertyStatus, setPropertyStatus] = useState('')
    const [property, setProperty] = useState({
        title: '',
        description: '',
        property_type: '',
        level: '',
        rooms: '',
        bathrooms: '',
        area: '',
        area_unit: '',
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
              area_unit: res.data.area_unit,
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
      description: property.description,
      property_type: property.property_type,
      level: property.level,
      rooms: property.rooms,
      bathrooms: property.bathrooms,
      area: property.area,
      area_unit: property.area_unit,
      status: property.status,
      price: property.price,
    };

    axios
      .put(`http://localhost:8082/api/properties/${id}`, data)
      .then((res) => {
        navigate(`/show-listing/${id}`);
      })
      .catch((err) => {
        console.log('Error in update!', err);
      });
  };
  return (
    <div className='UpdatePropertyInfo'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Edit Listing</h1>
            <p className='lead text-center'>Update Listing's Info</p>
          </div>
        </div>

        <div className='col-md-8 m-auto'>
          <form noValidate onSubmit={onSubmit}>
            <div className='row'>
          <div className='col-md-6 mb-3'>
                <label>Title </label>
                <input
                  type='text'
                  placeholder='E.g: Flat for rent'
                  name='title'
                  className='form-control'
                  value={property.title}
                  onChange={onChange}
                />
              </div>

              <div className='col-md-6 mb-3'>
              <label>Description </label>
                <input
                  type='text'
                  placeholder='Description of the property'
                  name='description'
                  className='form-control'
                  value={property.description}
                  onChange={onChange}
                />
              </div>

               <div className='col-md-6 mb-3'>
               <label>Property Type </label>
               <select className='form-control' name='property_type' onChange={onChange} value={property.property_type}>
                <option value=''>Select Property Type</option>
                <option value='Apartment'>Apartment</option>
                <option value='Banglow'>Banglow</option>
                <option value='House'>House</option>
                <option value='Land'>Land</option>
                <option value='Plot'>Plot</option>
                <option value='Shop'>Shop</option>
               </select>
              </div>

              <div className='col-md-6 mb-3'>
              <label>Floor Level</label>
                <input
                  type='number'
                  placeholder='Floor Level'
                  name='level'
                  className='form-control'
                  value={property.level}
                  onChange={onChange}
                />
              </div>

              <div className='col-md-6 mb-3'>
              <label>Number of Rooms</label>
                <input
                  type='number'
                  placeholder='No. of rooms'
                  name='rooms'
                  className='form-control'
                  value={property.rooms}
                  onChange={onChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
              <label>Number of Bathrooms </label>
                <input
                  type='number'
                  placeholder='E.g: 2'
                  name='bathrooms'
                  className='form-control'
                  value={property.bathrooms}
                  onChange={onChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
              <label>Total Area </label>
                <input
                  type='number'
                  placeholder='E.g: 1200'
                  name='area'
                  className='form-control'
                  value={property.area}
                  onChange={onChange}
                />
              </div>
              <div className='col-md-6 mb-3'>
              <label>Area Unit </label>
              <select className='form-control' name='area_unit' onChange={onChange} value={property.area_unit}>
                <option value=''>Select Unit</option>
                <option value='Square meter'>Square meter</option>
                <option value='Square yard'>Square yard</option>
               </select>
              </div>
              <div className='col-md-6 mb-3'>

                <label>Status </label>
                <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value='Furnished' checked={property.status === 'Furnished'} onChange={onChange} />
                  <label className="form-check-label" htmlFor="inlineRadio1">Furnished</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value='Not Furnished' checked={property.status === 'Not Furnished'}  onChange={onChange} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Not Furnished</label>
                </div>
                </div>
              </div>
              <div className='col-md-6 mb-3'>
              <label>Price</label>
                <input
                  type='number'
                  placeholder='Price'
                  name='price'
                  className='form-control'
                  value={property.price}
                  onChange={onChange}
                />
              </div>

            <button
              type='submit'
              className='btn btn-outline-info btn-lg btn-block'
            >
              Update Listing
            </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditListing