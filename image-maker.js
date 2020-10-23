const fs = require('fs');
const bodyPix = require('@tensorflow-models/body-pix');
const tf = require('@tensorflow/tfjs-node-gpu');
const sharp = require('sharp');

const NON_PERSON_PIXEL = 0;
const PERSON_PIXEL = 1;

const segmentationToRGB = pixels => 
  pixels.map(pixel => pixel === NON_PERSON_PIXEL
    ? 0
    : 255);

bodyPix.load()
  .then(net => {
    const image = fs.readFileSync('./IMG_0130.jpg');
    const tensor = tf.node.decodeImage(image);
    return net.segmentPerson(tensor);
  })
  .then(seg => sharp(Buffer.from(segmentationToRGB(seg.data)), { raw: { width: seg.width, height: seg.height, channels: 1}}).jpeg().toFile('mask.jpg'));
