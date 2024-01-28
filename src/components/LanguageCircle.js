import React, { Component } from 'react';
import '../styles/sass/LanguageCircle.css';

export default class LanguageCircle extends Component{
  render () {
    const className = 'language-circle ' +  this.props.language;

    return(
      <span className={className}></span>
  )}
}
