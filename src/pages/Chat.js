import UserHeader from "components/Headers/UserHeader";
import ModalComponent from "components/Modal/ModalComponent";
import React, { useEffect, useState } from "react";
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
import DeleteIcon from "@mui/icons-material/Delete";

import { v4 as uuid } from "uuid";

import { eventServices } from "services/eventServices";
import { useAuth } from "context/AuthContext";
import { getEventName } from "services/helpers";
import { getDate } from "services/helpers";

const ChatItem = ({ item, setChats, setChatsCopy }) => {
  const { question = "Some random question", answer, id, docId, date } = item;

  function updateChatItem(e) {
    setChats((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, answer: e.target.value } : element
      );
    });
    setChatsCopy((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, answer: e.target.value } : element
      );
    });
  }

  async function handleSubmit() {
    const data = {
      answer,
      docId,
      eventName: getEventName(),
    };
    console.log("Data to answer chat: ", data);
    await eventServices.answerQuestion(data);
  }

  return (
    <Row className="align-items-center" id={id}>
      <Col xs="10">
        <FormGroup>
          <Row className="mb-2">
            <Col lg="8">
              <label
                className="text-muted mb-1"
                style={{
                  fontSize: "1rem",
                  textTransform: "none",
                  fontWeight: "500",
                  marginLeft: "0.5rem",
                }}
              >
                <span style={{ fontWeight: "bold" }}> {question} </span>
                <br />
                {"Date: " +
                  new Date(date).getDate() +
                  "/" +
                  new Date(date).getMonth() +
                  " Time: " +
                  new Date(date).getHours() +
                  ":" +
                  new Date(date).getMinutes()}
              </label>
            </Col>
            <Col className="text-right" lg="4">
              <Button color="primary" onClick={handleSubmit} size="sm">
                Save
              </Button>

              {/* <DeleteIcon onClick={deleteChatItem} /> */}
            </Col>
          </Row>
          <Input
            className="form-control-alternative"
            placeholder="Enter Event Description..."
            rows="4"
            value={answer}
            onChange={updateChatItem}
            type="textarea"
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

const ChatContainer = () => {
  const [active, setActive] = useState(3);
  const [chats, setChats] = useState([
    // {
    //   question: "Question?",
    //   answer: "",
    //   id: uuid(),
    //   date: "2021-12-08 21:52:42.648925",
    // },
  ]);
  const [chatsCopy, setChatsCopy] = useState([
    // {
    //   question: "Question?",
    //   answer: "",
    //   id: uuid(),
    //   date: "2021-12-08 21:52:42.648925",
    // },
  ]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
    fetchNewChats();
  }, []);

  function filterByUnanswered() {
    setActive(0);
    const updatedChats = chats.filter((chat) => chat.answer === "");
    setChatsCopy(updatedChats);
  }
  function filterByAnswered() {
    const updatedChats = chats.filter((chat) => chat.answer !== "");
    setChatsCopy(updatedChats);
    setActive(1);
  }
  function filterByVisibleToAll() {
    setActive(2);
  }
  function showAll() {
    setActive(3);
    setChatsCopy(chats);
  }

  const fetchNewChats = async () => {
    const eventName = getEventName();
    const data = await eventServices.getChats(eventName);
    console.log("Chats: ", data);

    data.sort((a, b) => Date.parse(b.date) - Date.parse(a.date));

    const chatsUpdated = data.map((item) => {
      if (item.id) return item;
      item.id = uuid();
      return item;
    });
    console.log("updated chats: ", chatsUpdated);
    setChats(chatsUpdated);
    setChatsCopy(chatsUpdated);
  };

  return (
    <>
      <Col className="order-xl-1" xl="8">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8" md={3}>
                <h3 className="mb-0">Chats</h3>
              </Col>
              <Col className="text-right" xs="4" md={9}>
                <Button
                  color={active === 0 ? "primary" : "secondary"}
                  onClick={filterByUnanswered}
                  size="sm"
                >
                  Unanswered
                </Button>
                <Button
                  color={active === 1 ? "primary" : "secondary"}
                  onClick={filterByAnswered}
                  size="sm"
                >
                  Answered
                </Button>
                {/* <Button
                  color={active === 2 ? "primary" : "secondary"}
                  onClick={filterByVisibleToAll}
                  size="sm"
                >
                  Visible to all
                </Button> */}
                <Button
                  color={active === 3 ? "primary" : "secondary"}
                  onClick={showAll}
                  size="sm"
                >
                  All
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              {chatsCopy.map((item) => (
                <ChatItem
                  key={item.id}
                  item={item}
                  setChats={setChats}
                  setChatsCopy={setChatsCopy}
                />
              ))}
            </Form>
          </CardBody>
        </Card>
      </Col>
      {/* <AddChats fetchNewChats={fetchNewChats} /> */}
    </>
  );
};

const AddChats = ({ fetchNewChats }) => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  async function handleSubmit() {
    const data = {
      answer,
      question,
      id: uuid(),
      date: getDate(),
      event: getEventName(),
    };
    console.log("Data submitted for addChat: ", data);

    const newQuestion = await eventServices.addChat(data);
    if (newQuestion?.Message == "Successful") {
      setQuestion("");
      setAnswer("");
      fetchNewChats();
    }
  }
  return (
    <>
      <Col className="order-xl-2" xl="4">
        <Card className="bg-secondary shadow">
          <CardHeader className="bg-white border-0">
            <Row className="align-items-center">
              <Col xs="8">
                <h3 className="mb-0">Add Chat</h3>
              </Col>
              <Col className="text-right" xs="4">
                <Button color="primary" onClick={handleSubmit} size="sm">
                  Add
                </Button>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Form>
              <FormGroup>
                <label className="form-control-label" htmlFor="input-address">
                  Question
                </label>
                <Input
                  className="form-control-alternative"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
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
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  type="textarea"
                />
              </FormGroup>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

const Chat = () => {
  return (
    <div>
      <ModalComponent />
      <UserHeader name={"Chats"} />

      <Container className="mt--7" fluid>
        <Row>
          <ChatContainer />
          {/* <ExtraDetails /> */}
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
