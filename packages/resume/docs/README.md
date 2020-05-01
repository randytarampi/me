```plaintext
$$$$$$\$$$$\   $$$$$$\       $$$$$$\   $$$$$$\   $$$$$$$\ $$\   $$\ $$$$$$\$$$$\   $$$$$$\
$$  _$$  _$$\ $$  __$$\     $$  __$$\ $$  __$$\ $$  _____|$$ |  $$ |$$  _$$  _$$\ $$  __$$\
$$ / $$ / $$ |$$$$$$$$ |    $$ |  \__|$$$$$$$$ |\$$$$$$\  $$ |  $$ |$$ / $$ / $$ |$$$$$$$$ |
$$ | $$ | $$ |$$   ____|    $$ |      $$   ____| \____$$\ $$ |  $$ |$$ | $$ | $$ |$$   ____|
$$ | $$ | $$ |\$$$$$$$\ $$\ $$ |      \$$$$$$$\ $$$$$$$  |\$$$$$$  |$$ | $$ | $$ |\$$$$$$$\
\__| \__| \__| \_______|\__|\__|       \_______|\_______/  \______/ \__| \__| \__| \_______|
```

[![npm versions](https://img.shields.io/npm/v/@randy.tarampi/resume.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/resume) [![npm downloads](https://img.shields.io/npm/dt/@randy.tarampi/resume.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/resume) [![npm bundle size (minified)](https://img.shields.io/bundlephobia/min/@randy.tarampi/resume.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/resume) [![npm bundle size (minified + gzip)](https://img.shields.io/bundlephobia/minzip/@randy.tarampi/resume.svg?style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/resume) [![npm license](https://img.shields.io/npm/l/@randy.tarampi/resume.svg?registry_uri=https%3A%2F%2Fregistry.npmjs.com&style=flat-square)](https://www.npmjs.com/package/@randy.tarampi/resume) [![Analytics](https://ga-beacon.appspot.com/UA-50921068-1/beacon/github/randytarampi/me/tree/master/packages/resume?flat&useReferrer)](https://github.com/igrigorik/ga-beacon)

[![Install @randy.tarampi/resume](https://nodeico.herokuapp.com/@randy.tarampi/resume.svg)](https://www.npmjs.com/package/@randy.tarampi/resume)

The backing markup and styles for [`jsonresume-theme-randytarampi`](../jsonresume-theme) and my resume in [`www`](../www) – [online](https://www.randytarampi.ca/resume) and [in print](https://github.com/randytarampi/me/blob/master/packages/resume/docs/resume.pdf).

**You probably want to head over to [job-application](../job-application) instead, since it offers some additional niceties.**

1. Place a JS/JSON/JSX file (say [`some-awesome-company.json`](./src/resumes/some-awesome-company.json)) that can be parsed into an instance of [`Resume`](./src/lib/resume) in `/src/resumes`
2. Generate your resumes by running `npm run resume`
3. View it with [`open ./dist/some-awesome-company.pdf`](./dist/some-awesome-company.pdf)

# Dependencies

See the [`me` dependencies](../../README.md#Dependencies).

# Installation

See the [`me` installation instructions](../../README.md#Installation).

# Usage

```
# From the `me` monorepo root
yarn lerna run start --scope=@randy.tarampi/resume
```

# Testing

```
# From the `me` monorepo root
yarn lerna run test --scope=@randy.tarampi/resume
```

# Generation

```
# From the `me` monorepo root
yarn lerna run build --scope=@randy.tarampi/resume
yarn lerna run resume --scope=@randy.tarampi/resume
```
