import styles from './styles.module.scss';

interface NavBarProps {
  links: {
    text: string;
    href: string;
  }[];
  title: string;
}

export function NavBar(props: NavBarProps) {
  return (
    <nav className={styles.navbar}>
      <div className={styles.titleWrapper}>
        {props.title.split(' ').map((word) =>
          <h1 key={word} className={styles.title}>{word}</h1>)}
      </div>
      <div className={styles.links}>
        {props.links.map((link) => <a key={link.href} className={styles.link} href={link.href}>{ link.text }</a>)}
      </div>
    </nav>
  );
}
