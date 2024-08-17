import React, { useState } from 'react'
import './Card.css'
import { useSelector } from 'react-redux';
import { API_BASE_URL } from '../../src/config'
import axios from 'axios';

const Card = (props) => {
  const user = useSelector(state => state.userReducer);
  const [commentBox, setCommentBox] = useState(false)
  const [comment, setComment] = useState("")
  console.log(props.postData.author._id);
  console.log(user.user._id);

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const submitComment = async (postId) => {
    setCommentBox(false);
    const request = { "postId": postId, "commentText": comment };
    const response = await axios.put(`${API_BASE_URL}/comment`, request, CONFIG_OBJ);
    if (response.status === 200) {
      props.getAllPosts();
    }
  }

  const likeDislikePost = async (postId, type) => {
    const request = { "postId": postId };
    const response = await axios.put(`${API_BASE_URL}/${type}`, request, CONFIG_OBJ);
    if (response.status === 200) {
      props.getAllPosts();
    }
  }

  return (
    <div className='card shadow-sm'>
      <div className="card-body px-2">
        <div className='row'>
          <div className='col-6 d-flex'>
            <img className='p-2 profile-pic' src="https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile" />
            <div className="mt-2">
              <p className='fs-6 fw-bold'>{props.postData.author.fullname}</p>
              <p className='location'>{props.postData.location}</p>
            </div>
          </div>
          {props.postData.author._id == user.user._id ? <div className='col-6'>

            <  span className='float-end mt-2 ' onClick={() => props.deletePost(props.postData._id)} style={{ cursor: "pointer" }} ><i className="fa-solid fa-ellipsis-vertical"></i></span>

          </div> : ''}
        </div>
        <div className='row'>
          <div className='col-12'>
            <img style={{ borderRadius: '15px' }} className='p-2 img-fluid' alt={props.postData.description} src={props.postData.image} />
          </div>
        </div>

        <div className='row my-2'>
          <div className='col-6 d-flex '>
            <i onClick={() => likeDislikePost(props.postData._id, 'like')} className="fs-5 ps-2 fa-regular fa-heart"></i>
            <i onClick={() => likeDislikePost(props.postData._id, 'unlike')} className="fs-5 ps-2 fa-solid fa-heart"></i>
            <i onClick={() => setCommentBox(true)}  className="fs-5 ps-2 fa-regular fa-comment"></i>

          </div>
          <div className='col-6'>
            <span className='pe-2 fs-6 fw-bold float-end '>{props.postData.likes.length}  Likes</span>

          </div>
        </div>

        {commentBox ? <div className='row mb-2'>
          <div className='col-8'>
            <textarea onChange={(e) => setComment(e.target.value)} className='form-control'></textarea>
          </div>
          <div className='col-4'>
            <button className='btn btn-primary' onClick={() => submitComment(props.postData._id)}>Submit</button>
          </div>
        </div> : ""}
       
        {props.postData.comment.map((comment) => {
                        return (<div className='row'>
                            <div className='col-12'>
                                <p>{comment.commentText} - {comment.commentedBy.fullName}</p>
                            </div>
                        </div>)
                    })}     
        <div className="row">
          <div className="col-12">
            <div className="mt-2">
              <p className='text-muted fs-10 ps-2'>2 Houres</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Card
