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
import { useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";
import { v4 as uuid } from "uuid";

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2,
} from "variables/charts.js";

import Header from "components/Headers/Header.js";

import ModalComponent from "components/Modal/ModalComponent";
import SmallTable from "components/Tables/SmallTable";
import BigTable from "components/Tables/BigTable";

const TEAMDATA = [
  {
    teamCode: "asdf",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "1Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "etry",
    isComplete: false,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "2Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "bvcn",
    isComplete: false,
    amount: "800",
    memberCount: 4,
    members: [
      {
        name: "3Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
      {
        name: "Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
  {
    teamCode: "jhfgj",
    isComplete: true,
    amount: "800",
    memberCount: "4",
    members: [
      {
        name: "4Atarva Mohtie",
        email: "atharvamohtie20@gmail.com",
        number: "894579055423",
      },
      {
        name: "Shubham Joshi",
        email: "shubhamjoshi@gmail.com",
        number: "894579055423",
      },
    ],
  },
];

const Dashboard = (props) => {
  const [activeNav, setActiveNav] = useState(1);
  const [chartExample1Data, setChartExample1Data] = useState("data1");
  const [isOpen, setIsOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [teamData, setTeamData] = useState(TEAMDATA);
  const [currentTeam, setCurrentTeam] = useState(teamData[0]);

  return (
    <>
      <Header />
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalComponent={modalComponent}
      />
      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row className="mt-5">
          <Col className="mb-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <BigTable
                setIsOpen={setIsOpen}
                setModalComponent={setModalComponent}
                teamData={teamData}
                setTeamData={setTeamData}
                currentTeam={currentTeam}
                setCurrentTeam={setCurrentTeam}
              />
            </Card>
          </Col>
          <Col xl="5">
            <Card className="shadow">
              <SmallTable
                setIsOpen={setIsOpen}
                setModalComponent={setModalComponent}
                currentTeam={currentTeam}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
