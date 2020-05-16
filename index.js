import dotenv from 'dotenv-safe';
// load environment variables and check for them
try {
  dotenv.config();
} catch(ex) {
  console.error(ex.message);
  process.exit(1);
}

import fs from 'fs';
import Yaml from 'yaml';
import Koa from 'koa';

import { redirect } from './redirect.js';

let LINKS;

// load the list of links
try {
  console.log(`Loading links file...`);
  const linksFile = fs.readFileSync('./links.yaml', 'utf8');
  LINKS = Yaml.parse(linksFile);
} catch(ex) {
  console.error(`Could not read links.yaml: ${ex.message}`);
  process.exit(2);
}

const app = new Koa();

// load in middleware as needed
app.use(redirect(LINKS));

// start listening
console.log(`Starting server...`);
app.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
