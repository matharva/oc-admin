import React, { useState } from "react";
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
      (x) => x.teamCode.includes(text) === true
    );
    console.log(text, filteredText);
    setTeam(filteredText);
  }

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
                  setModalComponent(AddTeamModal);
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

const BigTable = ({ setModalComponent, setIsOpen, teamData, setTeamData }) => {
  const [team, setTeam] = useState(teamData);

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
            <BigTableRow teamData={item} />
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default BigTable;
