#include <sys/ioctl.h>
#include <node.h>
#include <node_object_wrap.h>
#include <linux/videodev2.h>
#include <unistd.h>

#include <stdio.h>
#include <stdlib.h>
#include <fcntl.h>

namespace loopback {
  using v8::FunctionCallbackInfo;
  using v8::Isolate;
  using v8::Local;
  using v8::Context;
  using v8::String;
  using v8::Number;
  using v8::Object;

  void Method(const FunctionCallbackInfo<v8::Value>& args) {
    Isolate* isolate = args.GetIsolate();
    Local<Context> context = isolate->GetCurrentContext();

    v8::String::Utf8Value deviceUtf8(isolate, args[0]);
    std::string device(*deviceUtf8);
    int width = args[1].As<Number>()->Value();
    int height = args[2].As<Number>()->Value();

    struct v4l2_format settings;

    int framesize = width * height * 2;
    __u8 *buffer = (__u8*) malloc(sizeof(__u8) * framesize);

    int fd = open(device.c_str(), O_RDWR);

    settings.type = V4L2_BUF_TYPE_VIDEO_OUTPUT;
    settings.fmt.pix.pixelformat = V4L2_PIX_FMT_RGB24;
    settings.fmt.pix.width = width;
    settings.fmt.pix.height = height;
    settings.fmt.pix.field = V4L2_FIELD_NONE;
    settings.fmt.pix.bytesperline = width * 2;
    settings.fmt.pix.sizeimage = framesize;
    settings.fmt.pix.colorspace = V4L2_COLORSPACE_JPEG;

    ioctl(fd, VIDIOC_S_FMT, &settings);

    write(fd, buffer, framesize);

    args.GetReturnValue().Set(fd);
  }

  void Initialize(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "startCamera", Method);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Initialize)
}
