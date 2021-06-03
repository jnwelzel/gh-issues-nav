import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import Explorer from "./features/explorer/Explorer";
import { Repos } from "./features/repos/Repos";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <App />
        </Route>
        <Route path="/:user/:repo" children={<Explorer />} />
        <Route path="/:user" children={<Repos />} />
      </Switch>
    </Router>
  );
};

export default Routes;
