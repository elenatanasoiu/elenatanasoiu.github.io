import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');
const postFiles = fs.readdirSync(postsDirectory);

const parseMarkdown = (fileName: string) => {
  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

const allPosts = postFiles.map((file) => {
  const id = file.replace(/\.md$/, '');
  const result = parseMarkdown(file);

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
