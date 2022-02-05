import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormGroup,
  Input,
  Row,
  Table,
  UncontrolledDropdown,
} from "reactstrap";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { eventServices } from "services/eventServices";

const BigTableHeader = ({
  setIsOpen,
  setModalComponent,
  teamData,
  setTeam,
}) => {
  const [searchText, setSearchText] = useState("");

  function filterBySearchText(e) {
    const text = e.target.value;
    setSearchText(text);

    const filteredText = teamData.filter((x) => {
      console.log("The members are: ", x.member[0].email);
      if (x?.member[0]?.email?.toLowerCase().includes(text.toLowerCase())) {
        return x;
      }
    });
    console.log(text, filteredText);
    setTeam(filteredText);
  }

  // console.log("Team Data in big table: ", teamData);

  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xl={3}>
            <div className="col">
              <h3 className="mb-0">Registrations</h3>
            </div>
          </Col>
          <Col xl={5}>
            <Input
              placeholder="Search by Email"
              type="text"
              value={searchText}
              onChange={(e) => filterBySearchText(e)}
            />
          </Col>
          <Col xl={4}>
            <div className="col text-right">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => {
                  e.preventDefault();
                  setModalComponent("AddTeamModal");
                  setIsOpen(true);
                }}
                size="sm"
              >
                Add Users
              </Button>
            </div>
          </Col>
        </Row>
      </CardHeader>
    </>
  );
};

const BigTableRow = ({
  teamData,
  setCurrentTeam,
  allTeamData,
  setModalComponent,
  deleteTeampopup,
  isVoting,
  setPaymentUpdate,
  singleModalEditPopup
}) => {
  const {
    TeamCode: teamCode,
    maxMembers: memberCount,
    TeamName: TeamName,
    amount,
    member,
    isComplete,
    voteCount,
    paymentStatus,
    slotTime
  } = teamData;
  console.log("team data in big table: ", teamData, isComplete, member);

  function handleCurrentTeam() {
    const currTeam = allTeamData.filter((x) => x.TeamCode === teamCode);
    // console.log("Current Team in big table", currTeam, allTeamData);
    setCurrentTeam(currTeam[0]);
  }

  async function handleDelete() {
    const data = {
      teamCode,
      member:member[0]?.email
    };
    console.log("Data for delete team: ", data);

    // setModalComponent("Deletepopup");
    deleteTeampopup(data);
    // await eventServices.removeTeam(data);
  }

  async function handleEdit() {
    const data = {
      teamCode,
      member:member[0]?.email
    };
    console.log("Data for delete team: ", data);

    // setModalComponent("Deletepopup");
    singleModalEditPopup(teamData);
    // await eventServices.removeTeam(data);
  }

  return (
    <>
      <tr onClick={handleCurrentTeam} key={teamCode}>
        <th>{member[0]?.email}</th>
        <th>{member[0]?.name}</th>
        <th scope="row">{member[0]?.phoneNumber}</th>
        <td>{amount}</td>
        <td>
          {/* {isComplete ? (
            <Badge color="" className="badge-dot">
              <i className="bg-success" />
              completed
            </Badge>
          ) : (
            <Badge color="" className="badge-dot mr-4">
              <i className="bg-warning" />
              pending
            </Badge>
          )} */}
          {teamData?.paymentStatus ? (
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
        {isVoting ? <td>{voteCount}</td> : null}
        <td>
          <Button
            color="secondary"
            href="#pablo"
            onClick={async (e) => {
              e.preventDefault();
              setPaymentUpdate(teamCode, paymentStatus);
            }}
            size="sm"
            style={{
              backgroundColor: paymentStatus ? "lightgreen" : "red",
              color: "white",
            }}
            // backgroundColor="green"
            // type="toggle"
            // width="100px"
          >
            Payment
          </Button>
        </td>
        <td>
          {slotTime.length?slotTime:"- - "}
        </td>
        <td>
          <EditIcon onClick={handleEdit} />
        </td>
        <td>
          <DeleteIcon onClick={handleDelete} />
        </td>
      </tr>
    </>
  );
};

const BigTableSingle = ({
  setModalComponent,
  setIsOpen,
  teamData,
  setTeamData,
  setCurrentTeam,
  addTeamUpdate,
  deleteTeampopup,
  isVoting,
  setPaymentUpdate,
  singleModalEditPopup
}) => {
  const [team, setTeam] = useState(teamData);
  console.log("team from big table: ", teamData, isVoting);

  function filterByPending() {
    console.log(team);
    const pending = teamData.filter(
      (x) => x.paymentStatus == (false || undefined)
    );
    console.log(pending);
    setTeam(pending);
  }

  function filterByCompleted() {
    const complete = teamData.filter((x) => x?.paymentStatus === true);
    setTeam(complete);
  }

  useEffect(() => {
    setTeam(teamData);
  }, [teamData]);

  return (
    <div>
      <BigTableHeader
        setIsOpen={setIsOpen}
        setModalComponent={setModalComponent}
        setTeam={setTeam}
        teamData={teamData}
      />
      <Table
        className="align-items-center table-flush"
        responsive
        style={{ minHeight: "10rem" }}
      >
        <thead className="thead-light">
          <tr>
            <th scope="col">Email</th>
            <th scope="col">Name</th>
            <th scope="col">PhoneNumber</th>
            <th scope="col">Amount paid</th>
            <th scope="col">
              Status
              <UncontrolledDropdown>
                <DropdownToggle
                  className="btn-icon-only text-light"
                  role="button"
                  size="sm"
                  color=""
                >
                  <i className="fas fa-ellipsis-v" />
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-arrow" right>
                  <DropdownItem href="#pablo" onClick={() => setTeam(teamData)}>
                    View All
                  </DropdownItem>
                  <DropdownItem onClick={filterByPending}>Pending</DropdownItem>
                  <DropdownItem onClick={filterByCompleted}>
                    Completed
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </th>
            {isVoting ? <th scope="col">Vote Count</th> : null}
            <th scope="col">Payment</th>
            <th scope="col">Slot</th>
            <th scope="col">Edit</th>
            <th scope="col">Count: {team.length}</th>
          </tr>
        </thead>
        <tbody>
          {team.map((item) => (
            <BigTableRow
              key={item.TeamCode}
              teamData={item}
              setCurrentTeam={setCurrentTeam}
              allTeamData={teamData}
              setModalComponent={setModalComponent}
              deleteTeampopup={deleteTeampopup}
              isVoting={isVoting}
              setPaymentUpdate={setPaymentUpdate}
              singleModalEditPopup={singleModalEditPopup}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BigTableSingle;
