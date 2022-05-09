import { saveBlog, getAllItems, getAllItemsByUser, deleteItemById, updateItem } from "../model/Blog.js";

const createBlog = async (id, username, title, content, avatar_url) => {
    try {
        await saveBlog(id, username, title, content, avatar_url);
        return { success: true };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Cannot save blog' };
    }
}

const getAllBlogs = async () => {
    try {
        const response = await getAllItems();
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Cannot get blogs' };
    }
}

const getAllBlogsByUser = async (user_id) => {
    try {
        const response = await getAllItemsByUser(user_id);
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Cannot get blogs' };
    }
}

const deleteBlogById = async (blog_id, user_id) => {
    try {
        const response = await deleteItemById(blog_id, user_id);
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Cannot delete blog' };
    }
}

const updateBlog = async (title, content, blog_id, user_id) => {
    try {
        const response = await updateItem(title, content, blog_id, user_id);
        return { success: true, data: response };
    } catch (error) {
        console.log(error);
        return { success: false, message: 'Cannot delete blog' };
    }
}

export { createBlog, getAllBlogs, getAllBlogsByUser, deleteBlogById, updateBlog };