import React from 'react'
import CustomButton from '../../components/CustomButton/CustomButton'

const DeleteConfirm = () => {
  return (
    <div class="container">
    <h1>Delete Account</h1>
    <p>Are you sure you want to delete your account?</p>

    <div class="clearfix">
      <CustomButton className="button" value="Cancel" /> 
      <CustomButton className="button" value="delete"/>
    </div>
  </div>
  )
}

export default DeleteConfirm