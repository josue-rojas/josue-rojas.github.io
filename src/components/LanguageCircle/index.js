import { Component } from 'react';
import styles from './styles.module.scss';

export default class LanguageCircle extends Component{
  render () {
    const className = styles['language-circle']+ ' ' +  styles[this.props.language];

    return(
      <span className={className}></span>
  )}
}
