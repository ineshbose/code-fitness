import consola from 'consola';
import mri from 'mri';
import { loadConfig, loadPlugins } from './config';

const argv = mri(process.argv.slice(2));

consola.info('Hello world!');

const config = loadConfig(argv.config);
loadPlugins(config);
