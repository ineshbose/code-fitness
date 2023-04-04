<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
  <img alt="Code Fitness logo" src="https://raw.githubusercontent.com/ineshbose/code-fitness/main/.github/logo.svg" height="250px">

  <h3 align="center">Code Fitness 💪</h3>

  <!-- BADGES / SHIELDS -->

  <p align="center">
  </p>
</p>
</div>


<div align="center">
<p align="center">
Code Fitness aims to understand and improve Developer Experience (DX) and Project Health by bringing relevant metrics to your IDE; developed for <a href="https://www.gla.ac.uk/undergraduate/degrees/computingscience/?card=course&code=COMPSCI5073P" target="_blank">MSci Research Proposal and Project</a> under the supervision of <a href="https://www.dcs.gla.ac.uk/~tws/" target="_blank">Dr. Tim Storer</a>.</p>
</div>

## 🔧 Getting Started

Clone the repository using [Git](https://git-scm.com/), or download a [ZIP](https://github.com/ineshbose/code-fitness/archive/main.zip). Open the directory in [Visual Studio Code](https://code.visualstudio.com/). You should have [Node.js](https://nodejs.dev) installed with [Corepack](https://github.com/nodejs/corepack) enabled and [Yarn](https://classic.yarnpkg.com/lang/en/) available as package manager (for workspaces).

```sh
> git clone https://github.com/ineshbose/code-fitness   # clone using git
> code code-fitness                  # open in vscode
> npm i -g yarn                      # if yarn isn't installed
> corepack enable                    # if corepack isn't enabled
> yarn install                       # install dependencies
> yarn build                         # no stubs for webview
```

After build, using the [`launch.json`](https://github.com/ineshbose/code-fitness/blob/main/.vscode/launch.json) configuration, go to [Run and Debug](https://code.visualstudio.com/docs/editor/debugging) and launch the extension. Additionally, provide environment variables using [`.env.example`](https://github.com/ineshbose/code-fitness/blob/main/.env.example) to help test and debug.

<table width="100%">
<!-- <thead>
  <tr>
    <td colspan="2"><h3><b>Built using / Technologies</b></h3></td>
  </tr>
</thead> -->
<tbody>
  <tr>
    <td><!-- h5 --><b>Ecosystem</b><!-- /h5 --></td>
    <td><a href="https://code.visualstudio.com/" target="_blank"><img src="https://img.shields.io/badge/VSCode-007acc.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white" alt="VSCode" /></a> <a href="kit.svelte.dev" target="_blank"><img src="https://img.shields.io/badge/sveltekit-ff3e00.svg?style=for-the-badge&logo=svelte&logoColor=white" alt="SvelteKit" /></a> <a href="https://www.typescriptlang.org/" target="_blank"><img src="https://img.shields.io/badge/TypeScript-3178c6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a><!-- br / --> <a href="https://vitejs.dev/" target="_blank"><img src="https://img.shields.io/badge/vite-646CFF.svg?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a> <a href="https://vitest.dev/" target="_blank"><img src="https://img.shields.io/badge/vitest-6e9f18.svg?style=for-the-badge&logo=vitest&logoColor=white" alt="Vitest" /></a> <a href="https://unjs.io/" target="_blank"><img src="https://img.shields.io/badge/UnJS-EFDA4F?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEYAAABGCAYAAABxLuKEAAAAAXNSR0IArs4c6QAAAz5JREFUeF7tl19IU1EcxzdKYwb7h1m6EA3SQdJGoXuwaX9nCUlP80GjggpCwgrswRAi6dl66iWoiAKFQMWMzIq59rANzKsGbZSKOUcksw1ymcqNc+HK2drd3QFjbnzv09nOufee3+d+fr9zjlKhUPAKXP8QUAJMYisARiJbAAZg2AopjIExMIaNAIxh44UaA2NgDBsBGMPGCzUGxsAYNgIwho0XagyMgTFsBGAMGy/UGBgDY9gIwBg2XqgxMAbGsBGAMWy8UGNgDIxhIwBj2HihxsAYGMNGAMaw8UKNgTEwho0AjGHjhRoDY2AMG4HNZEylWe/vuGEMvhiYVz3pmamSikSryYl0dZpGfywsK2/emailx52zl3guNpf8OX3Wtf9neEXd1lLuunZ5b36eaku5OG4puuZrvzsZTvYOqXenpcY4+4+4Kozqap5XhPXlfRqpyZFg21uN1aTfZnf6vWOhMtImwKa99WrS7n0177Ad3rmLBhL/PDLmQqs3BqycVmkB89V9ktPrtpnI5HRlfZJzfHS/0nHmVJEQUNMVDzf4NijcU3+skHv2oEpo09e3QNQ9OrEYJf+dqC0oylNtFUCS6+Dx4cDU7C+DHBCxPyvA8DwfqWv8EPSOhdbTiAQomknak58jLmvDe8G+VK6sAGOzO33xUMTgQ76GiFKpVJN6YzANxIBLBijjwczORT2mo0OSBTzVtI2HlPFg5AorwEjkBcAATOxyLZdK9MqUbGuwKWpMqpNNZR8jB4Z+xqYHIxVw/Ffj3tk8xbtVwopDB0Vv8LIKTKVZ7xvqsQp7CrK/2FfzupCcd2gwdPBL0VW/wfRyfRebtWAIAHq1WF3j5wbezH/p7g3oCnbk/r7UVLpSYdQcEkFd7+Dcj7tnLOJvFjAZtSqRALWanPCnEdt3+jyTaGF5+Hza0XZ7POYASBsnl0r9T6tHrJb8mvh0lDsWpGWDJ06KwLnXaf7YUFd4gGzb6cmGFpe5q7c4fnA4aE4UBDFBp80tbW7xTkmNIfedbyxxd3WaLBlxVkoU6J7i7XPGMvUC6UsWqNyX3qj+tBqzUUH8j+cAjARVgAEYtoSDMTAGxrARgDFsvFBjJHj9BbkI/BBgmEI9AAAAAElFTkSuQmCC" alt="UnJS" /></a></td>
  </tr>
  <tr>
    <td><!-- h5 --><b>Management</b><!-- /h5 --></td>
    <td><a href="https://classic.yarnpkg.com/" target="_blank"><img src="https://img.shields.io/badge/Yarn-2C8EBB?style=for-the-badge&logo=yarn&logoColor=white" alt="yarn" /></a> <a href="https://turbo.build/repo" target="_blank"><img src="https://img.shields.io/badge/Turborepo-000000?style=for-the-badge&logo=turborepo&logoColor=EF4444" alt="turborepo" /></a> <a href="https://eslint.org/" target="_blank"><img src="https://img.shields.io/badge/eslint-4b32c3?style=for-the-badge&logo=eslint&logoColor=white" alt="ESLint" /></a><!-- br / --> <a href="https://prettier.io/" target="_blank"><img src="https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7B93E" alt="Prettier" /></a> <a href="https://github.com/airbnb/javascript" target="_blank"><img src="https://img.shields.io/badge/Code_Style-FF5A5F?style=for-the-badge&logo=airbnb&logoColor=ffffff" alt="Airbnb code style" /></a> <a href="https://commitlint.js.org/" target="_blank"><img src="https://img.shields.io/badge/commitlint-000000?style=for-the-badge&logo=commitlint" alt="commitlint" /></a></td>
  </tr>
  <tr>
    <td><!-- h5 --><b>Services</b><!-- /h5 --></td>
    <td><a href="https://github.com/" target="_blank"><img src="https://img.shields.io/badge/GitHub-000?style=for-the-badge&logo=github" alt="GitHub" /></a> <a href="https://stgit.dcs.gla.ac.uk" target="_blank"><img src="https://img.shields.io/badge/stgit-000?style=for-the-badge&logo=gitlab" alt="stgit" /></a> <a href="https://wakatime.com/" target="_blank"><img src="https://img.shields.io/badge/WakaTime-000?style=for-the-badge&logo=wakatime" alt="WakaTime" /></a></td>
  </tr>
</tbody>
</table>

## 🗺️ Project Layout

<!-- markdownlint-disable-next-line MD042 -->
- [`.`](#) Root of repository with directories of different concerns
- [`package.json`](/package.json) is the repository module handler using [Yarn Workspaces](https://classic.yarnpkg.com/lang/en/docs/workspaces/) and [Git Hooks](https://github.com/yyx990803/yorkie)
- [`docs`](/docs) contains the source code for the dissertation and relevant documents
- [`docs/README.md`](/docs/README.md) further breaks down the structure for the documentation
- [`packages`](/packages) contains all the individual utilities that this project creates to build on each other
- [`packages/README.md`](/packages/README.md) provides explanation on for each package in the monorepo
- [`.vscode`](/.vscode) includes relevant workspace configuration for Visual Studio Code
- [`.env.example`](/.env.example) is an example of a `.env` file that can be used to read environment variables
- [`turbo.json`](/turbo.json) [configures](https://turbo.build/repo/docs/reference/configuration) the behaviour for the Turbo commands & pipelines
- [`.github`](/.github) contains metafiles and YAMLs, in [`/workflows`](/.github/workflows), for [GitHub Actions](https://github.com/features/actions)

Files (with/without extension) starting with `.` and/or ending with `{config,rc}` are likely for configuration.

## 📟 License & Contact

Available under the [MIT License](https://github.com/ineshbose/code-fitness/blob/main/LICENSE). Acknowledgements to all packages and libraries used in this project, including the ones listed above; all are licensed and used with compliance to requirements (list should be available [here](https://libraries.io/github/ineshbose/code-fitness)). If you have questions about this project or want to share feedback, you can [open an issue](https://github.com/ineshbose/code-fitness/issues/new) or contact:

<table>
<thead>
  <tr>
    <td rowspan="2">Inesh Bose</td>
    <td>2504266@student.gla.ac.uk / Inesh.Bose@glasgow.ac.uk</td>
  </tr>
  <tr>
    <td>(or any platform you can find me on)</td>
  </tr>
</thead>
</table>

Project Link: <https://github.com/ineshbose/code-fitness/>

---

<div align="right">
<p align="right">
  <a href="#">
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/ineshbose/code-fitness?style=flat-square">
    <img alt="GitHub repo size" src="https://img.shields.io/github/repo-size/ineshbose/code-fitness?style=flat-square">
  </a>
</p>
</div>
