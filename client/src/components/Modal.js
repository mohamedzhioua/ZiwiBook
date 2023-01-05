import React from 'react'
import CustomButton from './CustomButton/CustomButton';
import { HiDotsHorizontal } from "react-icons/hi";
import AddEditMemo from '../pages/AddEditMemorie/AddEditMemorie';

const Modal = ({EDIT}) => {
  return (<>
{ !EDIT ?   (<CustomButton  value="add Memorie"  className="button2" data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>)
      : (<HiDotsHorizontal  data-bs-toggle="modal" data-bs-target="#staticBackdrop"/>) }
<div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" ></button>
      </div>
      <AddEditMemo/>
      </div>
  </div>
</div>
</>
  )
}
// onClick={(e)=>{ clear(); dispatch(reset())}}

export default Modal