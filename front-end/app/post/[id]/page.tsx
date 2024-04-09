import { getComments } from "@/clients/comment";
import { getPost } from "@/clients/post";
import CommentInput from "@/components/comment-input/CommentInput";
import { IComment } from "@/interfaces/comment";
import { IPost } from "@/interfaces/post";
import {
  Container,
  Input,
  Image,
  Stack,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";

async function loadData(postID: string): Promise<[IPost, IComment[]]> {
  const comments = await getComments(postID);
  const post = await getPost(postID);
  console.log("🚀 ~ loadData ~ comments:", comments);

  return [post.data, comments.data];
}

const Post = async ({ params }: { params: { id: string } }) => {
  const [post, postComments] = await loadData(params.id);

  return (
    <Container>
      <Stack gap={5}>
        {post && (
          <Card maxWidth={"100%"} maxW="lg">
            <CardBody>
              <Image
                minW={"100%"}
                src={post.imageUrl || undefined}
                alt="Image"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Text>{post.content}</Text>
              </Stack>
            </CardBody>
          </Card>
        )}
        {postComments?.map((comment, i) => (
          <Input key={comment.postID + i} value={comment.comment} />
        ))}
        <CommentInput postID={params.id} />
      </Stack>
    </Container>
  );
};

export default Post;
