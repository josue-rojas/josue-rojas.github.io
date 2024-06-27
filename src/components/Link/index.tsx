import { ReactNode } from "react";
import styles from './styles.module.scss';
import classnames from 'classnames';

interface LinkProps {
  children: ReactNode;
  href: string;
  className?: string;
}

export function Link(props: LinkProps) {
  return <a className={classnames(props.className, styles.link)} href={props.href}>{props.children}</a>
}
