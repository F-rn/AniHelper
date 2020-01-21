import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/page_home";
import Dashboard from "./pages/page_dashboard";
import AuthCheck from "./components/userCheck";
import AnimeCompleted from './pages/page_AnimeCompleted'
import Login from './components/login'
import "./css/style.css";
import AnimeDetails from "./pages/page_animeDetails";
import AnimePlanning from './pages/page_AnimePlanning'
import AnimeDropped from './pages/page_AnimeDropped'
import AnimeRepeating from './pages/page_AnimeRepeating'
import AnimePaused from './pages/page_AnimePaused'
import Search from './pages/page_Search'

function App() {
  return (
    <Router>
      <Switch>
        <AuthCheck>
          <Route path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/completed" component={AnimeCompleted} />
          <Route exact path="/planning" component={AnimePlanning}/>
          <Route exact path="/dropped" component={AnimeDropped}/>
          <Route exact path="/repeating" component={AnimeRepeating}/>
          <Route exact path="/paused" component={AnimePaused}/>
          <Route exact path="/anime" component={AnimeDetails} />
          <Route exact path="/search" component={Search} />
        </AuthCheck>
      </Switch>
    </Router>
  );
}

export default App;
