# Userscripts

This userscript project is designed to be:
- Intuitive to develop within
- Use modern modules, TypeScript
- Be webpacked

- [Userscripts](#userscripts)
  - [How to install](#how-to-install)
  - [How to develop](#how-to-develop)
  - [Scripts](#scripts)
    - [Gitlab Pipelines](#gitlab-pipelines)
    - [Gitlab MR list view avatars](#gitlab-mr-list-view-avatars)
    - [Gitlab MR diff performance (WIP)](#gitlab-mr-diff-performance-wip)
  - [Related links](#related-links)
    - [Gitlab Dark Theme](#gitlab-dark-theme)

## How to install

Example: **Gitlab Pipelines**

- Copy the content from: [./build/gitlabPipelines.dist.js](./build/gitlabPipelines.dist.js)
- Open TamperMonkey, create a new script, paste
- Done

## How to develop

- `yarn build --watch`
- Copy the content of `./build/<name>.dev.js` and make a new userscript in your browser.
  - Try [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) if you're on Chrome

From then, the script will always reload whatever is at `./build/<name>.js`.
Refesh your browser to see changes after file save.

## Scripts

### Gitlab Pipelines

> Get it: [./build/gitlabPipelines.dist.js](./build/gitlabPipelines.dist.js)

Open a pipeline dropdown in an MR and click the blue button:

> ![./src/gitlabPipelines/docs/buttons.png](./src/gitlabPipelines/docs/buttons.png)

See the job output:

> ![./src/gitlabPipelines/docs/output.png](./src/gitlabPipelines/docs/output.png)


Notes:
- Clicking a different job's button will replace the current output
- The output will refresh every (default: 2 seconds) while the job is pending.


### Gitlab MR list view avatars

> Get it: [./build/gitlabMrList.dist.js](./build/gitlabMrList.dist.js)

This shows the MR authors avatar on any MR listing, for easier recognition.

> ![./src/gitlabMrList/docs/example.png](./src/gitlabMrList/docs/example.png)


### Gitlab MR diff performance (WIP)

Objective:
- On the MR diff section:
  - [ ] Do not show all files - show only the selected file from the sidebar tree
  - [ ] Do not collapse diffs

## Related links

### Gitlab Dark Theme

Check out [gitlab.com/vednoc/dark-gitlab](https://gitlab.com/vednoc/dark-gitlab)
