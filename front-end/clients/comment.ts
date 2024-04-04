import { IComment } from "@/interfaces/comment";

const URL = "http://127.0.0.1:8080";
// const URL = "http://localhost:8080";

const options: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

type CommentResponse = {
  status: number;
  message: string;
  data: IComment[];
};

export async function getComments(postID: string): Promise<CommentResponse> {
  const res = await fetch(`${URL}/comments/?postID=${postID}`);
  return res.json();
}
export async function createComment(body: IComment) {
  options.method = "POST";
  options.body = JSON.stringify(body);

  const res = await fetch(`${URL}/comment`, options);

  return res;
}
