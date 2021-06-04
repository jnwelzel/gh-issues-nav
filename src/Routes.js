import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import App from "./App";
import Auth from "./features/auth/Auth";
import { selectIsLoggedIn } from "./features/auth/authSlice";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}

const Routes = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/">
          <App />
        </PrivateRoute>
        <Route path="/login">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
