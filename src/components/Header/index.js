import React from 'react'
import { Link } from 'react-router-dom'
class Navbar extends React.Component {
    render() { 
        return (
              <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
                    <a className="navbar-brand" href="#">
                        <img src="https://seofreelancermumbai.in/wp-content/uploads/2017/04/blog-post.jpg"  height="30px" alt="logo"/>
                    </a>                
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to = "/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to = "/addblog">Add Blog</Link>
                        </li>
                    </ul>
                </nav> 
         );
    }
}
 
export default Navbar;