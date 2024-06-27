import { ProjectCard } from '../../components/ProjectCard';
import projects from '../../data/data.json';
import styles from './styles.module.scss';

export function Projects() {
  return (
    <div>
      <div className={styles.cardWrapper}>
        {projects.repos.map((repo) => {
          return (<ProjectCard
            key={repo.name}
            title={repo.name}
            description={repo.description}
            date={repo.created_at}
            languages={repo.languagesList}
            githubLink={{
              href: repo.html_url,
              text: 'Github'
            }}
            websiteLink={{
              href: repo.homepage,
              text: 'Live Link'
            }}
          ></ProjectCard>)
        })}
      </div>
    </div>
  );
}
