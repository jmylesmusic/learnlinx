import { useRef } from "react";
import { Text, Group, Button, useMantineTheme } from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconCloudUpload, IconX, IconDownload } from "@tabler/icons-react";
import classes from "../styles/DropzoneButton.module.css";

function CustomDropzone() {
  const theme = useMantineTheme();
  const openRef = useRef(null);

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        onDrop={() => {}}
        className={classes.dropzone}
        radius="md"
        accept={["image/jpeg", "image/png", "image/gif"]} // Accepted MIME types for images
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
