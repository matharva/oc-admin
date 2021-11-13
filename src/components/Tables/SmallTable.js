import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
} from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";

import { eventServices } from "services/eventServices";

const AddTeamMember = () => {
  // const [email, setEmail] = useState("");
  // const [contact, setContact] = useState("");

  // function handleSubmit() {
  //   const data = {
  //     email,
  //     contact,
  //   };

  //   // await eventServices.kuchTOhFunction();
  // }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team member</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button color="primary" size="sm">
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
                    // value={email}
                    // onChange={(e) => setEmail(e.target.value)}
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
                    id="input-username"
                    placeholder="Contact Number"
                    type="number"
                    // value={contact}
                    // onChange={(e) => setContact(e.target.value)}
                  />
                </FormGroup>
              </Col>
            </Row>
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
          <Col lg={3}>
            <h3 className="mb-0">Team</h3>
          </Col>
          <Col lg={9}>
            <div className="col d-flex justify-content-end">
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
          </Col>
        </Row>
      </CardHeader>
    </>
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

const SmallTable = ({
  setModalComponent,
  setIsOpen,
  currentTeam,
  setCurrentTeam,
}) => {
  return (
    <div>
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
          {currentTeam.members.map((item) => (
            <SmallTableRow
              setIsOpen={setIsOpen}
              setModalComponent={setModalComponent}
              userData={item}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SmallTable;
