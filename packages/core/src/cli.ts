import mri from 'mri';
import { loadConfig, loadPlugins } from './config';

const argv = mri(process.argv.slice(2));

const config = loadConfig(argv.config);
loadPlugins(config);
