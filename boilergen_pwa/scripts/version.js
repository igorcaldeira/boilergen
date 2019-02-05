const versionGenerate = require('./VersionGenerate');
new versionGenerate('../src/constants/version.json', 'PRD').generate();
