# Userscripts

> This project is designed for a good userscript development experience

- [Userscripts](#userscripts)
  - [Scripts](#scripts)
    - [Gitlab Inline Pipelines](#gitlab-inline-pipelines)
    - [Gitlab MR list avatars](#gitlab-mr-list-avatars)
    - [Gitlab MR diff performance (WIP)](#gitlab-mr-diff-performance-wip)
  - [Contributing](#contributing)

## Scripts

Use [Tampermonkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) to installfrom the links below.

### Gitlab Inline Pipelines

:tv: [Install (gitlabPipelines.dist.user.js)](https://github.com/nfour/userscripts/raw/master/build/gitlabPipelines.dist.user.js)

Open a pipeline dropdown on an MR, then click the new button:

> ![./src/gitlabPipelines/docs/buttons.png](./src/gitlabPipelines/docs/buttons.png)

See the job output:

> ![./src/gitlabPipelines/docs/output.png](./src/gitlabPipelines/docs/output.png)

Notes:
- Clicking a different job's button will replace the current output
- The output will refresh every (default: 2 seconds), while the job is pending.

### Gitlab MR list avatars

:tv: [Install (gitlabMrList.dist.user.js)](https://github.com/nfour/userscripts/raw/master/build/gitlabMrList.dist.user.js)

Shows the MR authors avatar on any MR listing.

> ![./src/gitlabMrList/docs/example.png](./src/gitlabMrList/docs/example.png)

-------------------------------------------------------------------------------------------

## Configure Tampermonkey for development

See this issue https://github.com/Tampermonkey/tampermonkey/issues/475

You'll want to configure Tampermonkey to allow for `@require` resources to `Always` be requested in order to prevent caching.

Even then, it may cost 2 page refreshes to see changes. 

## Contributing

- `yarn build --watch`
- Install `./build/<name>.dev.js` as a new userscript in Tampermonkey.

From then, the script will always reload whatever is at `./build/<name>.js`.
Refesh your browser to see changes after file save. This may require 2 refreshes due to issues within tampermonkey.
