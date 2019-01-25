# Userscripts



## Install

### Gitlab Inline Pipelines

> [Gitlab MR Inline Pipelines (gitlabPipelines.dist.user.js)](https://github.com/nfour/userscripts/raw/master/build/gitlabPipelines.dist.user.js)

Open a pipeline dropdown on an MR, then click the new button:

> ![./src/gitlabPipelines/docs/buttons.png](./src/gitlabPipelines/docs/buttons.png)

See the job output:

> ![./src/gitlabPipelines/docs/output.png](./src/gitlabPipelines/docs/output.png)

Notes:
- Clicking a different job's button will replace the current output
- The output will refresh every (default: 2 seconds), while the job is pending.

### Gitlab MR list avatars

> [Gitlab MR List Avatars (gitlabMrList.dist.user.js)](https://github.com/nfour/userscripts/raw/master/build/gitlabMrList.dist.user.js)
> Get it: [./build/gitlabMrList.dist.js](./build/gitlabMrList.dist.js)

Shows the MR authors avatar on any MR listing.

> ![./src/gitlabMrList/docs/example.png](./src/gitlabMrList/docs/example.png)


### Gitlab MR diff performance (WIP)

Objective:
- On the MR diff section:
  - [ ] Do not show all files - show only the selected file from the sidebar tree
  - [ ] Do not collapse diffs

-------------------------------------------------------------------------------------------

## Contributing

- `yarn build --watch`
- Copy the content of `./build/<name>.dev.js` and make a new userscript in your browser.
  - Try [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) if you're on Chrome

From then, the script will always reload whatever is at `./build/<name>.js`.
Refesh your browser to see changes after file save.
