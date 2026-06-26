#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const researchDir = path.join(rootDir, 'research');

const htmlFiles = fs.readdirSync(researchDir)
  .filter((file) => file.endsWith('.html'))
  .sort();

const violations = [];

function stripCssComments(css) {
  return css.replace(/\/\*[\s\S]*?\*\//g, '');
}

function isZeroValue(value) {
  const normalized = value.trim().toLowerCase();
  return /^(0|0px|0rem|0em|0%|unset|initial|inherit)$/.test(normalized);
}

for (const file of htmlFiles) {
  const filePath = path.join(researchDir, file);
  const html = fs.readFileSync(filePath, 'utf8');
  const styleBlocks = [...html.matchAll(/<style\b[^>]*>([\s\S]*?)<\/style>/gi)];

  styleBlocks.forEach((match, blockIndex) => {
    const css = stripCssComments(match[1]);
    const bodyRules = [...css.matchAll(/(^|[{}\s;,])body\s*\{([^}]*)\}/gi)];

    bodyRules.forEach((rule) => {
      const declarations = rule[2];
      const padding = declarations.match(/(?:^|;)\s*padding\s*:\s*([^;]+)/i);
      const margin = declarations.match(/(?:^|;)\s*margin\s*:\s*([^;]+)/i);

      if (padding && !isZeroValue(padding[1])) {
        violations.push({
          file,
          block: blockIndex + 1,
          property: 'padding',
          value: padding[1].trim(),
          message: 'research child pages must keep body padding at 0; put content spacing on .container or another inner wrapper instead',
        });
      }

      if (margin && !isZeroValue(margin[1])) {
        violations.push({
          file,
          block: blockIndex + 1,
          property: 'margin',
          value: margin[1].trim(),
          message: 'research child pages must keep body margin at 0 so injected navigation can sit flush with the viewport',
        });
      }
    });
  });
}

if (violations.length > 0) {
  console.error('Research page layout guardrail failed.');
  console.error('Injected navigation is inserted as the first child of <body>, so body spacing can push it away from the top edge.');
  console.error('');

  violations.forEach((violation) => {
    console.error(`- research/${violation.file} <style> block ${violation.block}: body ${violation.property}: ${violation.value}`);
    console.error(`  ${violation.message}`);
  });

  process.exit(1);
}

console.log(`Research page layout guardrail passed (${htmlFiles.length} HTML file${htmlFiles.length === 1 ? '' : 's'} checked).`);
