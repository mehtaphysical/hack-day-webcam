const sharp = require('sharp');
const v4l2camera = require('v4l2camera');
const { loadModel, createMaskFromFrame, PERSON_PIXEL } = require('./lib/model');
const { frameToImage } = require('./lib/camera');

const cam = new v4l2camera.Camera('/dev/video2');
cam.start();

loadModel()
  .then(() => {
    return capture();
  });

const maskToRBG = mask => mask.map(pixel =>
  pixel === PERSON_PIXEL
    ? 255
    : 0);
  
function capture(net) {
  cam.capture(async() => {
    const frame = cam.toRGB();
    const image = await frameToImage(frame, cam.width, cam.height);
    const mask = await createMaskFromFrame(image);

    await sharp(Buffer.from(maskToRBG(mask)), { raw: { width: cam.width, height: cam.height, channels: 1 } }).jpeg().toFile('live-mask.jpg');
    capture(net);
  });
};
