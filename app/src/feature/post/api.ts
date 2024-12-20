import { postSchema } from "./schema";

export const getPosts = async () => {
  const res = await fetch("http://dev3.local/wp-json/hpb/api/v1/posts");
  const data = await res.json();

  const posts = postSchema.array().parse(data);
  return posts;
};
