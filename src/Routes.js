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
import Issue from "./features/issue/Issue";
import Template from "./Template";
import NoMatch from "./components/NoMatch";

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
          <Template>
            <Repository />
          </Template>
        </PrivateRoute>
        <Route path="/login">
          <Auth />
        </Route>
        <PrivateRoute path="/:owner/:repo/issues/:id">
          <Template>
            <Issue />
          </Template>
        </PrivateRoute>
        <Route path="*">
          <NoMatch />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
