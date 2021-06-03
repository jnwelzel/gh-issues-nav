import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Issue from "./features/issue/Issue";
import Repo from "./features/repo/Repo";
import User from "./features/user/User";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:user/:repo/:issue" children={<Issue />} />
        <Route path="/:user/:repo" children={<Repo />} />
        <Route path="/:user" children={<User />} />
      </Switch>
    </Router>
  );
};

export default Routes;
