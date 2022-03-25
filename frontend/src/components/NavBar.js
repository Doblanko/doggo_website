import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav style={{ margin: 10 }}>
            <NavLink to="/" style={{ padding: 5 }}>Home</NavLink>
            <NavLink to="/login" style={{ padding: 5 }}>Login</NavLink>
            <NavLink to="/dashboard" style={{ padding: 5}}>Dashboard</NavLink>
      </nav>
    )
}

export default NavBar;