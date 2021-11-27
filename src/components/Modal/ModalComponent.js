import { useEffect, useState } from "react";
import Modal from "react-modal";
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
} from "reactstrap";
import { eventServices } from "services/eventServices";
import { validatePhoneNumber } from "services/helpers";
import { validateEmail } from "services/helpers";
import DeleteIcon from "@mui/icons-material/Delete";

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

const AddTeamModal = () => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  async function handleSubmit() {
    const data = {
      email,
      phone: contact,
      name,
      eventName: "IPL Auction",
    };
    console.log("data to create team: ", data);
    await eventServices.addTeam(data);
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button color="primary" onClick={handleSubmit} size="sm">
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
                    value={email}
                    style={!isValidEmail ? { border: "red 2px solid" } : {}}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(validateEmail(e.target.value));
                    }}
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
                    type="number"
                    value={contact}
                    style={
                      !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    }
                    onChange={(e) => {
                      setContact(e.target.value);
                      setIsValidPhoneNumber(
                        validatePhoneNumber(e.target.value)
                      );
                    }}
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
                    Team Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Team Name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
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

const UserInfo = ({ currentTeam, selected }) => {
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [currentTeamCode, setCurrentTeamCode] = useState(null);

  async function handleSubmit() {
    const data = {
      email,
      phoneNumber,
    };

    console.log("Data to be updated: ", data);
    // await eventServices.updateUserInfo(data);
  }

  async function handleDelete() {
    const data = {
      email,
      teamCode: currentTeamCode,
      eventName: "IPL Auction",
    };
    console.log("Delete data: ", data);
    await eventServices.removeMemberFromTeam(data);
  }

  useEffect(() => {
    console.log("Current team from modal component: ", currentTeam);
    if (!currentTeam) return;
    const selectedItem = currentTeam.member.filter(
      (x) => x.uid === selected
    )[0];
    setCurrentTeamCode(currentTeam.TeamCode);
    setEmail(selectedItem.email);
    setPhoneNumber(selectedItem.phoneNumber);
    setIsValidEmail(validateEmail(selectedItem.email));
    setIsValidPhoneNumber(validatePhoneNumber(selectedItem.phoneNumber));
    console.log(selectedItem);
  }, []);

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Change data for a player</h3>
            </Col>
            <Col className="text-right" xs="1">
              <Button color="primary" onClick={handleDelete} size="sm">
                Delete
              </Button>
            </Col>
            <Col className="text-right" xs="3">
              <Button color="primary" onClick={handleSubmit} size="sm">
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
                    value={email}
                    style={!isValidEmail ? { border: "red 2px solid" } : {}}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(validateEmail(e.target.value));
                    }}
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
                    value={phoneNumber}
                    style={
                      !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    }
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
                      setIsValidPhoneNumber(
                        validatePhoneNumber(e.target.value)
                      );
                    }}
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

const AddTeamMember = ({ currentTeam }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);

  async function handleSubmit() {
    const data = {
      email,
      contact,
      eventName: "IPL Auction",
      teamCode: currentTeam.TeamCode,
    };

    // console.log("Current Team in modal: ", data);
    await eventServices.addMemberToTeam(data);
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Add team member</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button color="primary" size="sm" onClick={handleSubmit}>
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
                    value={email}
                    style={!isValidEmail ? { border: "red 2px solid" } : {}}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setIsValidEmail(validateEmail(e.target.value));
                    }}
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
                    style={
                      !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    }
                    onChange={(e) => {
                      setContact(e.target.value);
                      setIsValidPhoneNumber(
                        validatePhoneNumber(e.target.value)
                      );
                    }}
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

const ModalComponent = ({
  isOpen,
  setIsOpen,
  modalComponent,
  currentTeam,
  selected,
}) => {
  // console.log(modalComponent);

  // console.log("Current Team in modal component: ", currentTeam);

  function returnComponent(item) {
    if (item === "AddTeamModal") {
      return <AddTeamModal />;
    }
    if (item === "UserInfo") {
      return <UserInfo currentTeam={currentTeam} selected={selected} />;
    }
    if (item === "AddTeamMember") {
      return <AddTeamMember currentTeam={currentTeam} />;
    }
  }

  return (
    <Modal
      style={customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      {returnComponent(modalComponent)}
    </Modal>
  );
};

export default ModalComponent;
