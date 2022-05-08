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
    } catch (error) {
        console.log(error);
    }

}

export { createNewBlog };