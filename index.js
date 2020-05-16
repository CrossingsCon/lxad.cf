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
  process.exit(1);
}

const app = new Koa();

// load in middleware as needed
app.use(redirect(LINKS));

// start listening
console.log(`Starting server...`);
const PORT = 8888;
app.listen(PORT);
console.log(`Server started on port ${PORT}`);
