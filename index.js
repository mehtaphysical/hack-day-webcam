const { cameraPipe } = require('./lib/camera');
const { loadModel } = require('./lib/model');
const virtualBackground = require('./lib/virtual-background');

start();

async function start() {
  await loadModel();
  cameraPipe('/dev/video2', '/dev/video6', virtualBackground);
}
