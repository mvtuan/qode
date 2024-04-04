import { IPost } from "@/interfaces/post";

const URL = "http://127.0.0.1:8080";
const options: RequestInit = {
  method: "GET",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
};

export async function getPost(postId: string) {
  const res = await fetch(`${URL}/post/${postId}`);
  return res.json();
}
export async function getPosts() {
  const res = await fetch(`${URL}/posts/`);

  return res.json();
}
export async function createPost(body: IPost) {
  options.method = "POST";
  options.body = JSON.stringify(body);

  const res = await fetch(`${URL}/post`, options);

  return res;
}

export async function deletePost(postId: string) {
  options.method = "DELETE";
  const res = await fetch(`${URL}/post/${postId}`);

  return res.json();
}
