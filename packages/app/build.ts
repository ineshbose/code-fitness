import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { cpSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { load as loadHtml } from 'cheerio';
import {
  genImport,
  genTypeImport,
  genSafeVariableName,
  genExport,
} from 'knitwork';
import consola from 'consola';

consola.info('Generating webview template..');

const contents = [
  genImport('vscode', ['Uri']),
  genTypeImport('vscode', ['Webview']),
  'export default (webview: Webview, extensionUri: Uri, outDir = "") => {',
];
const replaceMap = {};
const dir = dirname(fileURLToPath(import.meta.url));

rmSync(`${dir}/dist`, { recursive: true, force: true });
cpSync(`${dir}/build`, `${dir}/dist`, { recursive: true });

const buildHtml = readFileSync(`${dir}/build/index.html`, {
  encoding: 'utf-8',
});
const page = loadHtml(buildHtml);

page('[href],[src]').each((_, el) => {
  const element = page(el);
  const link = element.attr('href') || element.attr('src');
  if (!link) return;

  const varName = genSafeVariableName(link);
  replaceMap[link] = `\${${varName}}`;

  contents.push(
    `const ${varName} = webview.asWebviewUri(Uri.joinPath(extensionUri, outDir, "${link
      .replace(/^(\/)/, '')
      // .split('/')
      .replace(/\//g, '", "')}"))`
  );
});

page('meta[http-equiv="content-security-policy"]').remove();
// page('head').append(
//   `<meta http-equiv="content-security-policy" content="default-src 'none'; img-src \${webview.cspSource} https:; script-src \${webview.cspSource}; style-src \${webview.cspSource}">`
// );

const template = page
  .html()
  .replace(
    'paths: {"base":"","assets":""},',
    `paths: {"base":"\${webview.asWebviewUri(Uri.joinPath(extensionUri, outDir))}","assets":""},`
  )
  .replace(new RegExp(Object.keys(replaceMap).join('|'), 'g'), (match) => {
    return replaceMap[match];
  });

writeFileSync(
  `${dir}/src/webview.ts`,
  contents.concat([`return /* html */ \`${template}\``, '}']).join('\n')
);

writeFileSync(
  `${dir}/src/index.ts`,
  genExport('./webview', [{ name: 'default', as: 'webview' }])
);

execSync(`cd ${dir} && npx unbuild`);

rmSync(`${dir}/src/webview.ts`);
rmSync(`${dir}/src/index.ts`);

consola.success('Webview template generated!');
