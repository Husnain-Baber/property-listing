import React from 'react'

const ProfileModal = ({user}) => {
  return (
    <div className="modal fade " id="profileModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h5 className="modal-title text-dark" id="exampleModalLabel">Profile</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-dark">
                <p className='mb-0'>You are logged in as {user.status}</p>
                <h3>{user.first_name} {user.last_name}</h3>
                <p className='mb-0'>Your logged in Email ID is</p>
                <h4>{user.email}</h4>
                <p className='mb-0'>Total listing you have posted</p>
                {/* <h4>{user.status}</h4> */}
            </div>
            </div>
        </div>
    </div>
  )
}

export default ProfileModal