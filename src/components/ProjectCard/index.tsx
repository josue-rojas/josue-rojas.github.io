import { LinkButton } from "../Button";
import { Card } from "../Card";
import LanguageCircle from "../LanguageCircle";
import styles from './styles.module.scss';

interface ProjectCardInterface {
  description: string;
  title: string;
  githubLink: {
    href: string;
    text: string;
  }
  websiteLink: {
    href?: string;
    text: string;
  }
  date: string;
  languages: string[];
}

export function ProjectCard(props: ProjectCardInterface) {
  const dateString = new Date(props.date).toDateString();
  return (
    <Card>
      <h1 className={styles.title}>{props.title}</h1>
      <time className={styles.time} dateTime={dateString}>{dateString}</time>
      <div>
        {props.languages.map(language => <LanguageCircle language={language} />)}
      </div>
      <p className={styles.description}>{props.description}</p>
      <div className={styles.linkWrapper}>
        <LinkButton text={props.githubLink.text} href={props.githubLink.href} />
        {props.websiteLink.href && <LinkButton text={props.websiteLink.text} href={props.websiteLink.href} />}
      </div>
    </Card>
  );
}
