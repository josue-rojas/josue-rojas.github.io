import { Component } from "react";
import SimpleBackground from "./components/simple-background.js";
import SimpleCard from "./components/simple-card.js";
import AboutPage from "./components/Page-About";
import ProjectsPage from "./components/Page-Projects";
import SimpleFooter from "./components/simple-footer.js";
import "./styles/sass/app.css";
import space from "./images/space.jpg";
import all_project from './data/data.json';
import { FACEBOOK_URL, INSTAGRAM_URL, LINKEDIN_URL, TWITTER_URL } from "./constants/socials.js";
import { GITHUB_PROFILE, NAME } from "./constants/profile.js";
import styles from './styles.module.scss';
import { Home } from "./view/Home.tsx";
import { NavBar } from "./components/NavBar/index.tsx";
import { Layout } from "./components/Layout";
import { NAVBAR_LINKS } from "./constants/navbar";
import { Projects } from "./view/Projects";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active_view: ["#projects", "#about"].includes(window.location.hash),
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
      active_view: ["#projects", "#about"].includes(window.location.hash),
      page: window.location.hash,
    });
  }

  // sort of handle the routes (views)
  getView(page) {
    switch (page) {
      case "#about":
        return <AboutPage />;
      case "#projects":
        return <Projects />;
      case "#random":
        const random_links = all_project.links || [];
        window.location.hash = "#home";
        window.location =
          random_links[Math.floor(Math.random() * random_links.length)];
      // fall through
      default:
        return <Home />
    }
  }

  render () {
    return (
      <Layout>
        <NavBar
          title={NAME}
          links={NAVBAR_LINKS}
        />
        <div className={styles.view}>
            {this.getView(this.state.page)}
        </div>
        <SimpleFooter />
      </Layout>
    )
  //   return (
  //       {/* <SimpleBackground
  //         backgroundImage={space}
  //         active={this.state.active_view}
  //       /> */}
  //       {/* <div className="view-wrapper">
  //         {this.getView(this.state.page)}
  //         <SimpleFooter main_color={"#989DA1"} hover_color={"#05fbff"} />
  //       </div> */}
  //     <Layout>
  //       <NavBar title={NAME} />
  //       {this.getView(this.state.page)}
  //     </Layout>
  //   );
  }
}

export default App;
