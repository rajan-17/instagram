const express = require ("express");
const router = express.Router();
const mongoose = require ("mongoose");
const PostModel = mongoose.model ("PostModel");
const protectedRoute = require ("../middleware/protectionResource");

// all users posts

router.get("/allposts", (req,res)=> {
    PostModel.find()
    .populate("author", "_id fullname  profileImg")
    .populate("comment.commentedBy" ,"_id fullname ")
    .then((dbPosts)=>{
        res.status(200).json({post : dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
});
// single users posts

router.get("/myallposts", protectedRoute ,(req,res)=> {
    PostModel.find({author : req.user._id})
    .populate("author", "_id fullname  profileImg")
    .then((dbPosts)=>{
        res.status(200).json({post : dbPosts})
    })
    .catch((error)=>{
        console.log(error);
    })
});

router.post("/createpost",protectedRoute, (req ,res) => {
    const { description, location , image} = req.body;
    if(!description || !location || !image ){
        return res.status(400).json({ errro : "One or more madatory fileds are empty"});

    }
    const postObj = new PostModel({description : description ,location: location ,image : image ,author: req.user});
    postObj.save()
    .then((newPost)=>{
        res.status(201).json({post: newPost});
    })

    .catch((errro)=>{
        console.log(error);
    })

});

router.delete("/deletepost/:postId", protectedRoute, (req, res) => {
    PostModel.findOne({ _id: req.params.postId })
        .populate("author", "_id")
        .then((postFound) => {
           
            //check if the post author is same as loggedin user only then allow deletion
            if (postFound.author._id.toString() === req.user._id.toString()) {
                postFound.deleteOne()
                    .then((data) => {
                        res.status(200).json({ result: data });
                    })
                    .catch((error) => {
                        console.log(error);
                    })
            }
        })
});


router.put("/like", protectedRoute, (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
        $push: { likes: req.user._id }
    }, {
        new: true //returns updated record
    }).populate("author", "_id fulname")
        .then((result) => {
            if (result) {
                res.json(result);
            } 
        })
        .catch((error)=>{
            console.log(error);
        })
});
router.put("/unlike", protectedRoute, (req, res) => {
    PostModel.findByIdAndUpdate(req.body.postId, {
        $pull: { likes: req.user._id }
    }, {
        new: true //returns updated record
    }).populate("author", "_id ,fullname")
        .then((result) => {
            if (result) {
                res.json(result);
            } 
        })
        .catch((error)=>{
            console.log(error);
        })
});


router.put("/comment", protectedRoute, (req, res) => {

    const comment = {commentText : req.body.commentText, commentedBy: req.user._id}

    PostModel.findByIdAndUpdate(req.body.postId, {
        $push: { comment: comment }
    }, {
        new: true //returns updated record
    })
    .populate("comment.commentedBy", "_id fullName")
    .populate("author", "_id fullname")
        .then((result) => {
            if (result) {
                res.json(result);
            } 
        })
        .catch((error)=>{
            console.log(error);
        })
});


module.exports = router;
