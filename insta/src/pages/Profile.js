import React, { useState, useEffect } from 'react'
import './profile.css'
import Modal from 'react-bootstrap/Modal';
import { API_BASE_URL } from '../../src/config'
import axios from 'axios';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';



const Profile = () => {

  const [image , setImage] =useState({preview : '',data: ''})
  const [myallposts, setMyallposts] = useState([]);
  const user = useSelector(state => state.userReducer);
  const [postDetail, setPostDetail] = useState({});

  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const [caption, setCaption] = useState("");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  const [showPost, setShowPost] = useState(false);

  const handlePostClose = () => setShowPost(false);
  const handlePostShow = () => setShowPost(true);

  const handleFileSelect = (event) => {
    const img = {
      preview: URL.createObjectURL(event.target.files[0]),
      data: event.target.files[0]
    }
    setImage(img);
  }

  const CONFIG_OBJ = {
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem("token")
    }
  }

  const deletePost = async (postId) => {
    const response = await axios.delete(`${API_BASE_URL}/deletepost/${postId}`, CONFIG_OBJ);

    if (response.status === 200) {
      getMyPosts();
      setShow(false);
    }
  }

  const handleImgUpload = async () => {
    let formData = new FormData();
    formData.append('file', image.data);

    const response = axios.post(`${API_BASE_URL}/uploadFile`, formData)
    return response;
  }

  const getMyPosts = async () => {
    const response = await axios.get(`${API_BASE_URL}/myallposts`, CONFIG_OBJ);

    if (response.status === 200) {
      setMyallposts(response.data.post);
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Some error occurred while getting all your posts'
      })
    }
  }
  const showDetail = (post) => {
    setPostDetail(post);
  }

  const addPost = async () => {

    if (image.preview === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post image is mandatory!'
      })
    } else if (caption === '') {
      Swal.fire({
        icon: 'error',
        title: 'Post caption is mandatory!'
      })
    } else if (location === '') {
      Swal.fire({
        icon: 'error',
        title: 'Location is mandatory!'
      })
    } else {
      setLoading(true);
      const imgRes = await handleImgUpload();
      const request = { description: caption, location: location, image: `${API_BASE_URL}/files/${imgRes.data.fileName}` }
      // write api call to create post
      const postResponse = await axios.post(`${API_BASE_URL}/createpost`, request, CONFIG_OBJ)
      setLoading(false);
      if (postResponse.status == 201) {
        navigate("/post")
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Some error occurred while creating post'
        })
      }
    }
  }
