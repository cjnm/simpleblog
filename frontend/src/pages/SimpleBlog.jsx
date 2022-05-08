import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { Grid } from "@nextui-org/react";
import Blogs from './Blogs'
import Blog from './Blog'
import CreateBlog from './CreateBlog'

export default function SimpleBlog() {
    return (
        <Router>
            <Grid.Container justify="center">
                <Grid xs={1}>
                    <ul>
                        <li><Link to="/">Blogs</Link></li>
                        <li><Link to="/create">New Blog</Link></li>
                        <li><Link to="/">My Blogs</Link></li>
                        <li><Link to="">Logout</Link></li>
                    </ul>
                </Grid>
                <Grid xs={11}>
                    <Routes>
                        <Route path="/" element={<Blogs />} />
                        <Route path="/create" exact element={<CreateBlog />} />
                        <Route path="/blog" element={<Blog />} />
                    </Routes>
                </Grid>
            </Grid.Container>
        </Router>
    );
}
