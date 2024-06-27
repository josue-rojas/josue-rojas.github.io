import { ReactNode } from 'react';
import styles from './styles.module.scss'; 

interface CardProps {
  children: ReactNode;
}

export function Card(props: CardProps) {
  return <div className={styles.card}>{ props.children }</div>
}
