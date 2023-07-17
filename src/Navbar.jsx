import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './css/Navbar.css';

function Navibar() {
  //react-bootstrap readability is terrible
  return (
    <Navbar collapseOnSelect expand="lg" className="navbar" fixed ="top" data-bs-theme="dark">
      <Container className="navcontainer">
        <img src = "images/assets/2logo.png" id = "logo" />
        <Navbar.Brand href="#home" id = "headername">cafebara</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            {/* leave empty to get the next section to the right */}
          </Nav>
          <Nav>
            <Nav.Link href="/home" className = {(location.pathname === '/' || location.pathname === '/home') ? 'active' : 'inactive'}>home</Nav.Link>
            <Nav.Link href="/about" className = {(location.pathname ==='/about') ? 'active' : 'inactive'}>about</Nav.Link>
            <Nav.Link href="/review" className = {(location.pathname === '/review') ? 'active' : 'inactive'}>review</Nav.Link>
            {/* ADD THE LOGIN THINGY, TERNARY OPERATOR NEEDED(?) */}
            <NavDropdown title="profile" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">my profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                edit profile
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                log out
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navibar;