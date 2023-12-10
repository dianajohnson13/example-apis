import { Nav, Navbar, Container } from "react-bootstrap";
import { logout } from "../api/Auth";

export default function Header({isLoggedIn}) {
    const handleLogout = () => {
      logout()
        .catch(error => {
          console.log(error)
        })
    }

    return (
      <Navbar collapseOnSelect expand="lg" className="bg-dark navbar navbar-expand navbar-dark">
          <Container>
            <Navbar.Brand href="/">Taskerly</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="navbar-nav ms-auto">
                {isLoggedIn && (
                  <>
                    <Nav.Link href="/settings">Settings</Nav.Link>
                    <Nav.Link href="/login" onClick={handleLogout}>Logout</Nav.Link>
                  </>

                )}
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
    );
}