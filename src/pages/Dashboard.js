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
import { useEffect, useState } from "react";
// node.js library that concatenates classes (strings)
import classnames from "classnames";
// javascipt plugin for creating charts
import Chart from "chart.js";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, Container, Row, Col } from "reactstrap";

import Header from "components/Headers/Header.js";

import ModalComponent from "components/Modal/ModalComponent";
import SmallTable from "components/Tables/SmallTable";
import BigTable from "components/Tables/BigTable";
import { eventServices } from "services/eventServices";
import { getEventName } from "services/helpers";
import { useAuth } from "context/AuthContext";
import { Redirect } from "react-router";

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
  const [isOpen, setIsOpen] = useState(false);
  const [modalComponent, setModalComponent] = useState(null);
  const [teamData, setTeamData] = useState([]);
  const [currentTeam, setCurrentTeam] = useState(null);
  const [selected, setSelected] = useState(null);
  const [modalDeleteCode, setModalDeleteCode] = useState(null);
  const [modalDeleteMember, setModalDeleteMember] = useState(null);
  const [eventData, setEventData] = useState([]);
  const [paymentUpdate, setPaymentUpdate] = useState(null);
  const [eventDetail, setEventDetail] = useState(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const eventName = getEventName();

    const data = await eventServices.getEvent(eventName);
    console.log("lollll", data);
    setEventData(data);
    setTeamData(data.allTeamDetails);
    setCurrentTeam(data.allTeamDetails[0]);
  }, []);

  useEffect(async () => {
    const eventName = getEventName();
    const data = await eventServices.getEventDetails(eventName);
    console.log("The eventDetails are in Header: ", data);
    setEventDetail(data);
  }, []);

  useEffect(() => {
    // Here update perform the API action
  }, [paymentUpdate]);

  const updatePayment = async (teamCode, paymentStatus) => {
    let update = await eventServices.updatePayment(teamCode, !paymentStatus);
    if (update.Message == "Updated Sucessfully") {
      setPaymentUpdate(true);
      console.log("The parent state is updated");
      const eventName = getEventName();

      const data = await eventServices.getEvent(eventName);
      console.log("lollll", data);
      setEventData(data);
      setTeamData(data.allTeamDetails);
      setCurrentTeam(
        data.allTeamDetails.filter((x) => x.TeamCode == currentTeam.TeamCode)[0]
      );
    }
    // SHow Payment Update popup here
    console.log("The payment is updated: ", update);
  };

  const addTeamUpdate = async (teamCode) => {
    // if (update.Message == "Updated Sucessfully") {
    //   setPaymentUpdate(true);
    console.log("The parent state is updated");
    const eventName = getEventName();

    const data = await eventServices.getEvent(eventName);
    console.log("lollll", data);
    setEventData(data);
    setTeamData(data.allTeamDetails);
    setCurrentTeam(
      data.allTeamDetails.filter((x) => x.TeamCode == teamCode)[0]
    );
    // }
    // SHow Payment Update popup here
    // console.log("The payment is updated: ", update);
  };

  const addMemberUpdate = async (teamCode) => {
    // let update = await eventServices.updatePayment(teamCode, !paymentStatus);
    // if (update.Message == "Updated Sucessfully") {
    setPaymentUpdate(true);
    console.log("The parent state is updated");
    const eventName = getEventName();

    const data = await eventServices.getEvent(eventName);
    console.log("lollll", data);
    setEventData(data);
    setTeamData(data.allTeamDetails);
    setCurrentTeam(
      data.allTeamDetails.filter((x) => x.TeamCode == currentTeam.TeamCode)[0]
    );
    // }
    // SHow Payment Update popup here
    // console.log("The payment is updated: ", update);
  };

  const teamDeleteUpdate = async () => {
    // let update = await eventServices.updatePayment(teamCode, !paymentStatus);
    // if (update.Message == "Updated Sucessfully") {
    setPaymentUpdate(true);
    console.log("The parent state is updated");
    const eventName = getEventName();

    const data = await eventServices.getEvent(eventName);
    console.log("lollll", data);
    setEventData(data);
    setTeamData(data.allTeamDetails);
    setCurrentTeam(data.allTeamDetails[0]);
    // }
    // SHow Payment Update popup here
    // console.log("The payment is updated: ", update);
  };

  const deleteTeampopup = (teamCode) => {
    setModalComponent("Deletepopup");
    setModalDeleteCode(teamCode);
    console.log("The popup for team is: ", teamCode);
    setIsOpen(true);
  };

  const deleteMemberpopup = (data) => {
    setModalComponent("DeleteMemberpopup");
    setModalDeleteMember(data);
    console.log("The popup for team is: ", data);
    setIsOpen(true);
  };

  return (
    <>
      <Header eventData={eventData} />
      <ModalComponent
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        modalComponent={modalComponent}
        currentTeam={currentTeam}
        selected={selected}
        eventData={eventData}
        addTeamUpdate={addTeamUpdate}
        addMemberUpdate={addMemberUpdate}
        modalDeleteCode={modalDeleteCode}
        teamDeleteUpdate={teamDeleteUpdate}
        modalDeleteMember={modalDeleteMember}
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
                addTeamUpdate={addTeamUpdate}
                deleteTeampopup={deleteTeampopup}
                isVoting={eventDetail?.isVoting}
              />
            </Card>
          </Col>
          <Col xl="5">
            <Card className="shadow">
              <SmallTable
                setIsOpen={setIsOpen}
                setModalComponent={setModalComponent}
                currentTeam={currentTeam}
                setSelected={setSelected}
                setPaymentUpdate={updatePayment}
                deleteMemberpopup={deleteMemberpopup}
              />
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
