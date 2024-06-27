import { Component } from "react";
import "../styles/sass/simple-footer.css";
import { GITHUB_PROFILE_SOURCE } from "../constants/profile";

export default class SimpleFooter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hover: false,
    };
    this.toggleHover = this.toggleHover.bind(this);
  }
  toggleHover(isHover) {
    this.setState({ hover: isHover });
  }
  render() {
    const color = this.state.hover
      ? this.props.hover_color
      : this.props.main_color;
    return (
      <footer style={{textAlign: 'center'}}>
        <a
          style={{ color: color }}
          href={GITHUB_PROFILE_SOURCE}
          onMouseEnter={() => this.toggleHover(true)}
          onMouseLeave={() => this.toggleHover(false)}
        >
          Source
        </a>
      </footer>
    );
  }
}
