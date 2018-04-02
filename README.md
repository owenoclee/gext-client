# gext-client
A single-page application client for gext-server (an anonymous textboard built in golang).

This is intended to be hosted on a simple server. Currently only 3 files (less than 100KB gzipped)
need to be served to the user. Page rendering and routing is done on the client-side thanks to
[Vue.js](https://github.com/vuejs/vue) and [vue-router](https://github.com/vuejs/vue-router). Posts
are fetched from gext-server using [protobuf](https://github.com/google/protobuf) and as such
require very little bandwidth.

## Dependencies
Dependencies are managed by npm.

```
npm install
```

## Configuration
Configuration files are located in `src/js/cfg`. Modify them before building.

## Building
During development:

```
npm run build-dev
```

For production (minified):

```
npm run build
```
