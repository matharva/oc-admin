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

    const filteredText = teamData.filter(
      (x) => x.TeamCode.toLowerCase().includes(text) === true
    );
    console.log(text, filteredText);
    setTeam(filteredText);
  }

  console.log("Team Data in big table: ", teamData);

  return (
    <>
      <CardHeader className="border-0">
        <Row className="align-items-center">
          <Col xl={3}>
            <div className="col">
              <h3 className="mb-0">Teams</h3>
            </div>
          </Col>
          <Col xl={5}>
            <Input
              placeholder="Search by team code"
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
                Add Teams
              </Button>
            </div>
          </Col>
        </Row>
      </CardHeader>
    </>
  );
};

const BigTableRow = ({ teamData, setCurrentTeam, allTeamData }) => {
  const {
    TeamCode: teamCode,
    maxMembers: memberCount,
    amount,
    member: members,
    isComplete,
  } = teamData;

  function handleCurrentTeam() {
    const currTeam = allTeamData.filter((x) => x.TeamCode === teamCode);
    console.log("Current Team in big table", currTeam, allTeamData);
    setCurrentTeam(currTeam[0]);
  }

  return (
    <>
      <tr onClick={handleCurrentTeam}>
        <th scope="row">{teamCode}</th>
        <td>{memberCount}</td>
        <td>{amount}</td>
        <td>
          {isComplete ? (
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

const BigTable = ({
  setModalComponent,
  setIsOpen,
  teamData,
  setTeamData,
  setCurrentTeam,
}) => {
  const [team, setTeam] = useState(teamData);
  console.log("team from big table: ", teamData);

  function filterByPending() {
    console.log(team);
    const pending = teamData.filter((x) => x.isComplete === false);
    console.log(pending);
    setTeam(pending);
  }

  function filterByCompleted() {
    const complete = teamData.filter((x) => x.isComplete === true);
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
            <th scope="col">Team Code</th>
            <th scope="col">Member Count</th>
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
            <th scope="col">Count: {team.length}</th>
          </tr>
        </thead>
        <tbody>
          {team.map((item) => (
            <BigTableRow
              teamData={item}
              setCurrentTeam={setCurrentTeam}
              allTeamData={teamData}
            />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BigTable;
