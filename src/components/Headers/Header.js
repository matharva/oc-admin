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
  Card,
  CardBody,
  CardTitle,
  Container,
  Row,
  Col,
  FormGroup,
  Input,
} from "reactstrap";
import ToggleButton from "react-toggle-button";
import { eventServices } from "services/eventServices";
import { getEventName } from "services/helpers";

import { useEffect, useState } from "react";

const HeaderItem = ({ item }) => {
  const { title, count, color } = item;

  return (
    <Col lg="6" xl="4">
      <Card className="card-stats mb-4 mb-xl-0">
        <CardBody>
          <Row>
            <div className="col">
              <CardTitle tag="h5" className="text-uppercase text-muted mb-0">
                {title}
              </CardTitle>
              <span className="h2 font-weight-bold mb-0">{count}</span>
            </div>
            <Col className="col-auto">
              <div
                className={`icon icon-shape ${color} text-white rounded-circle shadow`}
              >
                <i className="fas fa-chart-bar" />
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Col>
  );
};

const Header = ({ eventData }) => {
  const [vote, setVote] = useState(false);
  const [showVote, setShowVote] = useState(false);

  useEffect(async () => {
    const eventName = getEventName();
    const data = await eventServices.getEventDetails(eventName);
    console.log("The eventDetails are in Header: ", data);
    setShowVote(!data?.isVoting);
    setVote(data?.isVotingLive);
  }, [vote]);

  const dummyHeaderdata = [
    {
      title: "Teams Registered",
      count: eventData?.teamCount || 0,
      color: "bg-red",
    },
    {
      title: "Registrations",
      count: eventData?.playerCount || 0,
      color: "bg-cyan",
    },
    {
      title: "Amount Collected",
      count: eventData?.totalAmount || 0,
      color: "bg-green",
    },
  ];
  return (
    <>
      <div
        className="header pb-8 pt-5 pt-md-8"
        style={{ backgroundColor: "#4c1763" }}
      >
        <Container fluid>
          <div className="header-body">
            {/* Card stats */}
            <Row>
              {dummyHeaderdata.map((item, index) => (
                <HeaderItem item={item} key={index} />
              ))}
            </Row>
          </div>
        </Container>
        {showVote ? (
          <Container fluid>
            <Row>
              <Col>
                <div
                  className="voting-div"
                  color="white"
                  style={{
                    paddingTop: "3%",
                  }}
                >
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-username"
                      style={{
                        color: "white",
                      }}
                    >
                      VOTING
                    </label>
                    {/* <Input
                    className="form-control-alternative"
                    defaultValue=""
                    id="input-username"
                    placeholder="Team Name"
                    type="checkbox"
                    value={false}
                    // onChange={(e) => setName(e.target.value)}
                  /> */}
                    <ToggleButton
                      value={vote || false}
                      onToggle={async (value) => {
                        // setState({
                        //   value: !value,
                        // });
                        // console.log(value);
                        const data = await eventServices.updateVote(
                          getEventName(),
                          !vote
                        );
                        console.log("Teh event data in toggle is: ", data);
                        setVote(!vote);
                      }}
                    />
                  </FormGroup>
                </div>
              </Col>
            </Row>
          </Container>
        ) : null}
      </div>
    </>
  );
};

export default Header;
