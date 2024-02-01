import {Container, Navbar as BootstrapNavbar, Nav} from "react-bootstrap";
import {NavLink} from "react-router-dom";
import NavbarSearch from "../navbarSearch/NavbarSearch";


const Navbar = () => {
    return (
        <BootstrapNavbar sticky={'top'} expand="md" className="bg-body-tertiary rounded">
            <Container>
                <BootstrapNavbar.Brand
                    className={'col-6 col-md-4 offset-lg-1 col-lg-3 offset-xl-0 offset-xxl-1 col-xl-3 '}
                >
                    <NavbarSearch />
                </BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />

                <BootstrapNavbar.Collapse
                    id="basic-navbar-nav"
                    className={'col-md-5 col-lg-6 offset-xl-1 col-xl-8 offset-xxl-0 col-xxl-7'}
                >
                    <Nav className={'justify-content-md-around w-100'}>
                        <Nav.Link
                            as={NavLink}
                            to={'/'}
                        >
                            Home
                        </Nav.Link>

                        <Nav.Link
                            as={NavLink}
                            to={'/recipe-by-ingredients'}
                        >
                            Recipe by ingredients
                        </Nav.Link>
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    )
}

export default Navbar;