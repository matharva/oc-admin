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
  Label,
} from "reactstrap";
import { eventServices } from "services/eventServices";
import { validatePhoneNumber } from "services/helpers";
import { validateEmail } from "services/helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import { getEventName } from "services/helpers";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    transform: "translate(-50%, -50%)",
    // height: "90vh",
    // width: "70vw",
  },
};

const AddTeamModal = ({ eventData, addTeamUpdate }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [paymentStatus, setPaymentStatus] = useState(false);
  const [eventFee, setEventFee] = useState(null);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");

  // console.log("The event data is: ", eventData);

  useEffect(async () => {
    const eventName = getEventName();
    const data = await eventServices.getEventDetails(eventName);
    console.log("The eventDetails are: ", data);
    setEventFee(data?.Fee);
    setType(data?.Fee[0].Type);
  }, []);

  async function handleSubmit() {
    // if (!isValidEmail || !name.length || !type) {
    //   return;
    // }
    console.log(
      "The tyep is: ",
      type
      // eventFee.filter((x) => x.Type == type)[0].Fee
    );
    const eventName = getEventName();
    const data = {
      email: email,
      // phone: contact,
      teamName: name,
      eventName: eventName,
      paymentStatus: paymentStatus,
      amount: parseInt(eventFee.filter((x) => x.Type == type)[0].Fee),
      maxMembers: parseInt(
        eventFee.filter((x) => x.Type == type)[0].maxMembers
      ),
    };
    console.log("data to create team: ", data);
    let newTeam = await eventServices.addTeam(data);
    console.log("The new Team is: ", newTeam);
    if (newTeam && newTeam.registrationDetails) {
      setMessage("New team has been added");
      setEmail("");
      setContact("");
      setName("");
      setPaymentStatus(false);
      setType(eventFee[0]?.Type);
      addTeamUpdate(newTeam.registrationDetails.TeamCode);
    } else {
      setMessage(newTeam.Message);
    }
  }

  useEffect(() => {
    console.log("The new update payment status: ", paymentStatus);
  }, [paymentStatus]);

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
            {/* <Row>
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
            </Row> */}
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
            <Row>
              <Col lg="12">
                {/* <FormGroup>
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Type
                  </label>
                  <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Team Name"
                    type="number"
                    value={type}
                    onChange={(e) => setName(e.target.value)}
                  />
                </FormGroup> */}
                <FormGroup isRequired marginBottom={"1.5rem"}>
                  {/* <FormLabel color={"white"}>Payment Type: </FormLabel> */}
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Payment Type:
                  </label>
                  <Input
                    id="paymentType"
                    value={type}
                    type="select"
                    onChange={(e) => {
                      setType(e.target.value);
                    }}
                    color={"white"}
                    // bg={OC_BG_DARK}
                  >
                    {eventFee &&
                      eventFee.map((item) => {
                        return (
                          <>
                            <option
                              value={`${item.Type}`}
                              // color={"black"}
                              style={{ color: "black" }}
                            >{`${item.Type}: ${item.Fee}`}</option>
                          </>
                        );
                      })}

                    {/* <option>Select Team Options</option> */}
                    {/* {details.map((item) => {
                      return (
                        <>
                          <option
                            value={`${item.Type}`}
                            // color={"black"}
                            style={{ color: "black" }}
                          >{`${item.Type}: ${item.Fee}`}</option>
                        </>
                      );
                    })} */}
                    {/* <option
                      value={`Solo`}
                      // color={"black"}
                      style={{ color: "black" }}
                    >{`Solo: ${10}`}</option>
                    <option
                      value={`Solo`}
                      // color={"black"}
                      style={{ color: "black" }}
                    >{`Solo: ${10}`}</option>{" "}
                    <option
                      value={`Solo`}
                      // color={"black"}
                      style={{ color: "black" }}
                    >{`Solo: ${10}`}</option>{" "}
                    <option
                      value={`Solo`}
                      // color={"black"}
                      style={{ color: "black" }}
                    >{`Solo: ${10}`}</option> */}
                    {/* <option>United Arab Emirates</option>
              <option>Nigeria</option> */}
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <FormGroup>
                  <Row>
                    <Col lg="4">
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Payment Status:
                      </label>
                    </Col>
                    <Col>
                      <Input
                        // type="checkbox"
                        // onChange={(e) => console.log(e.target.value)}
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-username"
                        placeholder="Team Name"
                        type="checkbox"
                        value={paymentStatus}
                        onChange={(e) => setPaymentStatus(e.target.checked)}
                      />
                    </Col>
                  </Row>

                  {/* <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Team Name"
                    type="checkbox"
                    value={paymentStatus}
                    onChange={(e) => setPaymentStatus(!paymentStatus)}
                  /> */}
                </FormGroup>
              </Col>
            </Row>
            {/* gdgdgdgdgdq */}
            {message}
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

const AddTeamMember = ({ currentTeam, addMemberUpdate }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const eventName = getEventName();
    if (!isValidEmail || !currentTeam) {
      return;
    }

    const data = {
      email: email,
      // phone: contact,
      eventName: eventName,
      teamCode: currentTeam.TeamCode,
    };

    console.log("Current Team in modal: ", data);
    let addedMember = await eventServices.addMemberToTeam(data);

    if (addedMember && addedMember.registeredTeam) {
      setMessage("New Player has been added");
      setEmail("");
      setContact("");
      addMemberUpdate(addedMember.registeredTeam.TeamCode);
    } else {
      setMessage(addedMember.Message);
    }
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
            {/* <Row>
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
            </Row> */}
            <div
              style={{
                width: "100%",
                textAlign: "center",
              }}
            >
              {message}
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const DeleteTeam = ({ teamCode, setIsOpen, teamDeleteUpdate }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    console.log("Kuchh hooja abhai life mai");
    const data = {
      teamCode,
    };

    //** Please uncomment the below code in production */

    const deleteData = await eventServices.removeTeam(data);
    if (deleteData && deleteData.Message) {
      setMessage("Team has been deleted");
      teamDeleteUpdate();
    } else {
      // setMessage(deleteData.Message);
    }
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="12">
              <h3 className="mb-0">Delete Confirmation</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Are you sure you want to delete team: {teamCode}
            </h6>
            {/* <div className="pl-lg-4"> */}
            <Row className="align-items-left">
              <Col
                lg="6"
                className="text-center"
                // style={{ alignItems: "center" }}
              >
                <Button color="primary" size="sm" onClick={handleSubmit}>
                  Yes
                </Button>
              </Col>

              <Col lg="6" className="text-left">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Close
                </Button>
              </Col>
            </Row>

            <div
              style={{
                width: "80%",
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              {message}
            </div>
          </Form>
        </CardBody>
      </Card>
    </>
  );
};

const DeleteMember = ({ data, setIsOpen, teamDeleteUpdate }) => {
  // const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    console.log("Kuchh hooja abhai life mai");
    console.log("Delete data: ", data);

    //** Please uncomment the below code in production */

    // const deleteMember = await eventServices.removeMemberFromTeam(data);
    // if (deleteMember && deleteMember.registeredTeam) {
    //   setMessage("Member has been removed");
    //   teamDeleteUpdate();
    // } else if (deleteMember && deleteMember.Message == "Entire team deleted") {
    //   setMessage(deleteMember.Message);
    //   teamDeleteUpdate();
    // } else {
    //   setMessage(deleteMember.Message);
    // }
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="12">
              <h3 className="mb-0">Delete Confirmation</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">
              Are you sure you want to remove member: {data.email}
            </h6>
            {/* <div className="pl-lg-4"> */}
            <Row className="align-items-left">
              <Col
                lg="6"
                className="text-center"
                // style={{ alignItems: "center" }}
              >
                <Button color="primary" size="sm" onClick={handleSubmit}>
                  Yes
                </Button>
              </Col>

              <Col lg="6" className="text-left">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Close
                </Button>
              </Col>
            </Row>

            <div
              style={{
                width: "80%",
                textAlign: "center",
                paddingTop: "20px",
              }}
            >
              {message}
            </div>
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
  eventData,
  addTeamUpdate,
  addMemberUpdate,
  modalDeleteCode,
  teamDeleteUpdate,
  modalDeleteMember,
}) => {
  console.log(modalDeleteCode, modalDeleteMember, "check");

  // console.log("Current Team in modal component: ", currentTeam);

  function returnComponent(item) {
    console.log("The item is: ", item);
    if (item === "AddTeamModal") {
      return (
        <AddTeamModal eventData={eventData} addTeamUpdate={addTeamUpdate} />
      );
    }
    if (item === "UserInfo") {
      return <UserInfo currentTeam={currentTeam} selected={selected} />;
    }
    if (item === "AddTeamMember") {
      return (
        <AddTeamMember
          currentTeam={currentTeam}
          addMemberUpdate={addMemberUpdate}
        />
      );
    }
    if (item === "Deletepopup") {
      return (
        <DeleteTeam
          teamCode={modalDeleteCode}
          setIsOpen={setIsOpen}
          teamDeleteUpdate={teamDeleteUpdate}
        />
      );
    }

    if (item === "DeleteMemberpopup") {
      return (
        <DeleteMember
          data={modalDeleteMember}
          setIsOpen={setIsOpen}
          teamDeleteUpdate={teamDeleteUpdate}
        />
      );
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
