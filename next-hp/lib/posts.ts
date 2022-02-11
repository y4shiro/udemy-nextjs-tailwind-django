const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

export type PostType = {
  userId: number;
  id: number;
  title: string;
  body: string;
};

export async function getAllPostData() {
  const res = await fetch(new URL(apiUrl).href);
  const posts = (await res.json()) as PostType[];
  return posts;
}
