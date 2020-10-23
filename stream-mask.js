const { cameraPipe } = require('./lib/camera');
const { loadModel } = require('./lib/model');
const maskBackground = require('./lib/mask-background');

start();

async function start() {
  await loadModel();
  cameraPipe('/dev/video2', '/dev/video6', maskBackground);
}
