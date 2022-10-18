/* eslint-disable */
import { useEffect, useReducer } from "react";
import { api } from "../api/api";

// POPULATE DATA
export const getComments = async (setComments) => {
  try {
    const res = await api.get("/api/comments");

    const data = res.data;
    setComments(data);
    console.log("Data Successfully Logged!", data);
  } catch (err) {
    console.log("getData not workeng", err);
  }
};

export const getReplies = async (setReplies) => {
    try {
      const res = await api.get("/api/replies");
  
      const data = res.data;
      setReplies(data);
      console.log("Data Successfully Logged!", data);
    } catch (err) {
      console.log("getData not workeng", err);
    }
  };
