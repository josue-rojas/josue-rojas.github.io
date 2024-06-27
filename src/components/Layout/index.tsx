import { ReactNode } from "react";
import styles from './styles.module.scss';

interface LayoutProps {
  children: ReactNode;
}

export function Layout(props: LayoutProps) {
  return <div className={styles.layout}>
    {props.children}
  </div>
}
