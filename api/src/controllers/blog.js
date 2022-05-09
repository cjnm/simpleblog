import { saveBlog, getAllItems } from "../model/Blog.js";

const createBlog = async (id, username, title, content, avatar_url) => {
    try {
        await saveBlog(id, username, title, content, avatar_url);
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Can not save blog' };
    }
}

const getAllBlogs = async () => {
    try {
        const response = await getAllItems();
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Can not get blogs' };
    }
}

export { createBlog, getAllBlogs };