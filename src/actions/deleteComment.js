import { api } from "../api/api";

export  const deleteComment = async(deleteID) => {
  
  console.log("This is DleteID:",deleteID);
  api.delete(`/api/comments/${deleteID}`);

  }

  export  const deleteReply = (deleteID) => {
  
    console.log("This is DleteID:",deleteID);
   
    
    }
  