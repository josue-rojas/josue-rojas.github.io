import React, { Component } from "react";
import "../styles/sass/simple-footer.css";

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
      <footer>
        <a
          style={{ color: color }}
          href="https://github.com/josue-rojas/josue-rojas.github.io"
          onMouseEnter={() => this.toggleHover(true)}
          onMouseLeave={() => this.toggleHover(false)}
        >
          Source Here
        </a>
      </footer>
    );
  }
}
