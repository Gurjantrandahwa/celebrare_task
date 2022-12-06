import React, { useState } from "react";
import Cropper from "react-easy-crop";

function ImageCropper({ image, onCropDone, onCropCancel }) {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedArea, setCroppedArea] = useState(null);
    const [aspectRatio, setAspectRatio] = useState(4 / 3);

    const onCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
        setCroppedArea(croppedAreaPixels);
    };

    const onAspectRatioChange = (event) => {
        setAspectRatio(event.target.value);
    };

    return (
        <div className="cropper">
            <div>
                <Cropper
                    image={image}
                    aspect={aspectRatio}
                    crop={crop}
                    zoom={zoom}
                    onCropChange={setCrop}
                    onZoomChange={setZoom}
                    onCropComplete={onCropComplete}
                    style={{
                        containerStyle: {
                            width: "100%",
                            height: "80%",
                            backgroundColor: "#fff",
                        },
                    }}
                />
            </div>

            <div className="action-btns">
                <div className="aspect-ratios" onChange={onAspectRatioChange}>
                    <input type="radio" value={1 / 1} name="ratio" />
                    <input type="radio" value={5 / 4} name="ratio" />
                    <input type="radio" value={4 / 3} name="ratio" />
                    <input type="radio" value={3 / 2} name="ratio" />
                    <input type="radio" value={5 / 3} name="ratio" />
                    <input type="radio" value={16 / 9} name="ratio" />
                    <input type="radio" value={3 / 1} name="ratio" />
                </div>

                <button className="btn btn-outline" onClick={onCropCancel}>
                    Cancel
                </button>

                <button
                    className="btn"
                    onClick={() => {
                        onCropDone(croppedArea);
                    }}
                >
                    Done
                </button>
            </div>
        </div>
    );
}

export default ImageCropper;
