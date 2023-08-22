# josue-rojas.github.io
My portfolio page were were I show about me and some projects I have done.

### Built With
React.js and Sass

### Installing / Getting started

```bash
git clone git@github.com:josue-rojas/josue-rojas.github.io.git
cd josue-rojas.github.io
npm install
```

### Scripts
On package.json some main scripts include:
- start: this just starts react and node-sass-chokidar (for sass->css)
- build: this script creates css and uses react build. then adds more info in index.html for the use of [github pages](https://pages.github.com).

There is another script in ./src/data called getgithub.py. This script gets the pinned projects on a github page. You can change the USERNAME_SEARCH in the file to get another user's info. To use this you need to also have an environmetal variable called 'gittoken' which is the token for [github's api.](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/).
