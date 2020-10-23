# Webcam Filter

## Making a mask

* [Tensorflow BodyPix](https://github.com/tensorflow/tfjs-models#readme)
* [Tensorflow](https://www.tensorflow.org/)
* [Tensors](https://www.tensorflow.org/guide/tensor)

First we read an image file. We then convert the image into a tensor and
pass it to the body segmentation model.

The body segmentation model returns an array where each element in the array
represents a pixel from the original image. If the array element is `0` then
there is no person at the pixel. If the array element is `1` then there is a
person at the pixel.

## Streaming from camera

* [Video4Linux](https://en.wikipedia.org/wiki/Video4Linux)
* [node-v4l2camera](https://github.com/bellbind/node-v4l2camera)

We start capturing a webcam output with the `node-v4l2camera` library
and continuously save the frames to a file.

## Streaming a mask

Next we stream a mask for each frame by combining the last two steps:

1. we capture webcam output
2. we create a mask for each frame

## Creating a camera loopback device

Webcams are files (everything is a file in linux!). We can stream to
a webcam by writing to the file that represents our webcam.

## Streaming a mask

Next, we put all of these steps together:

1. load model
2. start camera
3. start loopback camera
4. capture frames
5. create mask for frame
6. write the mask to the loopback

## Streaming a virtual background

1. load model
2. start camera
3. start loopback camera
4. capture frames
5. create mask for frame
6. use the mask to conditionally render the frames pixels
