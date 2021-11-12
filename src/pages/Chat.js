import UserHeader from "components/Headers/UserHeader";
import ModalComponent from "components/Modal/ModalComponent";
import React, { useState } from "react";
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

const ChatItem = ({ question = "Some random question" }) => {
  return (
    <Row className="align-items-center">
      <Col xs="10">
        <FormGroup>
          <Row className="mb-2">
            <Col lg="8">
              <label className="heading-small text-muted mb-1">
                {question}
              </label>
            </Col>
            <Col className="text-right" lg="4">
              <Button
                color="primary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Show All
              </Button>
              <Button
                color="secondary"
                href="#pablo"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Save
              </Button>

              <DeleteIcon onClick={(e) => e.preventDefault()} />
            </Col>
          </Row>
          <Input
            className="form-control-alternative"
            placeholder="Enter Event Description..."
            rows="4"
            defaultValue=""
            type="textarea"
          />
        </FormGroup>
      </Col>
    </Row>
  );
};

const ChatContainer = () => {
  const [chats, setChats] = useState([
    {
      question: "",
    },
    {
      question: "",
    },
    {
      question: "",
    },
    {
      question: "",
    },
    {
      question: "",
    },
  ]);
  return (
    <Col className="order-xl-1" xl="8">
      <Card className="bg-secondary shadow">
        <CardHeader className="bg-white border-0">
          <Row className="align-items-center">
            <Col xs="8">
              <h3 className="mb-0">Chats</h3>
            </Col>
            <Col className="text-right" xs="4">
              <Button
                color="primary"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Visible to all
              </Button>
              <Button
                color="primary"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Answered
              </Button>
              <Button
                color="primary"
                onClick={(e) => e.preventDefault()}
                size="sm"
              >
                Unanswered
              </Button>
            </Col>
          </Row>
        </CardHeader>
        <CardBody>
          <Form>
            {chats.map((item) => (
              <ChatItem item={item} />
            ))}
          </Form>
        </CardBody>
      </Card>
    </Col>
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
