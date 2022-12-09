# coverage-actions
Comment coverage difference on PR and save current coverage to endpoint

### Build
To build the dist file run: 
```bash
  npm run build
```
This coverts the TS files to JS and bundles them into the `dist/index.js` file

### Storage adapters
To each their own; If you want to extend the functionality of this action with your own storage method you kan do it in the form of a new `StorageAdapter`
Currently the available storage adapters are:
- ``DynamoDBAdapter``
- ``JsonblobAdapter``

A new adapter must implement the `Adapter` interface to insure compatibility with the current structure. 
All credentials must be gotten through the environment.
Dont forget to append to the `AdapterType` and `adapterMap`

test pr test action
