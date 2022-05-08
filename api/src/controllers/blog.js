import { saveBlog, getAllItems } from "../model/Blog.js";

const createBlog = async (id, username, title, content) => {
    try {
        await saveBlog(id, username, title, content);
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