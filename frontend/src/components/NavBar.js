import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={{ margin: 10 }}>
            <Link to="/" style={{ padding: 5 }}>Home</Link>
            <Link to="/login" style={{ padding: 5 }}>Login</Link>
            <Link to="/dashboard" style={{ padding: 5}}>Dashboard</Link>
      </nav>
    )
}

export default NavBar;