import UserHeader from "components/Headers/UserHeader";
import { projectStorage } from "../firebase";

import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Row,
} from "reactstrap";
import { eventServices } from "services/eventServices";
import { getDate } from "services/helpers";
import { getEventName } from "services/helpers";
import { v4 as uuid } from "uuid";

const NotifForm = ({ question = "", answer = "", id }) => {
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState("");
  const fileRef = useRef(null);
  const [notificationText, setNotificationText] = useState("");
  // const types = ["image/png", "image/jpeg"];

  function changeHandler(e) {
    let selected = e.target.files[0];
    console.log(selected);
    if (selected) {
      setFile(selected);
      console.log("The file updated");
    } else {
      setFile(null);
    }
  }

  async function handleSubmit() {
    const storageRef = projectStorage.ref(file.name);
    console.log(projectStorage, file.name);

    storageRef.put(file).on("state_changed", async () => {
      const URL = await storageRef.getDownloadURL();

      console.log("URL for notif: ", URL);
      setUrl(URL);
    });
    const data = {
      imgUrl:
        url ||
        `https://firebasestorage.googleapis.com/v0/b/oculus2022-75997.appspot.com/o/${file.name}?alt=media`,
      text: notificationText,
      date: getDate(),
      event: getEventName(),
      id: uuid(),
    };

    console.log("Data to be sent: ", data);
    await eventServices.addNotification(data);
    setFile(null);
    setNotificationText("");
    fileRef.current.value = "";
  }
  return (
    <>
      <Col className="order-xl-1" xl="8">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Notifications</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button color="primary" onClick={handleSubmit} size="sm">
                  Submit
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <Row id={id}>
                <Col md="12">
                  <FormGroup>
                    <label
                      className="form-control-label"
                      htmlFor="input-address"
                    >
                      Notification Text
                    </label>
                    <Input
                      className="form-control-alternative"
                      value={notificationText}
                      onChange={(e) => setNotificationText(e.target.value)}
                      id="input-address"
                      placeholder="Add Notification Text..."
                      type="text"
                    />
                  </FormGroup>
                  <FormGroup>
                    <label className="heading-small text-muted mb-1">
                      Image to be uploaded
                    </label>
                    <Input
                      className="form-control-alternative"
                      type="file"
                      innerRef={fileRef}
                      onChange={changeHandler}
                    />
                  </FormGroup>
                </Col>
              </Row>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const NotifList = () => {
  const [notifications, setNotifications] = useState([
    {
      text: "new collection for voting (for vats) services and States for event page Cloud pe image daalo for notification",
      url: "",
    },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    const eventName = getEventName();
    const data = await eventServices.getNotifications(eventName);
    console.log("Notifications: ", data);
    setNotifications(data);
  }, []);
  return (
    <>
      <Col className="order-xl-1" xl="8">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Notifications</h3>
              </Col>
              <Col className="text-right" xs="4">
                {/* <Button
                  color="primary"
                  onClick={(e) => e.preventDefault()}
                  size="sm"
                >
                  Submit
                </Button> */}
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Col lg="6" xl="12">
              <Card className="card-stats mb-4 mb-xl-0">
                <CardBody>
                  {notifications.map((item) => {
                    return (
                      <Row style={{ marginTop: "1rem" }}>
                        <Col className="col-auto">
                          <div
                            className="icon icon-shape text-white rounded-circle shadow"
                            style={{ width: "100px" }}
                          >
                            <img
                              style={{ width: "100%" }}
                              src={
                                item.imgUrl
                                  ? item.imgUrl
                                  : "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JhZGllbnR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
                              }
                              alt="notif"
                            />
                          </div>
                        </Col>
                        <Col>
                          <div className="col">
                            <span className="h4 mb-0">{item.text}</span>
                          </div>
                        </Col>
                      </Row>
                    );
                  })}
                </CardBody>
              </Card>
            </Col>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const Notification = () => {
  return (
    <div>
      <UserHeader name={"Notification"} />

      <Container className="mt--7" fluid>
        <Row>
          <NotifForm />
          {/* <ExtraDetails /> */}
        </Row>
        <Row className="mt-5">
          <NotifList />
          {/* <ExtraDetails /> */}
        </Row>
      </Container>
    </div>
  );
};

export default Notification;
