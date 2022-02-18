import fetch from 'node-fetch';

export type PostType = {
  id: number;
  title: string;
  content: string;
  created_at: string;
};

const getAllPostsData = async () => {
  const res = await fetch(
    new URL(`${process.env.NEXT_PUBLIC_RESTAPI_URL}api/list-post`).href
  );
  const posts = (await res.json()) as PostType[];
  const filteredPosts = posts.sort(
    (a, b) =>
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  return filteredPosts;
};

export { getAllPostsData };
