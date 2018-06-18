const {
  concat,
} = require('ramda');
const path = require('path');
const getModel = require('./routes-ast');
const docsGenerators = require('./generators');
const {
  printText,
} = require('./generators/tools');

const CWD = process.cwd();
const DEFAULT_OUTPUT_FOLDER = path.resolve(CWD, './documentation');

const descriptionText = `Params specification:

  <docs-format> - Output documentation format
  [routes...] - Route path. (example: /path/to/my.router.js)

  Supported docs format:
    apidoc - Simple inline docs for RESTful api
`;

module.exports = (cli) => {
  cli
    .command('build-docs <docs-format> [routes...]')
    .description(descriptionText)
    .option('-O, --outputPath <outputPath>', 'path to output docs files', DEFAULT_OUTPUT_FOLDER)
    .option('--verbose', 'verbose mode')
    .action((docsFormat, routes, { outputPath, verbose }) => {
      const absoluteOutputPath = path.resolve(CWD, outputPath);
      const absoluteRoutesPaths = routes.map(relativePath => path.resolve(CWD, relativePath));

      if (absoluteRoutesPaths.length === 0) {
        printText('No router files found');

        return;
      }

      if (verbose) {
        printText(absoluteRoutesPaths
          .map(line => `(finded file) ${line}`)
          .join('\n'));
      }

      const ast = absoluteRoutesPaths
        .map(require)
        .map(getModel)
        .reduce(concat, []);

      docsGenerators[docsFormat](absoluteOutputPath, ast);
    });
};

