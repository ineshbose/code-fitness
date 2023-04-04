<!-- PROJECT LOGO -->
<br />
<div align="center">
<p align="center">
  <img alt="Code Fitness logo" src="https://raw.githubusercontent.com/ineshbose/code-fitness/main/.github/logo.svg" height="250px">

  <h3 align="center">Code Fitness</h3>
  <h4 align="center">Internal Shared Package Registry</h4>

  <p align="center">
  </p>
</p>
</div>

## eslint

To ensure code quality and reliability, [eslint](https://eslint.org) must be configured (in addition to [prettier](https://prettier.io)). However, with a *relatively* big and complex codebase (also looking to use TypeScript wherever possible), a shared configuration (for Svelte as well) would be setup that the root of the monorepo would extend. The package would need to be built (using `tsc`) before running lint.

## tsconfig

With packages dealing with different environments, TypeScript would also need to be configured differently, so a shared base configuration is created that the projects can extend from (using `"extends": "tsconfig/base.json"`), and then mention specifics. It only uses JSON files.
