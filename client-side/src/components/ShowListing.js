import React, { useEffect, useState, useLayoutEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import axios from 'axios'
// import PropertyCard from './PropertyCard';
import Spinner from './Spinner'
import Modal from './modal/modal'
import { SlTrash, SlEye, SlPencil } from "react-icons/sl";

const ShowListing = () => {
  // Number to word
  function test(n) {
    if (n < 0)
      return false;
	 let single_digit = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
	 let double_digit = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
	 let below_hundred = ['Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
	if (n === 0) return 'Zero'
	function translate(n) {
		let word = ""
		if (n < 10) {
			word = single_digit[n] + ' '
		}
		else if (n < 20) {
			word = double_digit[n - 10] + ' '
		}
		else if (n < 100) {
			let rem = translate(n % 10)
			word = below_hundred[(n - n % 10) / 10 - 2] + ' ' + rem
		}
		else if (n < 1000) {
			word = single_digit[Math.trunc(n / 100)] + ' Hundred ' + translate(n % 100)
		}
		else if (n < 1000000) {
			word = translate(parseInt(n / 1000)).trim() + ' Thousand ' + translate(n % 1000)
		}
		else if (n < 1000000000) {
			word = translate(parseInt(n / 1000000)).trim() + ' Million ' + translate(n % 1000000)
		}
		else {
			word = translate(parseInt(n / 1000000000)).trim() + ' Billion ' + translate(n % 1000000000)
		}
		return word
	}
	let result = translate(n) 
	  return result.trim()
}

  // End
  let user_id = '';
  const [properties, setProperties] = useState([]);
  const [loader, setLoader] = useState(true);
  const [status, setStatus] = useState('');
  const [userid, setUserid] = useState();
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
 

  const navigateDetail = (id) => {
    // navigate(`/show-listing/${id}`)
    setShowModal(true);
    // return <Modal />
    // return <Modal visible={showModal} onClose={()=> setShowModal(false)} />
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
        <td><p className='mb-0'>{property.price}</p> <span style={{fontSize: '12px'}}>({test(property.price)})</span></td>
        <td>
          <div className="btn-group" role="group" aria-label="Basic mixed styles example">
            <button type="button" className="btn btn-success"  onClick={() => navigateDetail(property._id)}> <SlEye /> </button>
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
      {/* <Modal /> */}
    </div>
  )
}

export default ShowListing