console.log(user.user.fullname)
  useEffect(() => {
    getMyPosts();
  }, []);
  return (
    <div className='container shadow mt-3 p-5'>
      <div className="row">
        <div className="col-md-6 d-flex flex-column">
          <img className='img-fluid p-2 profile' src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8YW5pbWV8ZW58MHx8MHx8fDA%3D" alt="img" />
          <p className='ms-3 fs-5 fw-bold'>{user.user.email}</p>
          <p className='ms-3 fs-5 '>{user.user.fullname}</p>
          <p className='ms-3 fs-5 '>UX/UI  Designer @rajan | follow@{user.user.fullname}</p>
          <p className='ms-3 fs-5 '>My portfolio on <a href="#">www.myprotfolio.com/{user.user.fullname}</a></p>
        </div>
        <div className="col-md-6 d-flex flex-column justify-content-between">
          <div className="d-flex justify-content-equal mx-auto">
            <div className="count-section pe-4 pe-md-5 text-center fw-bold">
              <h4>{myallposts.length}</h4>
              <p>post</p>
            </div>
            <div className="count-section px-4 px-md-5 text-center fw-bold">
              <h4>20</h4>
              <p>Follower</p>
            </div>
            <div className="ps-4 px-md-5 text-center fw-bold">
              <h4>20</h4>
              <p>Following</p>
            </div>
          </div>
          <div className="mx-auto mt-md-0 mt-3">
            <button type="submit" className="custum-btn custum-btn-white me-md-3 shadow-sm">
              <span className='fs-6'>Edit profile</span>
            </button>
            <button type="submit" className="custum-btn custum-btn-white shadow-sm">
              <span className='fs-6' onClick={handlePostShow}>Upload post</span>
            </button>
          </div>

        </div>
      </div>
      <div className="row my-3">
        <div className="col-12">
          <hr />
        </div>
      </div>
      <div className='row mb-4'>
        {myallposts.map((post) => {
          return (
            <div className='col-md-4 col-sm-12' key={post._id}>
              <div className="card" onClick={handleShow}>
                <img onClick={() => showDetail(post)} src={post.image} className="card-img-top" alt={post.description} />
              </div>
            </div>
          )
        })
        }
      </div>
 


      <Modal show={show} onHide={handleClose} size='lg'>
        <Modal.Header closeButton>


        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-md-6">
              <div id="carouselExampleIndicators" className="carousel slide">
                <div className="carousel-indicators">
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                  <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <img src={postDetail.image} className="d-block w-100 img-fluid" alt="..." />
                  </div>
                  {/* <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1lfGVufDB8fDB8fHww" className="d-block w-100" alt="..." />
                  </div>
                  <div className="carousel-item">
                    <img src="https://images.unsplash.com/photo-1580477667995-2b94f01c9516?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fGFuaW1lfGVufDB8fDB8fHww" className="d-block w-100" alt="..." />
                  </div> */}
                </div>
                {/* <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                  <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                  <span className="carousel-control-next-icon" aria-hidden="true"></span>
                  <span className="visually-hidden">Next</span>
                </button> */}
              </div>
            </div>
            <div className="col-md-6">

              <div className='row'>
                <div className='col-6 d-flex'>
                  <img className='p-2 profile-pic' src="https://images.unsplash.com/photo-1551582045-6ec9c11d8697?q=80&w=1965&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="profile" />
                  <div className="mt-2">
                    <p className='fs-6 fw-bold'>{postDetail.location}</p>
                    <p className='location'>{postDetail.description}</p>
                  </div>
                </div>
                <div className='col-6'>
                  <div class="dropdown float-end mt-2">
                    <button class="btn " type="button" data-bs-toggle="dropdown" >
                      <span > <i className="fa-solid fa-ellipsis float-end"></i></span>

                    </button>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" href="#">
                        <i className="fa-solid fa-pen-to-square px-2"></i>
                        Edit Post
                      </a></li>
                      <li><a class="dropdown-item"  onClick={() => deletePost(postDetail._id)} href="#">
                        <i className="fa-solid fa-trash px-2"></i>
                        Delete Post
                      </a></li>

                    </ul>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-12">
                  <div className="">
                    <p className='text-muted fs-10 ps-2'>2 Houres</p>
                  </div>
                </div>
              </div>


              <div className="row">
                <div className="col-12 ms-2">
                  <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi tenetur eaqul</p>
                </div>
              </div>

              <div className='row mt-2'>
                <div className='col-6 d-flex '>
                  <i className="fs-5 ps-2 fa-regular fa-heart"></i>
                  <i className="fs-5 ps-2 fa-regular fa-comment"></i>
                  <i className="fs-5 ps-2 fa-solid fa-location-arrow"></i>
                </div>
                <div className='col-12 mt-3 ms-2'>
                  <span className=' fs-6 fw-bold  '>220 Likes</span>

                </div>
              </div>


            </div>
          </div>
        </Modal.Body>

      </Modal>


      <Modal show={showPost} onHide={handlePostClose} size='lg' centered>
        <Modal.Header closeButton>
          <span className='fw-bold fs-6'>Upload Post</span>


        </Modal.Header>
        <Modal.Body>
             <div className='row'>
            <div className='col-md-6 col-sm-12 mb-3'>
            <div className='upload-box'>
                <div className="dropZoneContainer">
                  <input name="file" type="file" id="drop_zone" className="FileUpload" accept=".jpg,.png,.gif" onChange={handleFileSelect} />
                  <div className="dropZoneOverlay">
                    {image.preview && <img src={image.preview} width='150' height='150' />}
                    <i class="fa-solid fa-cloud-arrow-up fs-1"></i><br />Upload Photo From Computer</div>
                </div>
              </div>
            </div>
            <div className='col-md-6 col-sm-12 d-flex flex-column justify-content-between'>
              <div className='row'>
                <div className='col-sm-12 mb-3'>
                  <div className="form-floating">
                    <textarea onChange={(ev) => setCaption(ev.target.value)}  className="form-control" placeholder="Add Caption" id="floatingTextarea"></textarea>
                    <label for="floatingTextarea">Add Caption</label>
                  </div>
                </div>
                <div className='col-sm-12'>
                  <div className="form-floating mb-3">
                    <input type="text"  onChange={(ev) => setLocation(ev.target.value)} className="form-control" id="floatingInput" placeholder="Add Location" />
                    <label for="floatingInput"><i className="fa-solid fa-location-pin pe-2"></i>Add Location</label>
                  </div>
                </div>
              </div>
              <div className='row'>
                <div className='col-sm-12'>
                { loading ? <div className='col-md-12 mt-3 text-center'>
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div> : ''} 
                  <button  onClick={() => addPost()} className="custum-btn-pink custum-btn float-end">
                    <span className='fs-6 fw-600'>Post</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          
        </Modal.Body>

      </Modal>

    </div>
  )
}

export default Profile
