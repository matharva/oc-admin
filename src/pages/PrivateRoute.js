const { Route, Redirect } = require("react-router");

function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authed !== null ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{ pathname: "/auth/login", state: { from: props.location } }}
          />
        )
      }
    />
  );
}

export default PrivateRoute;
