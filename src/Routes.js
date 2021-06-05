import { useSelector } from "react-redux";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import Repository from "./features/repository/Repository";
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
          <Repository />
        </PrivateRoute>
        <Route path="/login">
          <Auth />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
