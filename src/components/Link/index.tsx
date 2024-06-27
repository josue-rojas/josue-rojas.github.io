import { ReactNode } from "react";
import styles from './styles.module.scss';

interface LinkProps {
  children: ReactNode;
  href: string;
}

export function Link(props: LinkProps) {
  return <a className={styles.link} href={props.href}>{props.children}</a>
}
