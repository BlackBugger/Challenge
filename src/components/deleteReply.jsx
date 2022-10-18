import React from 'react';
import { deleteReply } from '../actions/deleteComment';
import '../App.css';
import {useSelector} from 'react-redux';



export default function DeleteReply() {

 const {deleteID} = useSelector((state) => state.deleteID)
  return (
    <div className="modal fade" id="deleteReply" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="deleteReplyLabel" aria-hidden="true">
    <div className="modal-dialog modal-dialog-centered">
      <div className="modal-content p-4">
        <div className="modal-header border-0 p-0">
          <h1 className="modal-title fs-5" id="deleteReplyLabel">Delete comment</h1>
        </div>
        <div className="modal-body p-0 pt-3">
          Are you sure you want to delete this Reply? This will remove the comment and can't be undone.
        </div>
        <div className="d-flex justify-content-between border-0 p-0 mt-3">
          <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">NO, CANCEL</button>
          <button type="submit" className="btn btn-primary" onClick={()=>deleteReply(deleteID)}  data-bs-dismiss="modal">YES, DELETE</button>
        </div>
      </div>
    </div>
  </div>
  )
}
