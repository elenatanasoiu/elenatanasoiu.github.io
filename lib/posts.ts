import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'posts');
const postFiles = fs.readdirSync(postsDirectory);

const parseMarkdown = (id: string) => {
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

const allPosts = postFiles.map((file) => {
  const id = file.replace(/\.md$/, '');
  const result = parseMarkdown(id);

  return {
    id,
    ...(result.data as { date: string; title: string })
  };
});

export default function postsByDate() {
  return allPosts.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export const getAllPostIds = postFiles.map((file) => {
  return {
    params: {
      id: file.replace(/\.md$/, '')
    }
  };
});

export async function getPostData(id: string) {
  const result = parseMarkdown(id);

  const htmlContent = await remark().use(html).process(result.content);
  const content = htmlContent.toString();

  return {
    id,
    content,
    ...(result.data as { date: string; title: string })
  };
}
