const ACCESS_TOKEN = process.env.GITHUB_ACCESS_TOKEN;
// Set true to ignore REPO_ALLOW_LIST
const ALLOW_ALL_REPOS = true;
const REPO_ALLOW_LIST = [
  'advent-calendar',
  'Altruist',
  'Asteroid',
  'BrowserRefresh',
  'Bulletin-Board',
  'circle-zindex-example',
  'clock',
  'Color-Map',
  'csv-yaml',
  'DataAllocation',
  'dots',
  'Dream-Defer-Timer',
  'ebay-notifier',
  'embed-googleform-react',
  'export-jekyll',
  'fav-quotes',
  'for-irene',
  'form-gallery',
  'Gatsby-Notebook',
  'GreyAlienResearch',
  'holidays-2020',
  'I-send-you-email-front',
  'I-send-you-email-server',
  'idk',
  'JukeBox',
  'little-library-message-board',
  'Lores27',
  'md-editor',
  'Migration-of-Language-and-Income',
  'Modulos-Design',
  'Natalies-Portfolio',
  'newly-listed-ebay',
  'newly-listed-ebay-webapp',
  'oxford-dictionaries-api',
  'react-loading',
  'Revenge',
  'Simon',
  'SinglePageDevRefresh',
  'Stars-React',
  'Stock-Mining',
  'Suggestions',
  'SunMoonReact',
  'timesince',
  'triangle-poster',
  'Unknown-Timers',
  'unsent-project-clone',
  'UploadtoImgr-googleForm',
  'wall_art',
  'wordsidontknow',
];
const PINNED_REPOS = [
  'unsent-project-clone',
  'GreyAlienResearch',
  'ebay-notifier',
  'wordsidontknow',
  'survivalkits',
  'azul-rojo.github.io',
]
const SUPPORTED_LANGUAGES = [
  "All",
  "TypeScript",
  "CSS",
  "HTML",
  "Java",
  "JavaScript",
  "Python",
  "CoffeeScript",
  // Not supported cause the search does not work for these
  // "SCSS",
  // "Shell"
  // "Sass"
]
const IS_PRODUCTION = true;
const DEFAULT_USERS = ['josue-rojas', 'azul-rojo'];

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
  // defaults
  const data = {
    username: DEFAULT_USERS[0],
    languages: ['All'],
    avatar: '',
    repos: [],
  }
  // First we get all the repos
  const allReposPromise = await Promise.all(DEFAULT_USERS.map(u => getRepos(u)));
  const reposRaw = allReposPromise.reduce((p, c) => [...p, ...c], []);

  // then we map the repos with their languages 
  const { repos, languageFetches } = reposRaw.reduce((prevValue, currentValue) => {
    if (currentValue.visibility !== 'public') return prevValue;
    
    const { repos, languageFetches } = prevValue;
    
    if (!ALLOW_ALL_REPOS && !REPO_ALLOW_LIST.includes(currentValue.name)) return prevValue;

    const {
      name,
      created_at,
      html_url,
      description,
      homepage,
      owner,
    } = currentValue;

    if (IS_PRODUCTION) {
      languageFetches.push(async () => await getRepoLanguage(owner.login, name));
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
    repos[repoName].languagesList = repoLanguageList.filter(l => SUPPORTED_LANGUAGES.includes(l));
  }))

  const allLanaguagesArr = Array.from(languagesSet).filter(l => SUPPORTED_LANGUAGES.includes(l));
  const reposList = Object.values(repos);

  data.languages = [...data.languages, ...allLanaguagesArr];
  data.repos = reposList.filter(r => PINNED_REPOS.includes(r.name));
  data.links = reposList.reduce((p, c) => {
    if (c.html_url) p.push(c.html_url);
    if (c.homepage) p.push(c.homepage);

    return p
  }, [])

  console.log(JSON.stringify(data))

  return true;
}

main();
