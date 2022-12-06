import React from "react";
import {Group, Paper, Stack, Text, Button} from "@mantine/core";
import {BsSave} from "react-icons/bs";
import {saveAs} from "file-saver";

const CroppedImage = ({img, setCloseImage}) => {
    const downloadImage = () => {
        saveAs(img, "image.jpg");
    };

    return <div className={"croppedImage"}>
        <Paper sx={{
            width: "60vh",
            height: "70vh",
            maxWidth: "800px",
            maxHeight: "800px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "media (max-width:855px)": {
                width: "90%",
                height: "90%"
            }
        }}
               p={"md"}>
            <Stack
                sx={{
                    width: "70%",
                    height: "70%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    "media (max-width:855px)": {
                        width: "90%",
                        height: "90%"
                    }
                }}>
                <Text size={"xl"}>Cropped Image!</Text>
                <img src={img}
                     style={{width: "100%", height: "100%", objectFit: "contain"}} alt={""}/>
                <Group>
                    <Button
                        onClick={() => {
                            downloadImage();
                            setCloseImage("")
                        }}
                        sx={{height: "auto"}}
                        p={"sm"}>
                        <Group>
                            <BsSave size={20}/>
                            <Text>SaveImage</Text>
                        </Group>
                    </Button>

                    <Button onClick={() => setCloseImage("")}
                            sx={{height: "auto"}}
                            p={"sm"}
                    >

                    </Button>
                </Group>
            </Stack>
        </Paper>
    </div>
}
export default CroppedImage