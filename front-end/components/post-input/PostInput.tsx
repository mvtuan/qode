"use client";

import { Button, Input, Stack, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import FileUpload from "../file-upload/FileUpload";
import { createPost, getPosts } from "@/clients/post";
import { IPost } from "@/interfaces/post";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { getComments } from "@/clients/comment";

interface IPostInput {
  content: string;
}
const defaultValues: IPostInput = {
  content: "",
};

const PostInput = () => {
  const toast = useToast();
  const [image, setImage] = useState<string | null>(null);
  const router = useRouter();

  const hookForm = useForm({ defaultValues });

  useEffect(() => {
    (async () => {
      const post = await getPosts();
      console.log("🚀 ~ post:", post);
      const comments = await getComments(post[0].id);
      console.log("🚀 ~ comments:", comments);
    })();
  }, []);

  async function handleCreatePost(formData: IPostInput) {
    const post: IPost = {
      content: formData.content,
      imageUrl: image,
    };

    const res = await createPost(post);
    if (res.status === 201) {
      toast({ title: "Post successfully" });
    }

    router.refresh();
  }
  return (
    <Stack
      gap={1}
      as={"form"}
      onSubmit={hookForm.handleSubmit(handleCreatePost)}
    >
      <Input
        placeholder="What's on your mind?"
        {...hookForm.register("content")}
      />
      <FileUpload image={image} setImage={setImage} />
      <Button type="submit" onClick={hookForm.handleSubmit(handleCreatePost)}>
        Upload
      </Button>
    </Stack>
  );
};

export default PostInput;
