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
                  setModalComponent("AddTeamMember");
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
          setModalComponent("UserInfo");
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
