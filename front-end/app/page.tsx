// app/page.tsx
"use client";
import { Link } from "@chakra-ui/next-js";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const router = useRouter();
  useEffect(() => {
    router.push("/home");
  }, []);
  return (
    <Link href="/about" color="blue.400" _hover={{ color: "blue.500" }}>
      About
    </Link>
  );
}
