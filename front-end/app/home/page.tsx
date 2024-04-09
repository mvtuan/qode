import { getPosts } from "@/clients/post";
import PostInput from "@/components/post-input/PostInput";
import { IPost } from "@/interfaces/post";
import {
  Container,
  Image,
  Stack,
  Box,
  Card,
  CardBody,
  Text,
} from "@chakra-ui/react";
import Link from "next/link";

async function loadPosts() {
  const res = await getPosts();

  return res.data;
}

export default async function Page() {
  const posts: IPost[] = await loadPosts();

  return (
    <Container>
      <Box>
        <PostInput />
      </Box>
      <Box>
        <Stack gap={5}>
          {posts?.map((post, i) => (
            <Link key={post.id} href={`/post/${post.id}`}>
              <Card maxWidth={"100%"} maxW="xl">
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
            </Link>
          ))}
        </Stack>
      </Box>
    </Container>
  );
}
