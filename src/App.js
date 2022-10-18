/* eslint-disable no-unused-expressions */
/* eslint-disable jsx-a11y/anchor-is-valid */
import { useEffect, useState} from "react";
import "./App.css";
import amy from "./images/avatars/image-amyrobson.png";
import { getComments, getReplies } from "./actions/getData";
import { api } from "./api/api";
import { useSelector, useDispatch } from "react-redux";
import { setDeleteId} from "./redux/deleteId";
import DeleteComment from "./components/deleteComment";
import DeleteReply from "./components/deleteReply";

function App() {
  // const [isReadonly, setIsReadonly] = useState(true);
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [parentId, setparentId] = useState();
  const [addComment, setAddComment] = useState("");
  const [addReply, setAddReply] = useState("");

  const [replyTo, setReplyTo] = useState("");
  // const [updateThis, setUpdateThis] = useState("");



  // This is if you want to use USESTATE => const [deleteID, setDeleteID] = useState();

  const dispatch = useDispatch();

  const mainUser = "Josep";

  // NEW COMMENT
  const createComment = async (e) => {
    e.preventDefault();
    const body = {
      content: addComment,
    };

    await api.post("/api/comments", body);
    getComments(setComments);

    document.querySelector("#text").value = "";
  };

  // CREATE REPLY TO COMMENT
  const ReplyToComment = async () => {
    const body = {
      content: addReply,
      parentId: parentId,
    };
    await api.post("/api/replies", body);
    getReplies(setReplies);

    document.querySelector("#text").value = "";
  };
// CREATE REPLY TO REPLY
  const ReplyToReply = async () => {
    const body = {
      content: addReply,
      parentId: parentId,
    };
    await api.post("/api/replies", body);
    getReplies(setReplies);

    document.querySelector("#text").value = "";
  };

  // SELECT COMMENT FOR DELETION
  function selectForDelete(comments) {
    // This is if you want to use USESTATE => setDeleteID(comments);
    dispatch(setDeleteId(comments));
  }
  // SELECT ID FOR COMMENT
  function IDForComment(id) {
    setparentId(id._id);
    setReplyTo(id._id);
  }
// SELECT ID FOR REPLY
  function IDForReply(id) {
    setparentId(id.parentId);
    setReplyTo(id._id);
  }
// SELECT ID FOR UPDATE
  function selectForUpdate(id) {
    // setUpdateThis(id);
    // setIsReadonly(false);
    console.log("ID THERE", id);
  }

  const addToScore = async (data) => {
    const content = data.content;
    const createdAt = data.createdAt;
    const username = data.username;
    const parentId = data.parentId;
    let a = parseInt(data.score);
    let b = a + 1;
    console.log(b);

    const body = {
      content: content,
      createdAt: createdAt,
      score: b,
      username: username,
      parentId: parentId,
    };
    await api.patch(`/api/comments/score/${data._id}`, body);
    getComments(setComments);
  };

  const deductToScore = async (data) => {
    const content = data.content;
    const createdAt = data.createdAt;
    const username = data.username;
    const parentId = data.parentId;
    let a = parseInt(data.score);

    let b = a - 1;

    const body = {
      content: content,
      createdAt: createdAt,
      score: b,
      username: username,
      parentId: parentId,
    };
    await api.patch(`/api/comments/score/${data._id}`, body);
    getComments(setComments);
  };

  const addToScoreReplies = async (data) => {
    const content = data.content;
    const createdAt = data.createdAt;
    const username = data.username;
    const parentId = data.parentId;
    let a = parseInt(data.score);
    let b = a + 1;

    const body = {
      content: content,
      createdAt: createdAt,
      score: b,
      username: username,
      parentId: parentId,
    };
    await api.patch(`/api/replies/score/${data._id}`, body);
    getReplies(setReplies);
  };

  const deductToScoreReplies = async (data) => {
    const content = data.content;
    const createdAt = data.createdAt;
    const username = data.username;
    const parentId = data.parentId;
    let a = parseInt(data.score);

    let b = a - 1;

    const body = {
      content: content,
      createdAt: createdAt,
      score: b,
      username: username,
      parentId: parentId,
    };
    await api.patch(`/api/replies/score/${data._id}`, body);
    getReplies(setReplies);
  };

  useEffect(() => {
    getComments(setComments);
    getReplies(setReplies);
  }, []);



  return (
    <div className='App'>
      <div className='container-fluid d-flex flex-column align-items-center p-4'>
        {comments.map((comments) => {
          return (
            <div className='comment-area d-flex flex-column align-items-end'>
              <div className='comment-card d-flex' key={comments._id}>
                <div className='score'>
                  <button onClick={() => addToScore(comments)}>+</button>
                  <span>{comments.score}</span>
                  <button onClick={() => deductToScore(comments)}>-</button>
                </div>
                <div className='comment-box'>
                  <div className='comment-header'>
                    <div className='user-info d-flex'>
                      <img src={amy} alt='avatar' />
                      <a href='#'>{comments.username} </a>
                      <p className='time'>{comments.createdAt}</p>
                    </div>
                    <div className='actions'>
                      {comments.username === mainUser && (
                        <div>
                          <button onClick={() => selectForDelete(comments._id)} data-bs-toggle='modal' data-bs-target='#staticBackdrop'>
                            Delete
                          </button>

                          <button onClick={() => selectForUpdate(comments._id)}>Edit</button>
                        </div>
                      )}
                      {comments.username !== mainUser && <button onClick={() => IDForComment(comments)}>Reply</button>}
                    </div>
                  </div>

                  <p className='comment-content'>{comments.content}</p>

                  {/* CURRENTLY DEVELOPING EDIT AREA */}
                  {/* {comments._id === updateThis && (
                    <textarea readOnly={isReadonly} className='comment-content'>
                      {comments.content}
                    </textarea>
                  )} */}
                </div>
              </div>

              {/* SHOW REPLIES */}

              {replies
                .filter((replies) => {
                  if (comments._id === replies.parentId) {
                    return replies;
                  }
                })
                .map((replies) => {
                  return (
                    <div className='vertical-line rel d-flex flex-column'>
                      <div className=' comment-card-reply d-flex' key={replies._id}>
                        <div className='score'>
                          <button onClick={() => addToScoreReplies(replies)}>+</button>
                          <span>{replies.score}</span>
                          <button onClick={() => deductToScoreReplies(replies)}>-</button>
                        </div>
                        <div className='comment-box'>
                          <div className='comment-header d-flex'>
                            <div className='user-info d-flex'>
                              <img src={amy} alt='avatar' />
                              <a href='#'>{replies.username} </a>
                              <p className='time'>{replies.createdAt}</p>
                            </div>
                            {replies.username === mainUser && (
                              <div>
                                <button onClick={() => selectForDelete(replies._id)} data-bs-toggle='modal' data-bs-target='#deleteReply'>
                                  Delete
                                </button>
                                <button onClick={() => selectForUpdate(replies._id)}>Edit</button>
                              </div>
                            )}

                            {replies.username !== mainUser && <button onClick={() => IDForReply(replies)}>Reply</button>}
                          </div>
                          <p className='comment-content'>
                            <span className='user-font'>@{comments.username} </span>
                            {replies.content}
                          </p>
                        </div>
                      </div>
{/* REPLY TO REPLY */}
                      {replies._id === replyTo && (
                        <div className='comment-replyToReply'>
                          <div className='user'>
                            <img src={amy} alt='avatar' />
                          </div>
                          <div className='comment-box-area d-flex align-items-center'>
                            <textarea required id='text' placeholder='Add a comment...' onChange={(e) => setAddReply(e.target.value)}>{`@${replies.username}, `}</textarea>
                          </div>
                          <button className='send-reply' onClick={() => ReplyToReply(replies.parentId)}>
                            REPLY
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
{/* REPLY TO COMMENT */}
              {comments._id === replyTo && (
                <div className='comment-replyToComment'>
                  <div className='user'>
                    <img src={amy} alt='avatar' />
                  </div>
                  <div className='comment-box-area d-flex align-items-center'>
                    <textarea required id='text' placeholder='Add a comment...' onChange={(e) => setAddReply(e.target.value)}>{`@${comments.username}, `}</textarea>
                  </div>
                  <button className='send-reply' onClick={() => ReplyToComment(comments._id)}>
                    REPLY
                  </button>
                </div>
              )}
            </div>
          );
        })}

        {/* USER NEW COMMENT AREA */}
        <form onSubmit={createComment}>
          <div className='comment-card-user d-flex '>
            <div className='user'>
              <img src={amy} alt='avatar' />
            </div>

            <div className='comment-box-area d-flex align-items-center'>
              <textarea className='form-control' required id='text' placeholder='Add a comment...' onChange={(e) => setAddComment(e.target.value)}></textarea>
            </div>
            <button type='submit' className='send-reply'>
              SEND
            </button>
          </div>
        </form>

      </div>

      {/* MODALSZ */}
      <DeleteComment />
      <DeleteReply />
      
    </div>
  );
}

export default App;
