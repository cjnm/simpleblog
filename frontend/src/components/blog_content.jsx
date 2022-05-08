import { Routes, Route } from 'react-router-dom'
import Blogs from '../pages/Blogs'
import Blog from '../pages/Blog'
import CreateBlog from '../pages/CreateBlog'

export default function BlogContent(props) {
    if (!props.user) {
        return (
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="*" element={<Blogs />} />
            </Routes>
        );
    } else {
        return (
            <Routes>
                <Route path="/" element={<Blogs />} />
                <Route path="/create" exact element={<CreateBlog />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="*" element={<Blogs />} />
            </Routes>
        );
    }

}
