const dotenv = require('dotenv-safe');
// load environment variables and check for them
try {
  dotenv.config();
} catch(ex) {
  console.error(ex.message);
  process.exit(1);
}

const fs = require('fs');
const Yaml = require('yaml');
const Koa = require('koa');

const redirect = require('./redirect.js');

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
app.use(async function(ctx, next) {
  ctx.response.server = 'Linkuistics After Dark';
  next();
});
app.use(redirect(LINKS));

// start listening
console.log(`Starting server...`);
app.listen(process.env.PORT);
console.log(`Server started on port ${process.env.PORT}`);
