import React from 'react'
import { Link } from 'react-router-dom'


const PropertyCard = (props) => {
    const property = props.property;
  return (
    <div className='card-container'>
        <img
        src='https://images.unsplash.com/photo-1495446815901-a7297e633e8d'
        alt='Property'
        height={200}
        />
        <div className='desc'>
        <h2>
            <Link to={`/show-listing/${property._id}`}>{property.title}</Link>
        </h2>
        <h3>{property.author}</h3>
        <p>{property.description}</p>
        </div>
    </div>
  )
}

export default PropertyCard