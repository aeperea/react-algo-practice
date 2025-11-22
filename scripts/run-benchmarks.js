const fs = require('fs');
const path = require('path');

const benchDir = path.join(__dirname, '..', 'benchmarking');

if (!fs.existsSync(benchDir)) {
  console.error('No benchmarking directory found at', benchDir);
  process.exit(1);
}

const files = fs.readdirSync(benchDir).filter((f) => f.endsWith('.js')).sort();

for (const file of files) {
  const fullPath = path.join(benchDir, file);
  console.log(`\n--- Running ${file} ---`);
  try {
    require(fullPath);
  } catch (err) {
    console.error(`Error running ${file}:`, err);
    process.exitCode = 1;
  }
}
