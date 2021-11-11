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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  NavItem,
  NavLink,
  Nav,
  Progress,
  Table,
  Container,
  Row,
  Col,
  Badge,
  FormGroup,
  Input,
  Form,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownItem,
  DropdownMenu,
} from "reactstrap";

import Modal from "react-modal";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import DeleteIcon from "@mui/icons-material/Delete";

const BigTableHeader = ({ setIsOpen, setModalComponent }) => {
  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Teams</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setModalComponent(AddTeamModal);
                setIsOpen(true);
              }}
              size="sm"
            >
              Add Teams
            </Button>
          </div>
        </Row>
      </CardHeader>
    </>
  );
};

const AddTeamModal = () => {
  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Save
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            {/* <div className="pl-lg-4"> */}
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-email">
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="user@gmail.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Phone Number
                  </label>
                  <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Contact Number"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* </div> */}
            <hr className="my-4" />
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const AddTeamMember = () => {
  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team member</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Save
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            {/* <div className="pl-lg-4"> */}
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-email">
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="user@gmail.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Phone Number
                  </label>
                  <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Contact Number"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* </div> */}
            <hr className="my-4" />
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const SmallTableHeader = ({ setModalComponent, setIsOpen }) => {
  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <div className="col">
            <h3 className="mb-0">Team</h3>
          </div>
          <div className="col text-right">
            <Button
              color="primary"
              href="#pablo"
              onClick={(e) => {
                e.preventDefault();
                setModalComponent(AddTeamMember);
                setIsOpen(true);
              }}
              size="sm"
            >
              Add Member
            </Button>
            <Button
              color="secondary"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Start Voting
            </Button>
          </div>
        </Row>
      </CardHeader>
    </>
  );
};

const BigTableRow = ({ teamData }) => {
  const { teamCode, memberCount, amount, members } = teamData;

  return (
    <>
      <tr>
        <th scope="row">{teamCode}</th>
        <td>{memberCount}</td>
        <td>{amount}</td>
        <td>
          {members.length === memberCount ? (
            <Badge color="" className="badge-dot">
              <i className="bg-success" />
              completed
            </Badge>
          ) : (
            <Badge color="" className="badge-dot mr-4">
              <i className="bg-warning" />
              pending
            </Badge>
          )}
        </td>
        <td>
          <DeleteIcon />
        </td>
      </tr>
    </>
  );
};

const UserInfo = () => {
  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team member</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Save
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">User information</h6>
            {/* <div className="pl-lg-4"> */}
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label className="form-control-label" htmlFor="input-email">
                    Email address
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-email"
                    placeholder="user@gmail.com"
                    type="email"
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Phone Number
                  </label>
                  <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Contact Number"
                    type="text"
                  />
                </FormGroup>
              </Col>
            </Row>
            {/* </div> */}
            <hr className="my-4" />
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const SmallTableRow = ({ userData, setModalComponent, setIsOpen }) => {
  const {
    name = "User",
    email = "user@usergmail.com",
    number = "1234567890",
  } = userData;
  return (
    <>
      <tr
        onClick={(e) => {
          e.preventDefault();
          setModalComponent(UserInfo);
          setIsOpen(true);
        }}
      >
        <th scope="row">{name}</th>
        <td>{email}</td>
        <td>{number}</td>
        <td>
          <DeleteIcon />
        </td>
      </tr>
    </>
  );
};
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    transform: "translate(-50%, -50%)",
    // height: "60vh",
    // width: "70vw",
  },
};
const ModalComponent = ({ isOpen, setIsOpen, modalComponent }) => {
  console.log(modalComponent);
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      {modalComponent}
    </Modal>
  );
};

const TEAMDATA = [
  {
    teamCode: "od;ahgfodpsgfhadsgf;h",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "od;ahgfodpsgfhadsgf;h",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "od;ahgfodpsgfhadsgf;h",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "od;ahgfodpsgfhadsgf;h",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
];

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [isOpen, setIsOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);

  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }

  const toggleNavs = (e, index) => {
    e.preventDefault();
    setActiveNav(index);
    setChartExample1Data("data" + index);
  };
  return (
    <>
      <Header />
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalComponent={modalComponent}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <BigTableHeader
                setIsOpen={setIsOpen}
                setModalComponent={setModalComponent}
              />
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Team Code</th>
                    <th scope="col">Member Count</th>
                    <th scope="col">Amount paid</th>
                    <th scope="col">
                      Status
                      <UncontrolledDropdown>
                        <DropdownToggle
                          className="btn-icon-only text-light"
                          href="#pablo"
                          role="button"
                          size="sm"
                          color=""
                          onClick={(e) => e.preventDefault()}
                        >
                          <i className="fas fa-ellipsis-v" />
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-arrow" right>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            View All
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Pending
                          </DropdownItem>
                          <DropdownItem
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                          >
                            Completed
                          </DropdownItem>
                        </DropdownMenu>
                      </UncontrolledDropdown>
                    </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {TEAMDATA.map((item) => (
                    <BigTableRow teamData={item} />
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="5">
            <Card className="shadow">
              <SmallTableHeader
                setIsOpen={setIsOpen}
                setModalComponent={setModalComponent}
              />
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col"> Number </th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  {TEAMDATA[0].members.map((item) => (
                    <SmallTableRow
                      setIsOpen={setIsOpen}
                      setModalComponent={setModalComponent}
                      userData={item}
                    />
                  ))}
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
