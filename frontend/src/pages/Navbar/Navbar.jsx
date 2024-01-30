import "./navbar.css"


const Navbar = () => {
    return (
        
        <nav className="nav">
            <a className ="navTitle" href ="/">Acebook</a>
            <ul className="navLinks">
                <li>
                    <a href = "/posts">Home</a>
                </li>
                <li>
                    <a href="/posts">Posts</a>
                </li>
                <li>
                    {/* will route once we have a profile page */}
                    <a href="">Profile</a>
                </li>
            </ul>
        </nav> 
    )
}

export default Navbar