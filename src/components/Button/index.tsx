import styles from './styles.module.scss';

interface LinkButtonInterface {
  text: string;
  href: string;
}

export function LinkButton(props: LinkButtonInterface) {
  return <a className={styles.button} href={props.href}>{props.text}</a>
}
