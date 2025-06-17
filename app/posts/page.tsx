import { prisma } from "@/lib/prisma";
import { Post } from "../generated/prisma";

export default async function PostsPage() {
  const posts: Post[] = await prisma.post.findMany();

  return (
    <div>
      <h1>Users</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {post.title} ({post.content})
          </li>
        ))}
      </ul>
    </div>
  );
}
