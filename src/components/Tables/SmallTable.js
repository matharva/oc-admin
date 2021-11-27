import React, { useEffect, useState } from "react";
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

const SmallTableRow = ({
  userData,
  setModalComponent,
  setIsOpen,
  setSelected,
  teamCode,
}) => {
  const {
    name = "User",
    email = "user@usergmail.com",
    phoneNumber = "1234567890",
    uid,
  } = userData;
  console.log("userdata in small table: ", userData);

  async function handleDelete() {
    const data = {
      email,
      teamCode,
      eventName: "IPL Auction",
    };
    console.log("Delete data: ", data);
    // await eventServices.removeMemberFromTeam(data);
  }

  return (
    <tr
      key={uid}
      onClick={(e) => {
        e.preventDefault();
        setModalComponent("UserInfo");
        setSelected(uid);
        setIsOpen(true);
      }}
    >
      <th scope="row">{name}</th>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>
        <DeleteIcon onClick={handleDelete} />
      </td>
    </tr>
  );
};

const SmallTable = ({
  setModalComponent,
  setIsOpen,
  currentTeam,
  setSelected,
}) => {
  const [currTeam, setCurrTeam] = useState(null);

  useEffect(() => {
    setCurrTeam(currentTeam);
  }, [currentTeam]);

  // console.log("Current team from small table: ", currentTeam, currTeam);
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
          {currTeam !== null
            ? currTeam.member.map((item) => (
                <SmallTableRow
                  setIsOpen={setIsOpen}
                  setModalComponent={setModalComponent}
                  userData={item}
                  setSelected={setSelected}
                  teamCode={currTeam.TeamCode}
                />
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default SmallTable;
