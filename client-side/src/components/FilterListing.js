import React, { useState } from 'react'
import axios from 'axios'
import MultiRangeSlider from './MultiRangeSlider';

const FilterListing = () => {
    const [property, setProperty] = useState({});
    const onChange = (e) => {
        setProperty({ [e.target.name]: e.target.value });
        // console.log(property)
      };
    
      const onSubmit = (e) => {
        e.preventDefault();
        const data = {
            property_type: property.property_type,
            // description: property.description,
            // property_type: property.property_type,
            // level: property.level,
            // rooms: property.rooms,
            // bathrooms: property.bathrooms,
            // area: property.area,
            // area_unit: property.area_unit,
            // status: property.status,
            // price: property.price,
          };
        axios
          .get(`http://localhost:8082/api/properties/property/${property.property_type}`)
          .then((res) => {
            setProperty({
                title: res.data[0].title,
                description: res.data[0].description,
                property_type: res.data[0].property_type,
                rooms: res.data[0].rooms,
                bathrooms: res.data[0].property_type,
                property_type: res.data[0].property_type,
            });
            console.log(res.data[0].title)
            // Push to /
            // navigate('/');
          })
          .catch((err) => {
            console.log('Search Error: ', err);
          });
      };
  return (
    <div className='ShowPropertyList'>
        <div className='container'>
            <div className=''>
                <h2 className='display-4 text-center'>Filter Listing</h2>
            </div>
            <hr />
            <form noValidate onSubmit={onSubmit}>
                <div className='row'>
                  <div className='col-md-3 mb-3'>
                    <label className='form-label'>Property Type </label>
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
                  <div className='col-md-3 mb-3'>
                    <label className='form-label'>Number of Rooms </label>
                    <select className='form-control' name='rooms' onChange={onChange}>
                      <option value=''>Select No. of Rooms</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                    </select>
                  </div>
                  <div className='col-md-3 mb-3'>
                    <label className='form-label'>Floor Level </label>
                    <select className='form-control' name='level' onChange={onChange}>
                      <option value=''>Select Floor Level</option>
                      <option value='0'>0</option>
                      <option value='1'>1</option>
                      <option value='2'>2</option>
                      <option value='3'>3</option>
                      <option value='4'>4</option>
                      <option value='5'>5</option>
                      <option value='6'>6</option>
                    </select>
                  </div>
                  <div className='col-md-3 mb-3'>
                  <label className='form-label'>Covered Area Range</label>
                  <MultiRangeSlider
                    min={10}
                    max={2000}
                    onChange={({ min, max }) => console.log(`min = ${min}, max = ${max}`)}
                  />
                  </div>
                </div>
                <button
                    type='submit'
                    className='btn btn-outline-info btn-lg btn-block'
                    >
                    Search
                </button>
            </form>
            
        </div>
        {property.title} {property.description} {property.property_type}
    </div>
  )
}

export default FilterListing