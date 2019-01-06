# Userscripts

This userscript project is designed to be:
- Intuitive to develop within
- Use modern modules, TypeScript
- Be webpacked

## How to develop

- `yarn build --watch`
- Copy the content of `./build/<name>.dev.js` and make a new userscript in your browser

From then, the script will always reload whatever is at `./build/<name>.js`.
Refesh your browser to see changes after file save.

## Scripts

### Gitlab Pipelines

- Open a pipeline dropdown in an MR
- Click the blue button:

![./src/gitlabPipelines/docs/buttons.png](./src/gitlabPipelines/docs/buttons.png)

- See the job output:
![./src/gitlabPipelines/docs/output.png](./src/gitlabPipelines/docs/output.png)


Notes:
- Clicking a different job's button will replace the current output
- The output will refresh every (default: 2 seconds) while the job is pending.

### Gitlab MR diff performance (WIP)

Objectives:
- On the MR diff section:
  - [ ] Do not show all files - show only the selected file from the sidebar tree
  - [ ] Do not collapse diffs

### Gitlab MR list view (WIP)

Objectives:
- On a project's MR list view:
  - [ ] Show user icons next to names so that it's easier to spot them

### Gitlab project front page (WIP)

Objectives:
- On a project's file/readme page:
  - [ ] Place the readme at the top of the page, and cap its height
  - [ ] Add the activity data as a capped height section between readme and files

