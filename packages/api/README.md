# `webpack-babel-typescript-minimal-starter`
## An ultra minimal starter template for projects looking for Webpack, Babel, and TypeScript

The absolute minimum to get started:
- `webpack@5.x` & `webpack-dev-server@3.x`
- `babel@7.x`
- `typescript@4.x`

### The goals of this template
- A good foundation for any Webpack based app
- One script: `yarn dev` (alias for `webpack serve`) that runs a dev server with hot reloading, which throws an error if TypeScript is unable to compile (`fork-ts-checker-webpack-plugin`)
- No dependencies (except the absolute bare minimum needed for the above technologies to run)
