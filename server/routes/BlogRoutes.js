const express = require("express");
const passport = require("passport"); 

// const {
//     getAllBlogs,
//     createBlog,
//     getBlogById,
//     updateBlog,
//     deleteBlog,
// } = require("../controllers/BlogController");

const router = express.Router();
const BlogModel = require('../models/Blog');

router.post(
    "/create",
    passport.authenticate("jwt", { session: false }),
    async (req, res) => {
        const { title, body, tags } = req.body;
        if (!title || !body || !tags) {
            return res
                .status(301)
                .json({ err: "Insufficient details to create blog." });
        }
        const user = req.user._id;
        const blogdetails = { title, body, tags, user };
        const createblog = await BlogModel.create(blogdetails);
        return res.status(200).json(createblog);
    }
);

router.get(
    "/",
    async (req, res) => {
        const data = await  BlogModel.find();
        console.log(data);
        return res.status(200).json(data);
    }
);

router.get(
    "/:id",
    async (req, res) => {
        const { id } = req.params; 
        try {
            const data = await BlogModel.findById(id); 
            console.log(data);
            return res.status(200).json(data);
        } catch (error) {
            console.error("Error fetching blog:", error);
            return res.status(500).json({ error: "Error fetching blog" });
        }
    }
);

router.post("/:id/upvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;

        if (blog.upvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this blog', exist:"user" });
        }
        blog.upvote.push(user);
        await blog.save();
       // console.log("blog updated : ", blog);

        res.json({  msg: 'blog upvoted successfully', blog: blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.get("/:id/getvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 
    try {
        const blog = await BlogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;
        //console.log("getvote");
        if (blog.upvote.includes(user) || blog.downvote.includes(user)) {
            return res.json({  msg: 'User already voted', exist:"user" });
        }else{
            //console.log("enter");
            return res.json({msg:'user can proceed'});
        }
       
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


router.post("/:id/downvote", passport.authenticate("jwt", { session: false }),
async (req, res) => {
    const { id } = req.params; 

    try {
        const blog = await BlogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ msg: 'blog not found' });
        }
        const user = req.user._id;

        if (blog.downvote.includes(user)) {
            return res.status(400).json({ msg: 'You have already upvoted this blog', exist:"user" });
        }
        blog.downvote.push(user);
        await blog.save();
       console.log("blog updated : ", blog);

        res.json({  msg: 'blog upvoted successfully', blog: blog });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// router.route("/").get(getAllBlogs).post(createBlog);
// router.route("/:id").get(getBlogById).put(updateBlog).delete(deleteBlog);

module.exports = router;