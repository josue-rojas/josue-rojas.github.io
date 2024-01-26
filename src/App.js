import React, { Component } from "react";
import SimpleBackground from "./components/simple-background.js";
import SimpleCard from "./components/simple-card.js";
import AboutPage from "./components/Page-About";
import ProjectsPage from "./components/Page-Projects";
import SimpleFooter from "./components/simple-footer.js";
import "./styles/sass/app.css";
import space from "./images/space.jpg";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_view: ["#projects", "#about"].includes(window.location.hash)
        ? true
        : false,
      page: window.location.hash,
    };
    this.changeWindow = this.changeWindow.bind(this);
  }
  // change state when window.location change
  // https://stackoverflow.com/questions/38965807/how-to-rerender-a-component-when-hash-change-and-change-the-state
  componentDidMount() {
    window.addEventListener("hashchange", this.changeWindow, false);
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.changeWindow, false);
  }

  changeWindow(h) {
    this.setState({
      active_view: ["#projects", "#about"].includes(window.location.hash)
        ? true
        : false,
      page: window.location.hash,
    });
  }

  // sort of handle the routes (views)
  getView(page) {
    switch (page) {
      case "#about":
        return <AboutPage />;
      case "#projects":
        return <ProjectsPage />;
      case "#random":
        const random_links = [
          "http://josue-rojas.github.io/fav-quotes/",
          "http://josue-rojas.github.io/Stars-React/#300",
          "https://github.com/azul-rojo/survivalkits",
          "https://github.com/josue-rojas/dots",
          "https://github.com/josue-rojas/ebay-notifier",
          "https://github.com/josue-rojas/SunMoonReact",
          "https://github.com/josue-rojas/unsent-project-clone",
          "https://josue-rojas.github.io/react-loading/",
          "https://sites.google.com/site/josuerojasportfolio/python/migration-of-language-and-income",
          // "https://calendarttp.herokuapp.com/",
          // "https://publicsuggestions.herokuapp.com/",
          // "https://unkown-timers.herokuapp.com/",
        ];
        window.location.hash = "#home";
        window.location =
          random_links[Math.floor(Math.random() * random_links.length)];
      // fall through
      default:
        return (
          <SimpleCard
            social={{
              Github: "https://github.com/josue-rojas",
              LinkedIn: "https://www.linkedin.com/in/josuerojasz/",
              Twitter: "https://www.twitter.com/withcheesepls/",
              Instagram: "https://www.instagram.com/withcheesepls/",
              Facebook: "https://www.facebook.com/withcheesepls",
            }}
            hover_color="#05fbff"
            main_color="#989DA1"
            profile_image="https://avatars0.githubusercontent.com/u/10749061"
            title="Josue Rojas"
            sub_title="Software Engineer / Wonderer"
          />
        );
    }
  }

  render() {
    const background = (
      <SimpleBackground
        backgroundImage={space}
        active={this.state.active_view}
      />
    );
    return (
      <div>
        {background}
        <div className="view-wrapper">
          {this.getView(this.state.page)}
          <SimpleFooter main_color={"#989DA1"} hover_color={"#05fbff"} />
        </div>
      </div>
    );
  }
}

export default App;
