import axios from 'axios';
import { buildAuthHeaders } from '../auth.js';

const createNewBlog = async (title, content) => {
    const headers = buildAuthHeaders();
    try {
        const response = await axios.post(
            `${process.env.REACT_APP_API_URL}/blog/new`,
            { title, content },
            headers
        )

        return response.data;
    } catch (error) {
        console.log(error);
    }

}

const getAllBlogs = async () => {
    try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/blog`,
        )

        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }

}

export { createNewBlog, getAllBlogs };