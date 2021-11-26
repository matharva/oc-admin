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

import eventServices from "../services/eventServices";

const ChatItem = ({ item, setChats, chats }) => {
  const { question = "Some random question", answer, id } = item;

  function updateChatItem(e) {
    setChats((prev) => {
      return prev.map((element) =>
        element.id === id ? { ...element, answer: e.target.value } : element
      );
    });
  }

  function deleteChatItem() {
    // await eventServices.kuchTOhFunction(id);
  }

  function handleSubmit() {
    // const data = {
    //   answer,
    //   question,
    // };
    // await eventServices.kuchTOhFunction(id);
  }

  return (
    <Row className="align-items-center" id={id}>
      <Col xs="10">
        <FormGroup>
          <Row className="mb-2">
            <Col lg="8">
              <label className="heading-small text-muted mb-1">
                {question}
              </label>
            </Col>
            <Col className="text-right" lg="4">
              <Button color="primary" onClick={handleSubmit} size="sm">
                Save
              </Button>

              <DeleteIcon onClick={deleteChatItem} />
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
  const [active, setActive] = useState(0);
  const [chats, setChats] = useState([
    {
      question: "Question?",
      answer: "",
      id: uuid(),
    },
    {
      question: "Question?",
      answer: "",
      id: uuid(),
    },
    {
      question: "Question?",
      answer: "",
      id: uuid(),
    },
    {
      question: "Question?",
      answer: "",
      id: uuid(),
    },
  ]);

  function filterByUnanswered() {
    setActive(0);
  }
  function filterByAnswered() {
    setActive(1);
  }
  function filterByVisibleToAll() {
    setActive(2);
  }

  return (
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
              <Button
                color={active === 2 ? "primary" : "secondary"}
                onClick={filterByVisibleToAll}
                size="sm"
              >
                Visible to all
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            {chats.map((item) => (
              <ChatItem item={item} setChats={setChats} chats={chats} />
            ))}
          </Form>
        </CardBody>
      </Card>
    </Col>
  );
};

const AddChats = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  function handleSubmit() {
    const data = {
      answer,
      question,
    };

    // await eventServices.kuchTOhFunction();
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
                  defaultValue=""
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
                  defaultValue=""
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
          <AddChats />
          {/* <ExtraDetails /> */}
        </Row>
      </Container>
    </div>
  );
};

export default Chat;
