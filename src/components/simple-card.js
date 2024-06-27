// props
// social: object of <Social Site>: <Link of site>
// hover_color: color when links are hovered
// main_color:  main color (text, links, icons, etc)
// profile_image: src for profile image
// title: title of card
// sub_title: subt title of card
// this component is a simple card that....
import React, { Component } from "react";
// things the card uses
import RoundIcon from "./round-icons";
import HiddenLinks from "./simple-hidden-links";
import "../styles/sass/simple-card.css";

// icons supported (for social link)
import Instagram from "../images/svg/Instagram_simple_icon.svg";
import Facebook from "../images/svg/Facebook_simple_icon.svg";
import LinkedIn from "../images/svg/LinkedIn_simple_icon.svg";
import Github from "../images/svg/Github_simple_icon.svg";
// import Twitter from "../images/svg/Twitter_icon.svg";
import Twitter from "../images/svg/twitter.svg";

const icons = {
  Instagram: Instagram,
  Facebook: Facebook,
  LinkedIn: LinkedIn,
  Github: Github,
  Twitter: Twitter,
};

export default class SimpleCard extends Component {
  componentDidMount() {
    document.title = "Josue's Porfolio";
  }

  makeSocialBar(sociality, main_color, hover_color) {
    let socialBar = [];
    for (let key in sociality) {
      socialBar.push(
        <RoundIcon
          key={key}
          icon={icons[key]}
          main_color={main_color}
          hover_color={hover_color}
          link={sociality[key]}
        />
      );
    }
    return socialBar;
  }

  render() {
    const socialbar = this.makeSocialBar(
      this.props.social,
      this.props.main_color,
      this.props.hover_color
    );
    // TODO: links shoud be a prop
    const links = {
      // About: "/#about",
      Projects: "/#projects",
      Resume: `${window.location.host}/resume.pdf`,
      Random: "/#random",
    };
    return (
      <div className="card view">
        <div
          className="image"
          style={{ backgroundImage: "url(" + this.props.profile_image + ")" }}
        ></div>
        <div>
          <div className="title">{this.props.title}</div>
          <div className="sub-title">{this.props.sub_title}</div>
        </div>
        {socialbar}
        <HiddenLinks
          links={links}
          main_color={this.props.main_color}
          hover_color={this.props.hover_color}
        />
      </div>
    );
  }
}
