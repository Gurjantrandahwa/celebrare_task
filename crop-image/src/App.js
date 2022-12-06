import React, {useCallback, useEffect, useState} from "react";
import "./App.css"
import Header from "./Components/Header/Header";
import getCroppedImg from "./Components/CropImage/CropImage";
import {Group, Title, Text, Paper, Stack, Slider, Button, Box} from "@mantine/core";
import {AiOutlineZoomIn} from "react-icons/ai";
import {FiRefreshCcw} from "react-icons/fi";
import {MdSlideshow} from "react-icons/md";
import {CiCircleAlert} from "react-icons/ci";
import Cropper from "react-easy-crop";
import CroppedImage from "./Components/CropImage/CroppedImage";
import {Dropzone, IMAGE_MIME_TYPE} from "@mantine/dropzone";
import {HiOutlinePhotograph} from "react-icons/hi";

function App() {
    const [crop, setCrop] = useState({x: 0, y: 0});
    const [rotation, setRotation] = useState(0)
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const [croppedImage, setCroppedImage] = useState(null)

    const [files, setFiles] = useState([]);
    const [imageUrl, setImageUrl] = useState(null)

    const onCropComplete = useCallback(
        (croppedArea, croppedAreaPixels) => {
            setCroppedAreaPixels(croppedAreaPixels);
        }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            const croppedImage = await getCroppedImg(imageUrl, croppedAreaPixels, rotation);
            setCroppedImage(croppedImage);
        } catch (e) {
            console.log(e)
        }
    }, [croppedImage, rotation]);

    useEffect(() => {
        if (files[0]) {
            setImageUrl(URL.createObjectURL(files[0]));
        }
    }, [files])
    return <div>
        <Header/>
        <div className={"app"}>
            <Title sx={{marginBottom: "2rem", color: "black"}}>
                <Group>
                    <Text size={"xl"}>Cropper</Text>
                </Group>
            </Title>
            {imageUrl && <Paper shadow={"xl"} p={"lg"}>
                <Group
                    sx={{
                        width: "70vw",
                        height: "70vh",
                        "media (max-width:855px)": {
                            flexDirection: "column-reverse",
                            maxHeight: "700px"
                        }
                    }}
                    noWrap>
                    <Stack
                        p={"lg"}
                        sx={{
                            width: "100%",
                            height: "100%",
                            outline: "1px solid gray",
                            borderRadius: "10px",
                            justifyContent: "center"
                        }}>
                        <Stack>
                            <Stack>
                                <Group sx={{gap: "0.3rem"}}>
                                    <AiOutlineZoomIn size={20}/>
                                    <Text>Zoom Slider:</Text>
                                </Group>
                                <Slider min={1}
                                        max={5}
                                        step={0.1}
                                        value={zoom}
                                        onChange={setZoom}/>
                            </Stack>

                            <Stack>
                                <Group sx={{gap: "0.3rem"}}>
                                    <FiRefreshCcw size={20}/>
                                    <Text>Rotation Slider:</Text>
                                </Group>
                                <Slider
                                    min={-180}
                                    max={180}
                                    step={1}
                                    value={rotation}
                                    onChange={setRotation}/>
                            </Stack>
                            <Stack>
                                <Button
                                    onClick={showCroppedImage}
                                    sx={{
                                        height: "auto"
                                    }}
                                    p={"sm"}>
                                    <Group>
                                        <MdSlideshow size={20}/>
                                        <Text>Show Cropped Image</Text>
                                    </Group>
                                </Button>
                                <Button
                                    onClick={() => {
                                        setCroppedImage('');
                                        setImageUrl('')
                                    }}
                                    sx={{
                                        height: "auto"
                                    }}
                                    p={"sm"}
                                >
                                    <Group>
                                        <CiCircleAlert size={20}/>
                                        <Text>Clear Image</Text>
                                    </Group>
                                </Button>
                            </Stack>
                        </Stack>
                    </Stack>
                    <Group
                        p={"lg"}
                        sx={{
                            width: "100%",
                            height: "100%",
                            outline: "1px solid gray",
                            position: "relative",
                            justifyContent: "center",
                            borderRadius: "10px"
                        }}>
                        <Box sx={{
                            width: "100%",
                            height: "100%",
                            position: "relative"
                        }}>
                            <Cropper
                                image={imageUrl}
                                crop={crop}
                                zoom={zoom}
                                rotation={rotation}
                                aspect={4 / 3}
                                onCropChange={setCrop}
                                onCropComplete={onCropComplete}
                                onRotationChange={setRotation}
                                onZoomChange={setZoom}
                                objectFit={"contain"}
                                minZoom={1}
                                maxZoom={5}/>
                        </Box>
                    </Group>
                </Group>
            </Paper>
            }
            {croppedImage && (
                <CroppedImage img={croppedImage} setCloseImage={setCroppedImage}/>
            )}
            {
                !imageUrl && (
                    <Dropzone
                        accept={IMAGE_MIME_TYPE}
                        onDrop={setFiles}
                        sx={{
                            width: "60vw",
                            height: "200px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center"
                        }}
                    >
                        <Group>
                            <HiOutlinePhotograph size={50} stroke={1.5}/>
                            <Text align={"center"}>Drop Image Here</Text>
                        </Group>
                    </Dropzone>
                )}
        </div>
    </div>
}

export default App;

