"use client";
import { createComment } from "@/clients/comment";
import { IComment } from "@/interfaces/comment";
import { ChatIcon } from "@chakra-ui/icons";
import {
  InputGroup,
  Input,
  InputRightElement,
  Button,
  FormErrorMessage,
  FormHelperText,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

interface IInputData {
  comment: string;
}

interface IProps {
  postID: string;
}

const defaultValues: IInputData = {
  comment: "",
};
const CommentInput = (props: IProps) => {
  const router = useRouter();
  const toast = useToast();
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({ defaultValues });

  async function handleComment(formData: IInputData) {
    const comment: IComment = {
      postID: props.postID,
      comment: formData.comment,
    };
    const res = await createComment(comment);

    if (res.status === 201) {
      toast({ title: "Comment successfully" });
    }

    router.refresh();
  }

  return (
    <InputGroup as="form" onSubmit={handleSubmit(handleComment)}>
      <Input
        placeholder="Write something about it"
        {...register("comment")}
        errorBorderColor="red"
      />
      {/* <FormHelperText>abc</FormHelperText> */}
      <FormErrorMessage>
        {errors?.comment && errors?.comment?.message}
      </FormErrorMessage>
      <InputRightElement>
        <Button
          type="submit"
          style={{ backgroundColor: "white" }}
          onSubmit={handleSubmit(handleComment)}
        >
          <ChatIcon />
        </Button>
      </InputRightElement>
    </InputGroup>
  );
};

export default CommentInput;
