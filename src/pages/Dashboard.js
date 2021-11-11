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

const BigTableHeader = ({ setIsOpen }) => {
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

const SmallTableHeader = () => {
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
              onClick={(e) => e.preventDefault()}
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

const BigTableRow = () => {
  return (
    <>
      <tr>
        <th scope="row">/argon/</th>
        <td>4,569</td>
        <td>340</td>
        <td>
          <Badge color="" className="badge-dot mr-4">
            <i className="bg-warning" />
            pending
          </Badge>
        </td>
        <td>
          <DeleteIcon />
        </td>
      </tr>
    </>
  );
};

const SmallTableRow = ({ name = "User", email = "user@usergmail.com" }) => {
  return (
    <>
      <tr>
        <th scope="row">{name}</th>
        <td>{email}</td>
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
    height: "60vh",
    width: "70vw",
  },
};
const ModalComponent = ({ isOpen, setIsOpen, component }) => {
  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      <h1>vnlkdf;asgnl;</h1>
    </Modal>
  );
};

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [isOpen, setIsOpen] = useState(false);

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
      <ModalComponent isOpen={isOpen} setIsOpen={setIsOpen} />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="8">
            <Card className="shadow">
              <BigTableHeader setIsOpen={setIsOpen} />
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Team Code</th>
                    <th scope="col">Member Count</th>
                    <th scope="col">Amount paid</th>
                    <th scope="col">Status</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <BigTableRow />
                  <BigTableRow />
                  <BigTableRow />
                  <BigTableRow />
                </tbody>
              </Table>
            </Card>
          </Col>
          <Col xl="4">
            <Card className="shadow">
              <SmallTableHeader />
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col" />
                  </tr>
                </thead>
                <tbody>
                  <SmallTableRow />
                  <SmallTableRow />
                  <SmallTableRow />
                  <SmallTableRow />
                  <SmallTableRow />
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
