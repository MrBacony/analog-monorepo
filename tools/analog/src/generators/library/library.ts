import {
  addProjectConfiguration,
  formatFiles,
  generateFiles,
  Tree,
} from '@nx/devkit';
import * as path from 'path';
import { LibraryGeneratorSchema } from './schema';

export async function libraryGenerator(
  tree: Tree,
  options: LibraryGeneratorSchema
) {
  const projectRoot = `libs/${options.name}`;
  addProjectConfiguration(tree, options.name, {
    root: projectRoot,
    projectType: 'library',
    sourceRoot: `${projectRoot}/src`,
    targets: {
      "test": {
        "executor": "@nx/vite:test",
        "outputs": ["{options.reportsDirectory}"],
        "options": {
          "reportsDirectory": `../../coverage/libs/${options.name}`
        }
      },
      "lint": {
        "executor": "@nx/eslint:lint"
      }
      },
  });
  generateFiles(tree, path.join(__dirname, 'files'), projectRoot, options);
  await formatFiles(tree);
}

export default libraryGenerator;
