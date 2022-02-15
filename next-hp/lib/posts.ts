const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export const getAllPostData = async () => {
  const res = await fetch(new URL(apiUrl).href);
  const posts: PostType[] = await res.json();

  return posts;
};

export const getAllPostIds = async () => {
  const res = await fetch(new URL(apiUrl).href);
  const posts: PostType[] = await res.json();

  return posts.map((post) => {
    return {
      params: {
        id: String(post.id),
      },
    };
  });
};

export const getPostData = async (id: string) => {
  const res = await fetch(new URL(`${apiUrl}/${id}/`).href);
  const post: PostType = await res.json();

  return post;
};
