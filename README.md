# react-extras

## How to Run

Learn [Learna](https://github.com/lerna/lerna#common-devdependencies)!

Use our built in `scope`:

Examples:

Run some package:

```sh
yarn scope @react-extras/hooks-use-sort-by yarn build
```

## Tests

```sh
yarn test
```

or

```sh
yarn test:ci
```

## DevOps

- package.json has `"prepublishOnly": "yarn build && yarn test && yarn lint && yarn build",` , we build twice, once to satisfy dependencies for linting and for typescript compilation, we need to rewrite the build again at the end to make sure it's integrity is correct (babel, ts, and type build orders).
