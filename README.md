# Userscripts

This is a userscript project designed to be:
- Quick to develop within
- Use TypeScript

## Scripts

### Gitlab Pipelines (WIP) (In progress)

- On the MR view
  - When inspecting the pipeline dropdown
    - [ ] Add a button to quick-view the pipeline log output inline on the page
    - [ ] Find out if its possible to improve polling times for pipeline statuses

### Gitlab MR's (WIP)

- The MR view
  - The diff view
    - [ ] Do not show all files - show only the selected file from the sidebar tree
  - The discussion view
    - [ ] Reformat information to be more like Github in readability

### Gitlab MR list view (WIP)

- The project MR list view
  - [ ] Show user icons next to names so that it's easier to spot them

## How to develop

### Initial setup

- `yarn build`
- Copy the content of `./build/<name>.dev.js` and make a new userscript in your browser

From then, the script will always reload whatever is at `./build/<name>.js`

Then just run: `yarn build --watch` and refesh your the browser to see changes

