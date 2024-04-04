"use client";
import { Image, Box, Button, IconButton } from "@chakra-ui/react";

import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { AttachmentIcon, CloseIcon } from "@chakra-ui/icons";

const FileUpload = ({
  image,
  setImage,
}: {
  image: string | null;
  setImage: Dispatch<SetStateAction<string | null>>;
}) => {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDeleteImage = () => {
    setImage(null);
  };

  return (
    <>
      <Button
        as="label"
        htmlFor="imageInput"
        variant="outline"
        colorScheme="teal"
        size="sm"
        mb={4}
        cursor="pointer"
      >
        <AttachmentIcon />
        <input
          id="imageInput"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ display: "none" }}
        />
      </Button>
      {image && (
        <Box mb={4} position="relative">
          <Image src={image} alt="Preview" maxW="200px" maxH="200px" />
          <IconButton
            aria-label="Delete Image"
            icon={<CloseIcon />}
            onClick={handleDeleteImage}
            position="absolute"
            top="5px"
            // right="5px"
            size="sm"
            bg="transparent"
            _hover={{ bg: "transparent" }}
          />
        </Box>
      )}
    </>
  );
};

export default FileUpload;
