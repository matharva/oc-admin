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
  ButtonToggle,
} from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import { eventServices } from "services/eventServices";
import { getEventName } from "services/helpers";

const SmallTableHeader = ({
  setModalComponent,
  setIsOpen,
  teamName,
  teamCode,
  payment,
  setPaymentUpdate,
}) => {
  console.log("The status is: ", teamName, teamCode, payment);
  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col lg={4}>
            <h5 className="mb-0">{teamName}</h5>
          </Col>
          <Col lg={8}>
            <div className="col d-flex justify-content-end">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setModalComponent("EditTeam");
                  setIsOpen(true);
                }}
                size="sm"
              >
                Edit
              </Button>
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
              {/* <span style={{ fontSize: "0.8rem" }}>Payment:</span> */}
              <Button
                color="secondary"
                href="#pablo"
                onClick={async (e) => {
                  e.preventDefault();
                  setPaymentUpdate(teamCode, payment);
                }}
                size="sm"
                style={{
                  backgroundColor: payment ? "lightgreen" : "red",
                  color: "white",
                }}
                // backgroundColor="green"
                // type="toggle"
                // width="100px"
              >
                Payment
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
  deleteMemberpopup,
}) => {
  const {
    name = "User",
    email = "user@usergmail.com",
    phoneNumber = "1234567890",
    uid,
  } = userData;
  // console.log("userdata in small table: ", userData);

  async function handleDelete() {
    const data = {
      email,
      teamCode,
      eventName: getEventName(),
    };
    console.log("Delete data: ", data);
    deleteMemberpopup(data);
    // await eventServices.removeMemberFromTeam(data);
  }

  return (
    <tr
      key={uid}
      // onClick={(e) => {
      //   e.preventDefault();
      //   setModalComponent("UserInfo");
      //   setSelected(uid);
      //   setIsOpen(true);
      // }}
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
  setPaymentUpdate,
  deleteMemberpopup,
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
        teamName={currTeam?.TeamName}
        teamCode={currTeam?.TeamCode}
        payment={currTeam?.paymentStatus}
        setPaymentUpdate={setPaymentUpdate}
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
          {currTeam?.member?.length > 0
            ? currTeam.member.map((item) => (
                <SmallTableRow
                  key={item.uid}
                  setIsOpen={setIsOpen}
                  setModalComponent={setModalComponent}
                  userData={item}
                  setSelected={setSelected}
                  teamCode={currTeam.TeamCode}
                  deleteMemberpopup={deleteMemberpopup}
                />
              ))
            : null}
        </tbody>
      </Table>
    </div>
  );
};

export default SmallTable;
