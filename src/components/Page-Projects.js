import React, { Component } from "react";
import SimpleContainer from "./simple-container";
import RoundIcon from "./round-icons";
import Github from "../images/svg/Github_simple_icon.svg";
import "../styles/sass/Projects-Page.css";
import ProjectBox from "./ProjectBox";
// import LanguageCircle from './LanguageCircle';
import all_projects from "../data/data.json";

export default class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeBox: -1,
    };
    this.projectBoxClick = this.projectBoxClick.bind(this);
  }

  projectBoxClick(e, i) {
    let activeBox = this.state.activeBox === i ? -1 : i;
    this.setState({ activeBox: activeBox });
  }

  addProjectBox(repos) {
    const project_box = [];
    repos.forEach((repo, i) => {
      project_box.push(
        <ProjectBox
          key={repo["name"]}
          num={i}
          onClick={this.projectBoxClick}
          showing={this.state.activeBox === i}
          languages={repo["languagesList"]}
          title={repo["name"]}
          date={repo["created_at"]}
          description={repo["description"]}
          url={repo["html_url"]}
          projectLink={repo["homepage"]}
        />
      );
    });
    return project_box;
  }

  makeLangCircles(langs) {
    let langCir = [];
    for (let l of langs) {
      // might cause error (not show) if the sass for language-circles doesnt exist maybe make language circles have option for links
      langCir.push(
        <a
          key={l}
          className={`language-circle ${l}`}
          href={`https://github.com/josue-rojas?utf8=✓&tab=repositories&language=${l}`}
        >
          <span className="language-link-text">{l}</span>
        </a>
      );
    }
    return langCir;
  }

  render() {
    const main_color = "#989DA1";
    const hover_color = "#05fbff";
    return (
      <SimpleContainer
        title="Josue's Projects"
        box_title="Featured Projects"
        main_color={main_color}
        hover_color={hover_color}
      >
        <div className="project-boxes">
          {this.addProjectBox(all_projects["repos"])}
        </div>
        <div className="container-footer">
          <div className="text">Check out more at</div>
          <RoundIcon
            key={"simple-container github"}
            icon={Github}
            main_color={main_color}
            hover_color={hover_color}
            link={"https://github.com/josue-rojas"}
          />
          <div className="language-search-bar">
            {this.makeLangCircles(all_projects["languages"])}
          </div>
        </div>
      </SimpleContainer>
    );
  }
}
