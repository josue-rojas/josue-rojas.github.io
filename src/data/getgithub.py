from __future__ import division
from bs4 import BeautifulSoup
import requests, json, os
import dateutil.parser as dp
# TODO: repos that change name are not appearing (might take some time or something wrong, either way its time to investigate)

'''
this script is to get github public projects with their info.
modidfied to only get pinned repos
'''

USERNAME_SEARCH = 'josue-rojas'


def getPinnedNames():
    r = requests.get('https://github.com/'+USERNAME_SEARCH).content
    soup = BeautifulSoup(r, features="html.parser")
    repo_pinned_box = soup.find_all('div', {'class': 'pinned-repo-item-content'})
    pinnedLinks = []
    owners = []
    for box in repo_pinned_box:
        span = box.find('span', {'class': 'repo js-repo'})
        # some pinned repos might not be own by the same user
        owner = box.find('span', {'class': 'owner text-normal'})
        owners.append(owner.get_text() if owner else USERNAME_SEARCH);
        pinnedLinks.append(span.get_text());
    return (pinnedLinks, owners)

def getSearchablelanguages():
    r = requests.get('https://github.com/'+USERNAME_SEARCH+'?tab=repositories').content
    soup = BeautifulSoup(r, features="html.parser")
    container = soup.find_all('div', {'class': 'select-menu d-inline-block js-menu-container js-select-menu select-menu-modal-right'})[1].find_all('span', {'class':'select-menu-item-text js-select-button-text'})#should be the second one...
    langs = []
    for input in container:
        langs.append(input.get_text())
    return langs

findList, ownerList = getPinnedNames() #repos to find
basicInfo = requests.get('https://api.github.com/users/'+USERNAME_SEARCH,auth=('josue-rojas',os.environ['gittoken'])).json()
# repos = requests.get('https://api.github.com/users/'+USERNAME_SEARCH+'/repos',auth=('josue-rojas',os.environ['gittoken'])).json()
allLanguages = getSearchablelanguages()


def languagePercent(langs):
    total = 0
    for language in langs.keys():
        total+= langs[language]
        # allLanguages.add(language) #this should be more locally scope but this works fine for now
    for language in langs.keys():
        langs[language] = (langs[language]/total) * 100
    return langs

# filter the information and store it in a list where each element is a repo
def getInfo():
    repoJson = []
    # info filter are just simple filter from the json data we get, if the information needs to be cleaned or modified then it is done after
    info_filter = ['name', 'html_url', 'description', 'created_at', 'homepage']
    for repo_name, repo_owner in zip(findList, ownerList):
        repo = requests.get('https://api.github.com/repos/'+repo_owner+'/'+repo_name,auth=('josue-rojas',os.environ['gittoken'])).json()
        singleJson = {}
        languagesInfo = languagePercent(requests.get(repo['languages_url'],auth=('josue-rojas',os.environ['gittoken'])).json()) if repo['languages_url'] else []
        singleJson['languages'] = languagesInfo
        singleJson['languagesList'] = languagesInfo.keys()
        singleJson['datevalue'] = dp.parse(repo['created_at']).strftime('%s') if repo['created_at'] else ''
        for filter in info_filter:
            singleJson[filter] = repo[filter] if repo[filter] else ''
        repoJson.append(singleJson)
    return repoJson

# this returns a json object (how i wanted)
# getInfo() should be run first to get allLanguages
def organizeData(repoJson, allLanguages=allLanguages):
    dataJson = {
        'fullname': basicInfo['name'],
        'username': USERNAME_SEARCH,
        'avatar_url': basicInfo['avatar_url'],
        'languages':list(allLanguages),
        'repos': repoJson
    }
    return dataJson

def main():
    repoJson = getInfo()
    with open('data.json','w') as jsonfile:
        json.dump(organizeData(repoJson), jsonfile)
    os.chdir(os.getcwd())
    print('Done')
    # os.system('cd '+ os.getcwd()+ '; json2yaml data.json > data.yml') #it's easier to use so i've heard, plus it looks pretty

main()
