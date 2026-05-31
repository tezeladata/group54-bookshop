import { Link } from "react-router"

const Navbar = () => {
    return (
        <section>
            <nav>
                <Link to="/">Home</Link> <br />
                <Link to="/books">Books</Link> <br />
                <Link to="/panel">Panel</Link> <br />
                <Link to="/signUp">Sign Up</Link> <br />
                <Link to="/logIn">Log in</Link> <br />
            </nav>
        </section>
    )
};

export default Navbar;