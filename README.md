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

Usage:
- Open a pipeline dropdown in an MR
  - Click the new icon, this will open job output below
  - Clicking a different job's icon will replace the current output
  - The output will refresh every (default: 2 seconds)


Notes:
- `GITLAB_TOKEN` does not need to be set at this time

### Gitlab MR's (WIP)

- The MR view
  - The diff view
    - [ ] Do not show all files - show only the selected file from the sidebar tree
  - The discussion view
    - [ ] Reformat information to be more like Github in readability

### Gitlab MR list view (WIP)

- The project MR list view
  - [ ] Show user icons next to names so that it's easier to spot them

