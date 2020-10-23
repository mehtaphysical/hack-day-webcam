const { frameToImage } = require('./camera');
const { createMaskFromFrame, PERSON_PIXEL } = require('./model');

const maskBackground = async(frame) => {
  const image = await frameToImage(frame)
  const mask = await createMaskFromFrame(image);
  for(let i = 0; i < mask.length; i++) {
    const pixelValue = mask[i] === PERSON_PIXEL
      ? 255
      : 0;
    
    // rgb(255, 255, 255)
    frame[i * 3] = pixelValue
    frame[(i * 3) + 1] = pixelValue
    frame[(i * 3) + 2] = pixelValue
  }
  return frame;
};

module.exports = maskBackground;
