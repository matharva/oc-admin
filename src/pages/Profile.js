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
import { useState } from "react";

import { v4 as uuid } from "uuid";

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
              Ryan — the name taken by Melbourne-raised, Brooklyn-based Nick
              Murphy — writes, performs and records all of his own music.
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

const FAQQuestion = ({ question = "", answer = "", id }) => {
  return (
    <>
      <Row id={id}>
        <Col md="12">
          <FormGroup>
            <label className="form-control-label" htmlFor="input-address">
              Question
            </label>
            <Input
              className="form-control-alternative"
              defaultValue=""
              value={question}
              id="input-address"
              placeholder="Add a question..."
              type="text"
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
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

const RulesItem = ({ id, text = "" }) => {
  return (
    <>
      <Row id={id}>
        <Col md="12">
          <FormGroup>
            <Input
              className="form-control-alternative"
              defaultValue=""
              value={text}
              id="input-address"
              placeholder="Add a question..."
              type="text"
            />
          </FormGroup>
        </Col>
      </Row>
    </>
  );
};

const Details = () => {
  const [faq, setFaq] = useState([{ question: "", answer: "" }]);
  const [rules, setRules] = useState([{ text: "" }]);

  function addFaqQuestion() {
    const defaultData = { question: "", answer: "", id: uuid() };
    setFaq((faq) => {
      return [...faq, defaultData];
    });
  }

  function addRules() {
    const defaultData = { question: "", answer: "", id: uuid() };
    setFaq((faq) => {
      return [...faq, defaultData];
    });
  }

  console.log("faq: ", faq);
  // console.log(uuid());

  return (
    <Col className="order-xl-1" xl="8">
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">My account</h3>
            </Col>
            <Col className="text-right" xs="4">
              {/* <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Settings
              </Button> */}
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            <h6 className="heading-small text-muted mb-4">Event information</h6>
            <div className="pl-lg-4">
              <Row>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                    >
                      Title
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="lucky.jesse"
                      id="input-username"
                      placeholder=""
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
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      Prizes
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="Prizes"
                      id="input-first-name"
                      placeholder="Prizes"
                      type="text"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      Category
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="Fun/Tech/..."
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
                    <label
                      className="form-control-label"
                      htmlFor="input-first-name"
                    >
                      Start Date
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="Prizes"
                      id="input-first-name"
                      placeholder="Prizes"
                      type="date"
                    />
                  </FormGroup>
                </Col>
                <Col lg="6">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-last-name"
                    >
                      End Date
                    </label>
                    <Input
                      className="form-control-alternative"
                      defaultValue="Fun/Tech/..."
                      id="input-last-name"
                      placeholder="Fun/Tech/..."
                      type="date"
                    />
                  </FormGroup>
                </Col>
              </Row>
            </div>

            <hr className="my-4" />
            {/* Description */}
            <div className="pl-lg-4">
              <FormGroup>
                <label className="heading-small text-muted mb-1">
                  Description
                </label>
                <Input
                  className="form-control-alternative"
                  placeholder="Enter Event Description..."
                  rows="4"
                  // defaultValue="Enter Event Description..."
                  value=""
                  type="textarea"
                />
              </FormGroup>
            </div>
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
                <FAQQuestion item={item} />
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
                <Button color="primary" onClick={addFaqQuestion} size="sm">
                  Add Rules
                </Button>
              </Col>
            </Row>
            <div className="pl-lg-4">
              {rules.map((item) => (
                <RulesItem item={item} />
              ))}
            </div>
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

const Profile = () => {
  return (
    <>
      <UserHeader name="Event " />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Details />
          {/* <ExtraDetails /> */}
        </Row>
      </Container>
    </>
  );
};

export default Profile;
