import React, { useState, useCallback } from "react";
import ReactDOM from "react-dom";
import Cropper from "react-easy-crop";
import Slider from "@material-ui/core/Slider";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ImgDialog from "./ImgDialog";
import getCroppedImg from "./cropImage";
import { styles } from "./styles";
import btnStyles from "./styles/button.module.css";

const Editor = ({
  classes,
  imageURL,
  setIsPopUp,
  setUploadImage,
  setImageSrcUrl,
  imgInput,
  fileName,
  imgType,
}) => {
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);

  const blobToFile = (bstring, fileName) => {
    console.log("[from the blob to file]", imgType);
    console.log(bstring);
    let theBlobToFile = new File([bstring], fileName, {
      type: imgType,
    });
    // theBlobToFile.lastModifiedDate = new Date();
    // theBlobToFile.name = fileName;
    return theBlobToFile;
  };

  const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const onCropComplete = useCallback((croppedArea, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const showCroppedImage = useCallback(async () => {
    try {
      const croppedImage = await getCroppedImg(
        imageURL,
        croppedAreaPixels,
        rotation
      );
      //setCroppedImage(croppedImage);
      setUploadImage(dataURLtoFile(croppedImage, fileName));
      setIsPopUp(false);
      setImageSrcUrl(null);
      imgInput.current.value = "";
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <div
      class="w-screen h-screen fixed top-0 left-0"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
    >
      <div
        class="p-8 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 bg-white"
        style={{
          minHeight: "500px",
          minWidth: "400px",
          maxWidth: "800px",
          border: "1px solid #EAEAEA",
          boxSizing: "border-box",
          borderRadius: "6px",
        }}
      >
        <div className="flex pb-4 ">
          <h1 className="text-xl">Adjust your image</h1>
          <button
            className={btnStyles.cancelBtn}
            onClick={() => {
              setIsPopUp(false);
              setImageSrcUrl(null);
              imgInput.current.value = "";
            }}
          >
            Cancel
          </button>
        </div>
        <div className={classes.cropContainer}>
          <Cropper
            image={imageURL}
            crop={crop}
            rotation={rotation}
            zoom={zoom}
            aspect={260 / 360}
            onCropChange={setCrop}
            onRotationChange={setRotation}
            onCropComplete={onCropComplete}
            onZoomChange={setZoom}
          />
        </div>
        <div className={classes.controls}>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Zoom
            </Typography>
            <Slider
              value={zoom}
              min={1}
              max={3}
              step={0.1}
              aria-labelledby="Zoom"
              classes={{ root: classes.slider }}
              onChange={(e, zoom) => setZoom(zoom)}
            />
          </div>
          <div className={classes.sliderContainer}>
            <Typography
              variant="overline"
              classes={{ root: classes.sliderLabel }}
            >
              Rotation
            </Typography>
            <Slider
              value={rotation}
              min={0}
              max={360}
              step={1}
              aria-labelledby="Rotation"
              classes={{ root: classes.slider }}
              onChange={(e, rotation) => setRotation(rotation)}
            />
          </div>
        </div>
        <Button
          onClick={showCroppedImage}
          variant="contained"
          color="primary"
          classes={{ root: classes.cropButton }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

const ImageEditor = withStyles(styles)(Editor);

export default ImageEditor;
