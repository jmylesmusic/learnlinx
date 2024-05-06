import { useContext, useRef, useState } from "react";
import { Text, Group, Button, useMantineTheme } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "../styles/DropzoneButton.module.css";
import { AuthContext } from "../context/auth.context";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

function CustomDropzone() {
  const theme = useMantineTheme();
  const openRef = useRef(null);
  const { storeProfilePictureURL } = useContext(AuthContext);

  const handleDrop = async (file) => {
    console.log("accepted files", file[0]);

    const formData = new FormData();
    formData.append("imageUrl", file[0]);
    console.log(formData);
    try {
      const response = await axios.post(
        `${API_URL}/api/users/upload`,
        formData
      );

      console.log(response.data);
      storeProfilePictureURL(response.data.fileUrl);
    } catch (error) {
      console.log("Error uploading photo: ", error);
    }
  };

  return (
    <div className={classes.wrapper}>
      <Dropzone
        maxFiles={1}
        multiple={false}
        openRef={openRef}
        onDrop={handleDrop}
        className={classes.dropzone}
        radius="md"
        accept={["image/jpeg", "image/png"]} // Accepted MIME types for images
        maxSize={30 * 1024 ** 2}
      >
        <div style={{ pointerEvents: "none" }}>
          <Group justify="center">
            <Dropzone.Accept>
              <IconDownload
                style={{ width: 50, height: 50 }} // removed the rem function for simplicity
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: 50, height: 50 }} // removed the rem function for simplicity
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: 50, height: 50 }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text align="center" weight={700} size="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>
              Unsupported file format or exceeds size limit
            </Dropzone.Reject>
            <Dropzone.Idle>Upload image</Dropzone.Idle>
          </Text>
          <Text align="center" size="sm" mt="xs" color="dimmed">
            Drag'n'drop images here to upload. We can only accept .jpg, .jpeg,
            .png, .gif files that are less than 30mb in size.
          </Text>
        </div>
      </Dropzone>

      <Button
        className={classes.control}
        size="md"
        radius="xl"
        onClick={() => openRef.current && openRef.current()}
      >
        Select files
      </Button>
    </div>
  );
}

export default CustomDropzone;
