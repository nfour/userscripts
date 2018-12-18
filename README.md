# Userscripts

This is a userscript project designed to be:
- Quick to develop within
- Use TypeScript

## Scripts

- Gitlab Pipelines

## How to develop

### Initial setup

- `yarn build`
- Copy the content of `./build/<name>.dev.js` and make a new userscript in your browser

From then, the script will always reload whatever is at `./build/<name>.js`

Then just run: `yarn build --watch` and refesh your the browser to see changes
