/*!

=========================================================
* Argon Dashboard React - v1.2.1
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Container,
  Row,
  Col,
} from "reactstrap";
// core components
import UserHeader from "components/Headers/UserHeader.js";
import { useEffect, useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { v4 as uuid } from "uuid";
import { eventServices } from "services/eventServices";
import { getEventName } from "services/helpers";

const ExtraDetails = () => {
  return (
    <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
      <Card className="card-profile shadow">
        <Row className="justify-content-center">
          <Col className="order-lg-2" lg="3">
            <div className="card-profile-image">
              <a href="" onClick={(e) => e.preventDefault()}>
                <img
                  alt="..."
                  className="rounded-circle"
                  src={
                    require("../assets/img/theme/team-4-800x800.jpg").default
                  }
                />
              </a>
            </div>
          </Col>
        </Row>
        <CardHeader className="text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4">
          <div className="d-flex justify-content-between">
            <Button
              className="mr-4"
              color="info"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Connect
            </Button>
            <Button
              className="float-right"
              color="default"
              onClick={(e) => e.preventDefault()}
              size="sm"
            >
              Message
            </Button>
          </div>
        </CardHeader>
        <CardBody className="pt-0 pt-md-4">
          <Row>
            <div className="col">
              <div className="card-profile-stats d-flex justify-content-center mt-md-5">
                <div>
                  <span className="heading">22</span>
                  <span className="description">Friends</span>
                </div>
                <div>
                  <span className="heading">10</span>
                  <span className="description">Photos</span>
                </div>
                <div>
                  <span className="heading">89</span>
                  <span className="description">Comments</span>
                </div>
              </div>
            </div>
          </Row>
          <div className="text-center">
            <h3>
              Jessica Jones
              <span className="font-weight-light">, 27</span>
            </h3>
            <div className="h5 font-weight-300">
              <i className="ni location_pin mr-2" />
              Bucharest, Romania
            </div>
            <div className="h5 mt-4">
              <i className="ni business_briefcase-24 mr-2" />
              Solution Manager - Creative Tim Officer
            </div>
            <div>
              <i className="ni education_hat mr-2" />
              University of Computer Science
            </div>
            <hr className="my-4" />
            <p>
              Ryan ??? the name taken by Melbourne-raised, Brooklyn-based Nick
              Murphy ??? writes, performs and records all of his own music.
            </p>
            <a href="" onClick={(e) => e.preventDefault()}>
              Show more
            </a>
          </div>
        </CardBody>
      </Card>
    </Col>
  );
};

const FAQQuestion = ({ item, setFaq }) => {
  const { question = "", answer = "", id } = item;
  function updateQuestion(e) {
    setFaq((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, question: e.target.value } : element
      );
    });
  }

  function updateAnswer(e) {
    setFaq((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, answer: e.target.value } : element
      );
    });
  }

  function deleteQuestion() {
    setFaq((prev) => {
      return prev
        .map((element) => (element.id === id ? null : element))
        .filter((x) => x !== null);
    });
  }

  return (
    <>
      <Row id={id}>
        <Col md="12">
          <FormGroup>
            <div
              className="flex-grow-1 align-content-center justify-content-between"
              style={{
                // border: "2px solid yellowgreen",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
              }}
            >
              <label className="form-control-label" htmlFor="input-address">
                Question
              </label>
              <DeleteIcon onClick={deleteQuestion} />
            </div>
            <Input
              className="form-control-alternative"
              defaultValue=""
              value={question}
              id="input-address"
              placeholder="Add a question..."
              type="text"
              onChange={updateQuestion}
            />
          </FormGroup>
          <FormGroup>
            <label className="heading-small text-muted mb-1">Answer</label>
            <Input
              className="form-control-alternative"
              placeholder="Enter Event Description..."
              rows="4"
              defaultValue=""
              value={answer}
              type="textarea"
              onChange={updateAnswer}
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

const RulesItem = ({ item, setRules }) => {
  const { id, text = "" } = item;
  function handleDelete() {
    setRules((prev) => {
      return prev
        .map((element) => (element.id === id ? null : element))
        .filter((x) => x !== null);
    });
  }

  function updateRules(e) {
    setRules((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, text: e.target.value } : element
      );
    });
  }
  return (
    <>
      <Row id={id}>
        <Col md="11">
          <FormGroup>
            <Input
              className="form-control-alternative"
              defaultValue=""
              value={text}
              onChange={updateRules}
              id="input-address"
              placeholder="Add a rule..."
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="1" className="pt-2">
          <DeleteIcon onClick={handleDelete} />
        </Col>
      </Row>
    </>
  );
};

const SlotsItem = ({ item, setAvailableSlots }) => {
  console.log("The slot item is: ", item);
  const { id, text = "" } = item;
  function handleDelete() {
    setAvailableSlots((prev) => {
      return prev
        .map((element) => (element.id === id ? null : element))
        .filter((x) => x !== null);
    });
  }

  function updateRules(e) {
    setAvailableSlots((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, text: e.target.value } : element
      );
    });
  }
  return (
    <>
      <Row id={id}>
        <Col md="11">
          <FormGroup>
            <Input
              className="form-control-alternative"
              defaultValue=""
              value={text}
              onChange={updateRules}
              id="input-address"
              placeholder="Add a slot..."
              type="text"
            />
          </FormGroup>
        </Col>
        <Col md="1" className="pt-2">
          <DeleteIcon onClick={handleDelete} />
        </Col>
      </Row>
    </>
  );
};

const RegistrationItem = ({ item, setRegistrationCost, registrationCost }) => {
  // console.log("props", setRegistrationCost);
  const { Type, Fee, maxMembers, id } = item;
  // console.log("setRegistrationCost", setRegistrationCost);

  function updateType(e) {
    setRegistrationCost((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, Type: e.target.value } : element
      );
    });
  }

  function updateMembers(e) {
    setRegistrationCost((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, maxMembers: e.target.value } : element
      );
    });
  }

  function updateCost(e) {
    setRegistrationCost((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, Fee: e.target.value } : element
      );
    });
  }

  function handleRemove(e) {
    setRegistrationCost((prev) => {
      return prev
        .map((element) => (element.id === id ? null : element))
        .filter((x) => x !== null);
    });
  }
  return (
    <Row id={id}>
      <Col xl={4}>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-first-name">
            Type
          </label>
          <Input
            className="form-control-alternative"
            placeholder="Enter type of cost..."
            rows="4"
            value={Type}
            onChange={updateType}
            type="text"
          />
        </FormGroup>
      </Col>
      <Col xl={3}>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-first-name">
            Max Members
          </label>
          <Input
            className="form-control-alternative"
            placeholder="Enter type of cost..."
            rows="4"
            value={maxMembers}
            onChange={updateMembers}
            type="number"
          />
        </FormGroup>
      </Col>
      <Col xl={3}>
        <FormGroup>
          <label className="form-control-label" htmlFor="input-first-name">
            Fee
          </label>
          <Input
            className="form-control-alternative"
            placeholder="Enter Registration Cost..."
            rows="4"
            value={Fee}
            onChange={updateCost}
            type="number"
          />
        </FormGroup>
      </Col>
      <Col xl={1}>
        <DeleteIcon
          onClick={handleRemove}
          style={{
            cursor: "pointer",
          }}
        />
      </Col>
    </Row>
  );
};

const EventInformation = (props) => {
  const {
    title,
    prize,
    category,
    startDate,
    endDate,
    setTitle,
    setPrize,
    setCategory,
    setStartDate,
    setEndDate,
    description,
    setDescription,
    whatsappLink,
    setWhatsappLink
  } = props;
  return (
    <>
      <h6 className="heading-small text-muted mb-4">Event information</h6>
      <div className="pl-lg-4">
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-username">
                Title
              </label>
              <Input
                className="form-control-alternative"
                disabled
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                id="input-username"
                placeholder="Event name"
                type="text"
              />
            </FormGroup>
          </Col>
          {/* <Col lg="6">
                  <FormGroup>
                    <label className="form-control-label" htmlFor="input-email">
                      Date
                    </label>
                    <Input
                      className="form-control-alternative"
                      id="input-email"
                      placeholder="jesse@example.com"
                      type="date"
                    />
                  </FormGroup>
                </Col> */}
        </Row>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                Prizes
              </label>
              <Input
                className="form-control-alternative"
                value={prize}
                onChange={(e) => setPrize(e.target.value)}
                id="input-first-name"
                placeholder="Prizes"
                type="text"
              />
            </FormGroup>
          </Col>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-last-name">
                Category
              </label>
              <Input
                className="form-control-alternative"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                id="input-last-name"
                placeholder="Fun/Tech/..."
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                Date
              </label>
              <Input
                className="form-control-alternative"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="input-first-name"
                placeholder="Prizes"
                type="text"
              />
            </FormGroup>
          </Col>
          {/* <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                Start Date
              </label>
              <Input
                className="form-control-alternative"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                id="input-first-name"
                placeholder="Prizes"
                type="date"
              />
            </FormGroup>
          </Col> */}
          {/* <Col lg="6">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-last-name">
                End Date
              </label>
              <Input
                className="form-control-alternative"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                id="input-last-name"
                placeholder="Fun/Tech/..."
                type="date"
              />
            </FormGroup>
          </Col> */}
          <Col lg="12">
            <FormGroup>
              <label className="heading-small text-muted mb-1">
                Description
              </label>
              <Input
                className="form-control-alternative"
                placeholder="Enter Event Description..."
                rows="4"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="textarea"
              />
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col lg="10">
            <FormGroup>
              <label className="form-control-label" htmlFor="input-first-name">
                WhatsApp Link
              </label>
              <Input
                className="form-control-alternative"
                value={whatsappLink}
                onChange={(e) => setWhatsappLink(e.target.value)}
                id="input-first-name"
                placeholder="Link"
                type="text"
              />
            </FormGroup>
          </Col>
        </Row>
      </div>
    </>
  );
};

