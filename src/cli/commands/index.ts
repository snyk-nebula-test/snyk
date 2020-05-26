import * as abbrev from 'abbrev';
import hotloadModule = require('../../lib/hotload');
const hotload = hotloadModule(__dirname);
require('../../lib/spinner').isRequired = false;

// the aim of this module is to load as little as possible to keep cli boot
// time as low as possible

const commands: any = {
  auth: hotload('./auth'),
  config: hotload('./config'),
  help: hotload('./help'),
  ignore: hotload('./ignore'),
  modules: hotload('./modules'),
  monitor: hotload('./monitor'),
  policy: hotload('./policy'),
  protect: hotload('./protect'),
  test: hotload('./test'),
  version: hotload('./version'),
  wizard: hotload('./protect/wizard'),
  woof: hotload('./woof'),
};
commands.aliases = abbrev(Object.keys(commands));
commands.aliases.t = 'test';
export = commands;
