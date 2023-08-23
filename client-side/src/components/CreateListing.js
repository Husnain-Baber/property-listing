import React, { useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const CreateListing = (props) => {
    const navigate = useNavigate();
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
  });

  const onChange = (e) => {
    setProperty({ ...property, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8082/api/properties', property)
      .then((res) => {
        setProperty({
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
        });

        // Push to /
        navigate('/');
      })
      .catch((err) => {
        console.log('Create Error: ', err);
      });
  };
  return (
    <div className='CreateBook'>
      <div className='container'>
        <div className='row'>
          <div className='col-md-8 m-auto'>
            <br />
            <Link to='/' className='btn btn-outline-warning float-left'>
              Show Listing
            </Link>
          </div>
          <div className='col-md-8 m-auto'>
            <h1 className='display-4 text-center'>Add Property</h1>
            <p className='lead text-center'>Create new property</p>

            <form noValidate onSubmit={onSubmit}>
                <div className='row'>
              <div className='col-md-6 mb-3'>
                <label>Title </label>
                <input
                  type='text'
                  placeholder='Title of the Book'
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
                  placeholder='Describe this book'
                  name='description'
                  className='form-control'
                  value={property.description}
                  onChange={onChange}
                />
              </div>

               <div className='col-md-6 mb-3'>
               <label>Property Type </label>
               <select className='form-control' name='property_type' onChange={onChange}>
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
              <select className='form-control' name='area_unit' onChange={onChange}>
                <option value=''>Select Unit</option>
                <option value='Square meter'>Square meter</option>
                <option value='Square yard'>Square yard</option>
               </select>
              </div>
              <div className='col-md-6 mb-3'>

                <label>Status </label>
                <div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" id="inlineRadio1" value="Furnished" onChange={onChange} />
                  <label className="form-check-label" htmlFor="inlineRadio1">Furnished</label>
                </div>
                <div className="form-check form-check-inline">
                  <input className="form-check-input" type="radio" name="status" id="inlineRadio2" value="Not Furnished" onChange={onChange} />
                  <label className="form-check-label" htmlFor="inlineRadio2">Not Furnished</label>
                </div>
                </div>
                {/* <select className='form-control' name='status' onChange={onChange}>
                  <option value=''>Select Status</option>
                  <option value='Square meter'>Furnished</option>
                  <option value='Square yard'>Not Furnished</option>
                </select> */}
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

              <input
                type='submit'
                className='btn btn-outline-warning btn-block mt-4 btn_submit'
              />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateListing