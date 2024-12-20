import { getPosts } from "@/feature/post/api";
import Post from "@/feature/post/components/post";

export default async function HomePage() {
  const data = await getPosts();
  if (!data[0]) return;
  return (
    <main className="mx-auto max-w-[1440px] text-center text-white">
      <Post
        id={data[0].id}
        title={data[0].title}
        content={data[0].content}
        image={data[0].image}
      />
    </main>
  );
}
