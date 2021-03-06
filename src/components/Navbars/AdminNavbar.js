/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import { useAuth } from "context/AuthContext";
import { Link, useHistory } from "react-router-dom";
// reactstrap components
import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Form,
  FormGroup,
  InputGroupAddon,
  InputGroupText,
  Input,
  InputGroup,
  Navbar,
  Nav,
  Container,
  Media,
} from "reactstrap";
import { setToken } from "services/helpers";

const AdminNavbar = (props) => {
  const { logout } = useAuth();
  const history = useHistory();
  async function handleLogout() {
    await logout();
    setToken("user", null);

    history.push("/auth/login");
  }

  return (
    <>
      <Navbar className="navbar-top navbar-dark" expand="md" id="navbar-main">
        <Container fluid>
          <Link
            className="h4 mb-0 text-white text-uppercase d-none d-lg-inline-block"
            to="/"
          >
            {props.brandText}
          </Link>

          <Nav className="align-items-center d-none d-md-flex" navbar>
            {/* <DropdownToggle className="pr-0" nav> */}
            <Media
              className="align-items-center"
              style={{ cursor: "pointer" }}
              onClick={handleLogout}
            >
              <span className="avatar avatar-sm rounded-circle bg-red">
                <i className="ni ni-user-run " />
              </span>
              <Media className="ml-2 d-none d-lg-block">
                <span className="mb-0 text-sm font-weight-bold text-white">
                  Logout
                </span>
              </Media>
            </Media>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default AdminNavbar;
