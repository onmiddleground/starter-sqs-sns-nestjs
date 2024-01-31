// esbuild.config.js
require('ts-node').register();

const { build } = require('esbuild');
const { join } = require('path');

build({
  entryPoints: [join(__dirname, 'src', 'lambda.ts')],
  outfile: join(__dirname, 'aws_dist', 'lambda.js'),
  bundle: true,
  platform: 'node',
  target: 'node18',
  external: [
    "@nestjs/platform-express",
    "@nestjs/websockets/socket-module",
    "@nestjs/microservices/microservices-module",
    "@nestjs/microservices",
  ],
}).catch(() => process.exit(1));