const Details = () => {
  const [faq, setFaq] = useState([{ question: "", answer: "", id: uuid() }]);
  const [rules, setRules] = useState([{ text: "" }]);
  const [availableSlots, setAvailableSlots] = useState([{ text: "" }]);

  const [registrationCost, setRegistrationCost] = useState([
    { type: "", cost: "", id: uuid() },
  ]);
  const [title, setTitle] = useState("");
  const [prize, setPrize] = useState("");
  const [category, setCategory] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [disable,setDisable] = useState(false);
  const [message, setMessage] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");

  function addFaqQuestion() {
    const defaultData = { question: "", answer: "", id: uuid() };
    setFaq((faq) => {
      return [...faq, defaultData];
    });
  }

  function addRules() {
    const defaultData = { text: "", id: uuid() };
    setRules((rule) => {
      return [...rule, defaultData];
    });
  }

  function addSlots() {
    const defaultData = { text: "", id: uuid() };
    setAvailableSlots((slot) => {
      return [...slot, defaultData];
    });
  }

  function addRegistration() {
    const defaultData = { Type: "", Fee: "", maxMembers: 0, id: uuid() };
    setRegistrationCost((prev) => {
      return [...prev, defaultData];
    });
  }

  async function updateEventData(e) {
    e.preventDefault();
    setDisable(true);
    const data = {
      faq,
      rules,
      Fee: registrationCost,
      Title: title,
      Prizes: prize,
      Category: category,
      Date: startDate,
      // endDate,
      Description: description,
      availableSlots: availableSlots,
      whatsappLink:whatsappLink
    };
    console.log("Data to be updated: ", data);

    let updateData = await eventServices.updateEvent(data);
    setDisable(false);
    setMessage(updateData.Message);
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    // const eventName = "IPL Auction";
    const eventName = getEventName();
    console.log("eventName: ", eventName);
    const data = await eventServices.getEventDetails(eventName);
    console.log("Event Details: ", data);
    setCategory(data.Category);
    setDescription(data.Description);
    setStartDate(data.Date);
    // setFaq(data.faq);
    setPrize(data.Prizes);
    setTitle(data.Title);
    setWhatsappLink(data.whatsappLink);
    // setRules(data.rules);

    // Fees
    const feeData = data.Fee;
    console.log("Data is: ", data);
    const fees = feeData.map((item) => {
      if (item.id) return item;
      return { ...item, id: uuid() };
    });
    setRegistrationCost(fees);

    // Rules
    const rulesData = data.rules;
    const rulesUpdated = rulesData.map((item) => {
      if (item.id && item.text) return item;
      const data = {};
      data.text = item;

      if (item.id) {
        data.id = item.id;
        return data;
      }
      data.id = uuid();
      return data;
    });

    console.log("The slots are: ", data.availableSlots);
    console.log("rulesUpdated: ", rules);
    setRules(rulesUpdated);

    // Slots

    const availableSlots = data.availableSlots;
    const availableSlotsUpdated = availableSlots.map((item) => {
      if (item.id && item.text) return item;
      const data = {};
      data.text = item;

      if (item.id) {
        data.id = item.id;
        return data;
      }
      data.id = uuid();
      return data;
    });

    console.log("The updates slots are: ", availableSlotsUpdated);
    setAvailableSlots(availableSlotsUpdated);

    // Faq
    const faqData = data.faq;
    const faqUpdated = faqData.map((item) => {
      if (item.id) return item;
      item.id = uuid();
      return item;
    });
    setFaq(faqUpdated);
  }, []);

  // console.log("registrationCost: ", faq);

  return (
    <Col className="" md={10}>
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="4">
              <h3 className="mb-0">My account</h3>
            </Col>
            <Col xs="4">
              <h3
                className="mb-0"
                style={{
                  color: message?.toLowerCase().includes("unsuccessfully")
                    ? "red"
                    : "green",
                }}
              >
                {message}
              </h3>
            </Col>
            <Col className="text-right" xs="4">
              {
                disable?
                <Button color="primary" size="sm" onClick={updateEventData} style={{opacity:0.5}} disabled>
                  Save
                </Button>:
                <Button color="primary" size="sm" onClick={updateEventData}>
                  Save
                </Button>
              }
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <EventInformation
              title={title}
              prize={prize}
              category={category}
              startDate={startDate}
              endDate={endDate}
              setTitle={setTitle}
              setPrize={setPrize}
              setCategory={setCategory}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              description={description}
              setDescription={setDescription}
              whatsappLink={whatsappLink}
              setWhatsappLink={setWhatsappLink}
            />
            {/* Registration Cost Starts */}
            <hr className="my-4" />
            <div className="pl-lg-4">
              <FormGroup>
                <Row className="align-items-center pb-3">
                  <Col xs="8">
                    <label className="heading-small text-muted mb-1">
                      Registration Cost
                    </label>
                  </Col>
                  <Col className="text-right" xs="4">
                    <Button color="primary" onClick={addRegistration} size="sm">
                      Add Cost
                    </Button>
                  </Col>
                </Row>
              </FormGroup>
            </div>
            <div className="pl-lg-4">
              {registrationCost.map((item) => {
                return (
                  <RegistrationItem
                    item={item}
                    setRegistrationCost={setRegistrationCost}
                    registrationCost={registrationCost}
                  />
                );
              })}
            </div>
            {/* Registration Cost Ends */}

            <hr className="my-4" />
            {/* Address */}
            <Row className="align-items-center">
              <Col xs="8">
                {/* <h3 className="mb-0">My account</h3> */}
                <h6 className="heading-small text-muted mb-4">FAQ Section</h6>
              </Col>
              <Col className="text-right" xs="4">
                <Button color="primary" onClick={addFaqQuestion} size="sm">
                  Add Question
                </Button>
              </Col>
            </Row>
            <div className="pl-lg-4">
              {faq.map((item) => (
                <FAQQuestion item={item} setFaq={setFaq} />
              ))}
            </div>

            <hr className="my-4" />
            {/* Address */}
            <Row className="align-items-center">
              <Col xs="8">
                {/* <h3 className="mb-0">My account</h3> */}
                <h6 className="heading-small text-muted mb-4">Rules</h6>
              </Col>
              <Col className="text-right" xs="4">
                <Button color="primary" onClick={addRules} size="sm">
                  Add Rules
                </Button>
              </Col>
            </Row>
            <div className="pl-lg-4">
              {rules.map((item) => (
                <RulesItem item={item} setRules={setRules} />
              ))}
            </div>

            {/* Available slots */}
            <hr className="my-4" />
            {/* Address */}
            <Row className="align-items-center">
              <Col xs="8">
                {/* <h3 className="mb-0">My account</h3> */}
                <h6 className="heading-small text-muted mb-4">
                  Available slots (Format: Day, Date, Time)
                </h6>
              </Col>
              <Col className="text-right" xs="4">
                {/* <Button color="primary" onClick={addSlots} size="sm">
                  Add Slots
                </Button> */}
                <button  style={{
                  backgroundColor:"#5E72E4",
                   color:"white",
                   borderRadius:"10px",
                   border:"0px",
                   padding:"8px",
                   fontSize:"0.8rem"
                   
                }} onClick={(e)=>{
                  e.preventDefault()
                  addSlots()
                  }} >
                  Add Slots
                </button>
                </Col>
            </Row>
            <div className="pl-lg-4">
              {availableSlots.map((item) => (
                <SlotsItem item={item} setAvailableSlots={setAvailableSlots} />
              ))}
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

const EventDetails = () => {
  return (
    <>
      <UserHeader name="Event" />

      <Container className="mt--7" fluid>
        <Row>
          <Details />
          {/* <ExtraDetails /> */}
        </Row>
      </Container>
    </>
  );
};

export default EventDetails;
