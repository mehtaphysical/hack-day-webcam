const v4l2camera = require('v4l2camera');
const sharp = require('sharp');

const cam = new v4l2camera.Camera('/dev/video2');
cam.start();

capture();

function capture() {
  cam.capture(async() => {
    const frame = cam.toRGB();
    await sharp(Buffer.from(frame), { raw: { width: cam.width, height: cam.height, channels: 3 }}).jpeg().toFile('live.jpg');
    capture();
  });
};
