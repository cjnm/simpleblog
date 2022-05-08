import express from 'express';
const blogRouter = express.Router();
import { auth } from '../middleware/auth.js';

import { createBlog, getAllBlogs } from '../controllers/blog.js';

blogRouter.post('/new', auth, async (req, res) => {
    const { id, username } = req;
    const { title, content } = req.body;

    const response = await createBlog(id, username, title, content);

    if (response.success) {
        res.status(200).json({ ...response, status: 200 });
    } else {
        res.status(401).json({ ...response, status: 401 });
    }
})

blogRouter.get('/', async (req, res) => {

    let response = await getAllBlogs();

    if (response.success) {
        res.status(200).json({ ...response, status: 200 });
    } else {
        res.status(401).json({ ...response, status: 401 });
    }
})

export default blogRouter;