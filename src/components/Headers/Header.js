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
import { Card, CardBody, CardTitle, Container, Row, Col } from "reactstrap";

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
  const dummyHeaderdata = [
    {
      title: "Teams Registered",
      count: eventData?.teamCount || 1000,
      color: "bg-red",
    },
    {
      title: "Registrations",
      count: eventData?.playerCount || 1000,
      color: "bg-cyan",
    },
    {
      title: "Amount Collected",
      count: eventData?.totalAmount || 1000,
      color: "bg-green",
    },
  ];
  return (
    <>
      <div className="header bg-gradient-info pb-8 pt-5 pt-md-8">
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
      </div>
    </>
  );
};

export default Header;
