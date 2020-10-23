const { frameToImage } = require('./camera');
const { createMaskFromFrame, NON_PERSON_PIXEL } = require('./model');

const virtualBackground = async(frame) => {
  const image = await frameToImage(frame)
  const mask = await createMaskFromFrame(image);
  for(let i = 0; i < mask.length; i++) {
    if(mask[i] === NON_PERSON_PIXEL) {
      frame[i * 3] = 0;
      frame[(i * 3) + 1] = 0
      frame[(i * 3) + 2] = 0
    }
  }
  return frame;
};

module.exports = virtualBackground;
