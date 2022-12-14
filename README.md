# coverage-actions
Comment coverage difference on PR and save current coverage to endpoint

![GitHub release (release name instead of tag name)](https://img.shields.io/github/v/release/ScientaNL/coverage-actions?include_prereleases)
![GitHub](https://img.shields.io/github/license/ScientaNL/coverage-actions)
![GitHub Repo stars](https://img.shields.io/github/stars/ScientaNL/coverage-actions?label=Repository%20stars)
![GitHub Org's stars](https://img.shields.io/github/stars/ScientaNL?label=ScientaNL%20stars)

#### Dependencies
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@actions/core)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@actions/github)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@aws-sdk/client-dynamodb)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@aws-sdk/credential-providers)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@aws-sdk/lib-dynamodb)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/axios)

#### Dev dependencies
- ![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/dev/typescript)
- ![GitHub package.json dependency version (dev dep on branch)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/dev/@types/node)
- ![GitHub package.json dependency version (prod)](https://img.shields.io/github/package-json/dependency-version/ScientaNL/coverage-actions/@vercel/ncc)

### Build
To build the dist file run: 
```bash
  npm run build
```
This coverts the TS files to JS and bundles them into the `dist/index.js` file

### Secrets
To function with the current adapters you need to input env variables (presumably with secrets). these are
#### JsonblobAdapter
- `JSONBLOB_ID`

#### DynamoDBAdapter
- `AWS_REGION`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_ACCESS_KEY_ID`
- `COVERAGE_STORAGE_ID`

### Storage adapters
To each their own; If you want to extend the functionality of this action with your own storage method you kan do it in the form of a new `StorageAdapter`
Currently the available storage adapters are:
- ``DynamoDBAdapter``
- ``JsonblobAdapter``

A new adapter must implement the `Adapter` interface to insure compatibility with the current structure. 
All credentials must be gotten through the environment.
Don't forget to append to the `AdapterType` and `adapterMap`
