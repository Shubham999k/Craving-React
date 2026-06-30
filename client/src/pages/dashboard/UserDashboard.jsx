import React from 'react'

const UserDashboard = () => {

    const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <>
    <div>UserDashboard {user.name}</div>
    <div>UserDashboard {user.email}</div>
    <div>UserDashboard {user.phone}</div>
    <div>UserDashboard {user.profilePicture}</div>
    </>
  )
}

export default UserDashboard