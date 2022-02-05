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
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import { eventServices } from "services/eventServices";
import { validatePhoneNumber } from "services/helpers";
import { validateEmail } from "services/helpers";
import DeleteIcon from "@mui/icons-material/Delete";
import { getEventName } from "services/helpers";

const customStylesAdd = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    padding: 0,
    transform: "translate(-50%, -50%)",
    // Yeh kyu diya tha?
    // height: "90vh",
    // width: "70vw",
    // overflowY: "auto",
  },
};

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
    // overflowY: "auto",
  },
};

const AddTeamModal = ({ eventData, addTeamUpdate }) => {
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const [slotTime, setSlotTime] = useState("");
  const [link, setLink] = useState("");
  const [eventDetails, setEventDetails] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");

  const [paymentStatus, setPaymentStatus] = useState(false);
  const [eventFee, setEventFee] = useState([]);
  const [availSlots, setAvailSlots] = useState([]);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [message, setMessage] = useState("");
  const [disable,setDisable] = useState(false);

  // console.log("The event data is: ", eventData);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const eventName = getEventName();
    const data = await eventServices.getEventDetails(eventName);
    console.log("The eventDetails are: ", data);
    setEventDetails(data);
    setEventFee(data?.Fee);
    setType(data?.Fee[0].Type);
    setAvailSlots(["-", ...data?.availableSlots]);
  }, []);

  async function handleSubmit() {
    setDisable(true);
    const checkUser = await eventServices.validateUser(
      email,
      phoneNumber,
      eventDetails.isSingle
    );
    if (!checkUser) {
      setMessage("User does not exist");
      setDisable(false);
      return;
    }

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
      teamName: eventDetails.isSingle ? "Single Event" : name,
      eventName: eventName,
      paymentStatus: paymentStatus,
      amount: parseInt(eventFee.filter((x) => x.Type == type)[0].Fee),
      maxMembers: parseInt(
        eventFee.filter((x) => x.Type == type)[0].maxMembers
      ),
      slotTime: slotTime,
      link: link,
    };
    console.log("data to create team: ", data);
    let newTeam = await eventServices.addTeam(data);
    console.log("The new Team is: ", newTeam);
    if (newTeam && newTeam.registrationDetails) {
      setMessage("New team has been added");
      setEmail("");
      setContact("");
      setName("");
      setPhoneNumber("");
      setSlotTime("-");
      setLink("");
      setPaymentStatus(false);
      setType(eventFee[0]?.Type);
      addTeamUpdate(newTeam.registrationDetails.TeamCode);
    } else {
      setMessage(newTeam.Message);
    }

    setDisable(false);
  }

  useEffect(() => {
    console.log("The new update payment status: ", paymentStatus);
  }, [paymentStatus]);

  const phoneHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log("hehehehe: ", value);
    let isValid = true;
    if (value) {
      var pattern = new RegExp(/^[0-9\b]+$/);

      if (!pattern.test(value)) {
        isValid = false;

        setError("Please enter only number.");
        // errors["phone"] = ;
      } else if (value.length != 10) {
        isValid = false;
        setError("Please enter valid phone number.");

        // errors["phone"] = ;
      }
    }
    if (isValid) {
      setError("");
    }
    // setRegisterForm((prevState) => {
    //   return {
    //     ...prevState,
    //     [name]: {
    //       ...prevState[name],
    //       value: value,
    //       dirty: true,
    //     },
    //   };
    // });
    setPhoneNumber(value);
  };

  return (
    <>
      {eventDetails ? (
        <>
          <Card className="bg-secondary shadow " style={{ width: "500px" }}>
            <CardHeader className="bg-white border-0">
              <Row className="align-items-center">
                <Col xs="8">
                  <h3 className="mb-0">Add {eventDetails?.isSingle?"User":"Team"}</h3>
                </Col>
                <Col className="text-right" xs="4">
                  {
                    disable?
                  <Button color="primary" onClick={handleSubmit} size="sm" style={{opacity:0.5}} disabled>
                    Save
                  </Button>:
                  <Button color="primary" onClick={handleSubmit} size="sm" >
                    Save
                  </Button>
                  }
                </Col>
              </Row>
            </CardHeader>
            <CardBody>
              <Form>
                <h6 className="heading-small text-muted mb-4">
                  User information
                </h6>
                {/* <div className="pl-lg-4"> */}
                <Row>
                  <Col lg="12">
                    <FormGroup>
                      <label
                        className="form-control-label"
                        htmlFor="input-email"
                      >
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
                {eventDetails.isSingle ? (
                  <>
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
                            placeholder="Phone Number"
                            type="number"
                            value={phoneNumber}
                            onChange={phoneHandler}
                          />
                          <span style={{ color: "red" }}>{error}</span>
                        </FormGroup>
                      </Col>
                    </Row>
                  </>
                ) : (
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
                )}

                <Row>
                  <Col lg="12">
                    <FormGroup isRequired marginBottom={"1.5rem"}>
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
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col lg="12">
                    <FormGroup marginBottom={"1.5rem"}>
                      <label
                        className="form-control-label"
                        htmlFor="input-username"
                      >
                        Slot Time
                      </label>
                      <Input
                        id="paymentType"
                        value={slotTime}
                        type="select"
                        onChange={(e) => {
                          setSlotTime(e.target.value);
                        }}
                        color={"white"}
                        // bg={OC_BG_DARK}
                      >
                        {availSlots &&
                          availSlots.map((item) => {
                            return (
                              <>
                                <option
                                  value={`${item?.text ? item.text : item}`}
                                  // color={"black"}
                                  style={{ color: "black" }}
                                >{`${item?.text ? item.text : item}`}</option>
                              </>
                            );
                          })}
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
                        Link
                      </label>
                      <Input
                        className="form-control-alternative"
                        defaultValue=""
                        id="input-username"
                        placeholder="Link(Meet or WhatsApp)"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                </Row>

                {/* gdgdgdgdgdq */}
                {message}
                {/* </div> */}
                {/* <hr className="my-4" /> */}
              </Form>
            </CardBody>
          </Card>
        </>
      ) : null}
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
  const [disable,setDisable] = useState(false);


  async function handleSubmit() {
    const eventName = getEventName();
    if (!isValidEmail || !currentTeam) {
      return;
    }
    setDisable(true);

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

    setDisable(false);
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
              {
                disable?
                <Button color="primary" size="sm" onClick={handleSubmit} style={{opacity:0.5}} disabled>
                  Save
                </Button>:
                <Button color="primary" size="sm" onClick={handleSubmit}>
                  Save
                </Button>
              }
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

const DeleteTeam = ({ teamCode, setIsOpen, teamDeleteUpdate, isSingle }) => {
  const [message, setMessage] = useState("");
  console.log('The team deleting is: ',teamDeleteUpdate);
  async function handleSubmit() {
    console.log("Kuchh hooja abhai life mai");
    const data = {
      teamCode:isSingle?teamCode.teamCode:teamCode
    };

    //** Please uncomment the below code in production */

    const deleteData = await eventServices.removeTeam(data);
    if (deleteData && deleteData.Message) {
      setMessage("Team has been deleted");
      teamDeleteUpdate();
    } else {
      setMessage(deleteData.Message);
    }
  }

  return (
    <>
      <Card
        className="bg-secondary shadow "
        style={{ width: "400px", textAlign: "center" }}
      >
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="12">
              <h3 className="mb-0">Delete {isSingle?"User":"Team"} Confirmation</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
          {
            isSingle?(
              <>
              <div className="font-weight-500 translate-y-6" style={{}}>
              Are you sure you want to delete player:
            </div>
            <div className="font-weight-700 text-md pb-3">{teamCode?.member}</div>
            </>
            ):(
              <>
              <div className="font-weight-500 translate-y-6" style={{}}>
              Are you sure you want to delete team:
            </div>
            <div className="font-weight-700 text-md pb-3">{teamCode}</div>
            </>
            )
          }
            
            <Row
              className="align-items-left"
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Col lg="3" className="text-center">
                <Button
                  color="danger"
                  size="sm"
                  onClick={handleSubmit}
                  className="px-3 py-2"
                >
                  Delete
                </Button>
              </Col>

              <Col lg="3" className="text-left">
                <Button
                  color="secondary"
                  size="sm"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                  className="px-3 py-2"
                >
                  Cancel
                </Button>
              </Col>
            </Row>

            <div
              style={{
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
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    // console.log("Kuchh hooja abhai life mai");
    console.log("Delete data: ", data);

    //** Please uncomment the below code in production */

    const deleteMember = await eventServices.removeMemberFromTeam(data);
    if (deleteMember && deleteMember.registeredTeam) {
      setMessage("Member has been removed");
      teamDeleteUpdate();
    } else if (deleteMember && deleteMember.Message === "Entire team deleted") {
      setMessage(deleteMember.Message);
      teamDeleteUpdate();
    } else {
      setMessage(deleteMember.Message);
    }
  }

  return (
    <>
      <Card
        className="bg-secondary shadow "
        style={{ width: "400px", textAlign: "center" }}
      >
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="12">
              <h3 className="">Delete Member Confirmation</h3>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <div className="font-weight-500 translate-y-6" style={{}}>
              Are you sure you want to remove
            </div>
            <div className="font-weight-700 text-md pb-3">{data.email}</div>

            <Row
              className="align-items-left"
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-evenly",
              }}
            >
              <Col lg="3" className="text-center border-red-500 border-2">
                <Button
                  color="danger"
                  size="sm"
                  onClick={handleSubmit}
                  className="px-3 py-2"
                >
                  Delete
                </Button>
              </Col>

              <Col lg="3" className="text-left">
                <Button
                  color="secondary"
                  size="sm"
                  className="px-3 py-2"
                  onClick={() => {
                    setIsOpen(false);
                  }}
                >
                  Cancel
                </Button>
              </Col>
            </Row>

            <div
              style={{
                textAlign: "center",
                marginTop: "20px",
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

const EditTeamModal = ({ currentTeam, eventData, addMemberUpdate }) => {
  const [message, setMessage] = useState("");

  // New States - teamName, maxMembers, slot,
  const [teamName, setTeamName] = useState(currentTeam?.TeamName);
  const [slot, setSlot] = useState(currentTeam?.slotTime);
  const [mem, setMem] = useState(currentTeam?.maxMembers);
  const [link, setLink] = useState(currentTeam?.link);
  const [paymentStatus, setPaymentStatus] = useState(
    currentTeam?.paymentStatus
  );
  const [availableSlots, setAvailableSlots] = useState("");
  const [disable,setDisable] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log("agnfjokad;l", paymentStatus, eventData);
    const eventName = getEventName();
    console.log("eventName: ", eventName);
    const data = await eventServices.getEventDetails(eventName);
    console.log("Event Details: ", data);
    setAvailableSlots(data.availableSlots);
  }, []);

  async function handleSubmit() {
    const eventName = getEventName();

    const data = {
      slotTime: slot,
      maxMembers: parseInt(mem),
      link: link,
      teamName:teamName,
      // phone: contact,
      paymentStatus: paymentStatus,
      eventName: eventName,
      TeamCode: currentTeam.TeamCode,
    };

    console.log("Current Team in modal: ", data);
    if(data.maxMembers < currentTeam?.member?.length){ 
      setMessage('Max Member count in team is less than current members');
      return ;
    }
    setDisable(true);
    let addedMember = await eventServices.updateTeamDetails(data);
    // let addedMember;
    console.log('The updated team is: ',addedMember);

    if (addedMember && addedMember.updatedTeam) {
      setMessage("Team is updated");

      setTeamName(addedMember.updatedTeam.TeamName);
      // setSlot("");
      setMem(addedMember.updatedTeam.maxMembers);
      setLink(addedMember.updatedTeam.link);
      setPaymentStatus(addedMember.updatedTeam.paymentStatus);
      addMemberUpdate(addedMember.updatedTeam.TeamCode);
    } else {
      setMessage("Sorry Cannot Update the team");
    }
    setDisable(false);
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Edit Team Details</h3>
            </Col>
            <Col className="text-right" xs="4">
              {
                disable?
                <Button color="primary" size="sm" onClick={handleSubmit} style={{opacity:0.5}} disabled>
                  Save
                </Button>:
                <Button color="primary" size="sm" onClick={handleSubmit}>
                  Save
                </Button>
              }
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
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Team Name
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Team Name"
                    type="text"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={teamName}
                    onChange={(e) => {
                      setTeamName(e.target.value);
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
                    Max Members
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Team Name"
                    type="number"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={mem}
                    onChange={(e) => {
                      setMem(e.target.value);
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
                    Link
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Meet Link"
                    type="text"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
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
                    Payment Status
                  </label>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      id="customCheck5"
                      type="checkbox"
                      checked={paymentStatus}
                      // value={}
                      onChange={() => setPaymentStatus(!paymentStatus)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck5"
                    >
                      Select if already paid
                    </label>
                  </div>
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
                    Slot
                  </label>
                  {availableSlots?.length > 0
                    ? availableSlots.map((item) => {
                        return (
                          <div
                            className="custom-control custom-radio mb-3"
                            id={item.id}
                            onClick={(e) => {
                              console.log("item updated", item);
                              setSlot(item.text);
                            }}
                          >
                            <input
                              className="custom-control-input"
                              id={item.id}
                              name="custom-radio-2"
                              type="radio"
                              checked={item.text === slot}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio5"
                            >
                              {item.text}
                            </label>
                          </div>
                        );
                      })
                    : null}
                </FormGroup>
              </Col>
            </Row>
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

const SingleEditTeamModal = ({ currentTeam, eventData, addMemberUpdate }) => {
  const [message, setMessage] = useState("");

  // New States - teamName, maxMembers, slot,
  const [teamName, setTeamName] = useState(currentTeam?.TeamName);
  const [slot, setSlot] = useState(currentTeam?.slotTime);
  const [mem, setMem] = useState(currentTeam?.maxMembers);
  const [link, setLink] = useState(currentTeam?.link);
  const [paymentStatus, setPaymentStatus] = useState(
    currentTeam?.paymentStatus
  );
  const [availableSlots, setAvailableSlots] = useState("");
  const [disable,setDisable] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    console.log("agnfjokad;l", paymentStatus, eventData);
    const eventName = getEventName();
    console.log("eventName: ", eventName);
    const data = await eventServices.getEventDetails(eventName);
    console.log("Event Details: ", data);
    setAvailableSlots(data.availableSlots);
  }, []);

  async function handleSubmit() {
    const eventName = getEventName();

    const data = {
      slotTime: slot,
      // maxMembers: parseInt(mem),
      link: link,
      // teamName:teamName,
      // phone: contact,
      paymentStatus: paymentStatus,
      eventName: eventName,
      TeamCode: currentTeam.TeamCode,
    };

    console.log("Current Team in modal: ", data);
    if(data.maxMembers < currentTeam?.member?.length){ 
      setMessage('Max Member count in team is less than current members');
      return ;
    }
    setDisable(true);
    let addedMember = await eventServices.updateTeamDetails(data);
    // let addedMember;
    console.log('The updated team is: ',addedMember);

    if (addedMember && addedMember.updatedTeam) {
      setMessage("Team is updated");

      // setTeamName(addedMember.updatedTeam.TeamName);
      setSlot(addedMember.updatedTeam.slotTime);
      // setMem(addedMember.updatedTeam.maxMembers);
      setLink(addedMember.updatedTeam.link);
      setPaymentStatus(addedMember.updatedTeam.paymentStatus);
      addMemberUpdate(addedMember.updatedTeam.TeamCode);
    } else {
      setMessage("Sorry Cannot Update the team");
    }
    setDisable(false);
  }

  return (
    <>
      <Card className="bg-secondary shadow " style={{ width: "500px" }}>
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Edit User Details</h3>
            </Col>
            <Col className="text-right" xs="4">
              {
                disable?
                <Button color="primary" size="sm" onClick={handleSubmit} style={{opacity:0.5}} disabled>
                  Save
                </Button>:
                <Button color="primary" size="sm" onClick={handleSubmit}>
                  Save
                </Button>
              }
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
                  <label
                    className="form-control-label"
                    htmlFor="input-username"
                  >
                    Email Id
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Team Name"
                    type="text"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={currentTeam?.member[0].email}
                    onChange={(e) => {
                      // setTeamName(e.target.value);
                    }}
                    disabled
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
                    Max Members
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Team Name"
                    type="number"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={mem}
                    onChange={(e) => {
                      setMem(e.target.value);
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
                    Link
                  </label>
                  <Input
                    className="form-control-alternative"
                    id="input-username"
                    placeholder="Meet Link"
                    type="text"
                    // style={
                    //   !isValidPhoneNumber ? { border: "red 2px solid" } : {}
                    // }
                    value={link}
                    onChange={(e) => {
                      setLink(e.target.value);
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
                    Payment Status
                  </label>
                  <div className="custom-control custom-control-alternative custom-checkbox mb-3">
                    <input
                      className="custom-control-input"
                      id="customCheck5"
                      type="checkbox"
                      checked={paymentStatus}
                      // value={}
                      onChange={() => setPaymentStatus(!paymentStatus)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck5"
                    >
                      Select if already paid
                    </label>
                  </div>
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
                    Slot
                  </label>
                  {availableSlots?.length > 0
                    ? availableSlots.map((item) => {
                        return (
                          <div
                            className="custom-control custom-radio mb-3"
                            id={item.id}
                            onClick={(e) => {
                              console.log("item updated", item);
                              setSlot(item.text);
                            }}
                          >
                            <input
                              className="custom-control-input"
                              id={item.id}
                              name="custom-radio-2"
                              type="radio"
                              checked={item.text === slot}
                            />
                            <label
                              className="custom-control-label"
                              htmlFor="customRadio5"
                            >
                              {item.text}
                            </label>
                          </div>
                        );
                      })
                    : null}
                </FormGroup>
              </Col>
            </Row>
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
  isSingle,
  singleModalEdit
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
          isSingle={isSingle}
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

    if (item === "EditTeam") {
      return <EditTeamModal currentTeam={currentTeam} eventData={eventData} addMemberUpdate={addMemberUpdate}/>;
    }

    if(item == "SingleEditModal"){
      return <SingleEditTeamModal currentTeam={singleModalEdit} eventData={eventData} addMemberUpdate={addMemberUpdate}/>
    }
  }

  return (
    <Modal
      style={modalComponent === "AddTeamModal" ? customStylesAdd : customStyles}
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
    >
      {returnComponent(modalComponent)}
    </Modal>
  );
};

export default ModalComponent;
