const bodyPix = require('@tensorflow-models/body-pix');
const tf = require('@tensorflow/tfjs-node-gpu');

const NON_PERSON_PIXEL = 0;
const PERSON_PIXEL = 1;

const defaultModelConfig = {
  outputStride: 16
};

const defaultSegmentationConfig = {
  segmentationThreshold: 0.5,
  internalResolution: 'medium'
}

let defaultModel = null;

const loadModel = (config = defaultModelConfig) => 
  bodyPix.load(config)
    .then(model => defaultModel = model);

const createMaskFromFrame = async(image, config = defaultSegmentationConfig, model = defaultModel) => {
  const tensorImage = tf.node.decodeImage(image);
  const seg = await model.segmentPerson(tensorImage, config);

  return seg.data;
}

module.exports = {
  loadModel,
  createMaskFromFrame,
  NON_PERSON_PIXEL,
  PERSON_PIXEL
};
