import express from 'express';
const blogRouter = express.Router();
import { auth } from '../middleware/auth.js';

import { createBlog, getAllBlogs, getAllBlogsByUser, deleteBlogById, updateBlog } from '../controllers/blog.js';

// Create a blog
blogRouter.post('/new', auth, async (req, res) => {

    const { id, username, avatar_url } = req;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(401).json({ success: false, status: 401, message: 'Cannot save empty contents.' });
    }

    const response = await createBlog(id, username, title, content, avatar_url);

    if (response.success) {
        res.status(200).json({ ...response, status: 200 });
    } else {
        res.status(401).json({ ...response, status: 401 });
    }
})

// Get all blogs by user
blogRouter.get('/user/:user_id', auth, async (req, res) => {
    const { user_id } = req.params;

    if (parseInt(user_id) !== req.id) {
        return res.status(401).json({ success: false, status: 401, message: "Unauthorized" });
    }

    let response = await getAllBlogsByUser(req.id);

    if (response.success) {
        return res.status(200).json({ ...response, status: 200 });
    } else {
        return res.status(401).json({ ...response, status: 401 });
    }
})

// Delete a blog by id
blogRouter.delete('/:blog_id', auth, async (req, res) => {
    const { blog_id } = req.params;
    const { id: user_id } = req;

    let response = await deleteBlogById(blog_id, user_id);

    if (response.success) {
        return res.status(200).json({ ...response, status: 200 });
    } else {
        return res.status(401).json({ ...response, status: 401 });
    }
})

// Update a blog by id
blogRouter.put('/:blog_id', auth, async (req, res) => {
    const { blog_id } = req.params;
    const { id: user_id } = req;
    const { title, content } = req.body;

    if (!title || !content) {
        return res.status(401).json({ success: false, status: 401, message: 'Cannot update blog with empty contents.' });
    }

    let response = await updateBlog(title, content, blog_id, user_id);

    if (response.success) {
        return res.status(200).json({ ...response, status: 200 });
    } else {
        return res.status(401).json({ ...response, status: 401 });
    }
})

// Get all blogs
blogRouter.get('/', async (req, res) => {

    let response = await getAllBlogs();

    if (response.success) {
        res.status(200).json({ ...response, status: 200 });
    } else {
        res.status(401).json({ ...response, status: 401 });
    }
})

export default blogRouter;