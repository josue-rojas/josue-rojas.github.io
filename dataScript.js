const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
const REPO_ALLOW_LIST = [
  'advent-calendar',
];
const IS_PRODUCTION = true;
const DEFAULT_USER = 'josue-rojas';

const USER_REPOS_API_URL = (user) => `https://api.github.com/users/${user}/repos?per_page=100`;
const REPOS_LANGUAGE_API_URL = (user, repoName) => `https://api.github.com/repos/${user}/${repoName}/languages`;

async function fetchGithub (url) {
  const fetchOptions = {
    headers: {
      Authorization: `Bearer ${ACCESS_TOKEN}`,
    }
  }
  const response = await fetch(url, fetchOptions);
  const data = await response.json();

  return data;
}

async function getRepos (user) {
  const resposApiUrl = USER_REPOS_API_URL(user);
  
  const reposData = await fetchGithub(resposApiUrl);

  return reposData;
}

async function getRepoLanguage (user, repoName) {
  const languageApiUrl = REPOS_LANGUAGE_API_URL(user, repoName);

  const languageData = await fetchGithub(languageApiUrl);

  return [repoName, languageData];
}

async function main () {
  // First we get all the repos
  const reposRaw = await getRepos(DEFAULT_USER);

  // then we map the repos with their languages 
  const { repos, languageFetches } = reposRaw.reduce((prevValue, currentValue) => {
    if (currentValue.visibility !== 'public') return prevValue;
    
    const { repos, languageFetches } = prevValue;
    
    if (!REPO_ALLOW_LIST.includes(currentValue.name)) return prevValue;

    const {
      name,
      created_at,
      html_url,
      description,
      homepage,
      url,
    } = currentValue;

    if (IS_PRODUCTION) {
      languageFetches.push(async () => await getRepoLanguage(DEFAULT_USER, name));
    } else {
      // only push one if dev as to not run out of credits
      !languageFetches.length && languageFetches.push(async () => await getRepoLanguage(DEFAULT_USER, name));
    }

    repos[name] = {
      name,
      html_url,
      created_at,
      description,
      homepage,
    }

    return { repos, languageFetches };
  }, { repos: {}, languageFetches: [] })


  const languagesResponse = await Promise.all(languageFetches.map(func => func()))

  // merge to languages
  const languagesSet = new Set([]);

  languagesResponse.forEach((repoLanguage => {
    const [repoName, repoLanguages] = repoLanguage;
    const repoLanguageList = Object.keys(repoLanguages);
    
    repoLanguageList.forEach((l) => languagesSet.add(l));
    repos[repoName].languagesList = repoLanguageList;
    repos[repoName].languages = repoLanguages;
  }))

  const data = {
    username: DEFAULT_USER,
    languages: ['All', ...Array.from(languagesSet)],
    avatar: '',
    repos: Object.values(repos),
  }

  console.log(JSON.stringify(data))

  return true;
}

main();
