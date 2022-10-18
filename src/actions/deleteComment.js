import { api } from "../api/api";

export  const deleteComment = (deleteID) => {
  
  console.log("This is DleteID:",deleteID);
  api.delete(`/api/comments/${deleteID}`);
window.location.reload();
  }

  export  const deleteReply = (deleteID) => {
  
    console.log("This is DleteID:",deleteID);
    api.delete(`/api/replies/${deleteID}`);
    window.location.reload();
    
    }
  