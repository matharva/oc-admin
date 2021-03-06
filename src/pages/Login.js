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
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import firebase from "firebase";
import { StyledFirebaseAuth } from "react-firebaseui";
import { useHistory } from "react-router";
import { useAuth } from "context/AuthContext";
import { useState } from "react";
import { handleBreakpoints } from "@mui/system";
import { setToken } from "services/helpers";
import { EVENT_MAP } from "services/helpers";

const Login = () => {
  const history = useHistory();
  const uiConfig = {
    signInFlow: "popup",
    signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult: async (data) => {
        history.push("/admin/index");
      },
    },
  };
  const { signup, login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const userRef = firebase.firestore().collection("Users");

  async function handleRegisterUser() {
    // const userData = await signup("mun_oc@gmail.com", "mun_oc@1234");
    // return;
    // console.log("hdhdhd");
    const userData = await signup("paintball_oc@spit.ac.in", "OC747438");
    const { uid, email } = userData.user;
    console.log(uid);

    let newUserRef = userRef.doc(uid);

    let data = {
      college: "",
      email: email,
      name: "",
      phoneNumber: "",
      uid: newUserRef.id,
    };

    await newUserRef.set(data);
    console.log("The new user creat createer: ", newUserRef.get());
    let currUser = await (await newUserRef.get()).data();
    console.log("Dard: ", currUser);
    // return currUser;
  }

  async function handleLogin() {
    if (email !== "" && password !== "") {
      const currentUser = await login(email, password);
      console.log("User: ", currentUser);

      let item = [];

      let querySnapShot = await userRef.where("email", "==", email).get();

      querySnapShot.forEach((doc) => {
        item.push(doc.data());
      });

      console.log("EventD3: ", item[0]);
      const userData = item[0] || item;
      const event = EVENT_MAP[userData.email];
      console.log("The event is: ", EVENT_MAP[userData.email], userData);
      const userToken = {
        ...userData,
        event: event || "Not an event, login kar lavde",
      };
      setToken("user", userToken);
      setToken("eventName", event);

      history.push("/admin/index");
    }
  }

  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <h1
            className="text-overflow m-0"
            style={{
              paddingTop: "1.5rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Login
          </h1>

          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    // autoComplete="new-email"
                    autoComplete="on"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="on"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </InputGroup>
              </FormGroup>
              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
              </div>
              {/* <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              /> */}
              <div className="text-center">
                <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={handleLogin}
                >
                  Sign in
                </Button>
              </div>
              <div className="text-center">
                {/* <Button
                  className="my-4"
                  color="primary"
                  type="button"
                  onClick={() => {
                    handleRegisterUser();
                  }}
                >
                  Secret Sign up
                </Button> */}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
