const fs = require('fs');
const sharp = require('sharp');
const v4l2camera = require('v4l2camera');
const { startCamera } = require('../build/Release/loopback.node');

let defaultWidth, defaultHeight;

const frameToImage = (frame, width = defaultWidth, height = defaultHeight) =>
  sharp(Buffer.from(frame), { raw: { width, height, channels: 3 }}).jpeg().toBuffer();

const capture = cam => {
  return new Promise(resolve => {
    cam.capture(async() => {
      const frame = cam.toRGB();
      resolve(frame);
    });
  });
};

const write = (fd, buf) => {
  return new Promise(resolve => {
    fs.write(fd, buf, resolve);
  });
};

const cameraPipe = async(src, dest, transform) => {
  const srcCamera = new v4l2camera.Camera(src);
  srcCamera.configSet({
    formatName: 'YUYV',
    format: 1448695129,
    width: 640,
    height: 360,
    interval: { numerator: 1, denominator: 30 }
  })
  const destCamera = startCamera(dest, srcCamera.width, srcCamera.height)
  srcCamera.start();

  defaultWidth = srcCamera.width;
  defaultHeight = srcCamera.height;

  while(true) {
    const frame = await capture(srcCamera);
    const destinationFrame = await transform(frame);

    await write(destCamera, destinationFrame);
  }
}

module.exports = {
  cameraPipe,
  frameToImage
};
