import { Link } from 'react-router-dom';
import { Link as NextLink } from "@nextui-org/react";


export default function NavBar(props) {

    if (!props.user) {
        return (
            <ul>
                <li><NextLink onClick={props.handleLogin}>Login</NextLink></li>
            </ul>
        )
    } else {
        return (
            <ul>
                <li><Link to="/">Blogs</Link></li>
                <li><Link to="/create">New Blog</Link></li>
                <li><Link to="/">My Blogs</Link></li>
                <li><NextLink onClick={props.handleLogout}>Logout</NextLink></li>
            </ul>
        );
    }
}
