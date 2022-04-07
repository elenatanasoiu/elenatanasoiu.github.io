import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import remark from 'remark';
import html from 'remark-html';

const notesDirectory = path.join(process.cwd(), 'notes');
const noteFiles = fs.readdirSync(notesDirectory);

const parseMarkdown = (id: string) => {
  const fullPath = path.join(notesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  return matter(fileContents);
};

const allNotes = noteFiles.map((file) => {
  const id = file.replace(/\.md$/, '');
  const result = parseMarkdown(id);

  return {
    id,
    ...(result.data as {
      date: string;
      title: string;
      shortDescription: string;
    })
  };
});

export default function notesByDate() {
  return allNotes.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    }
    return -1;
  });
}

export const getAllNoteIds = noteFiles.map((file) => {
  return {
    params: {
      id: file.replace(/\.md$/, '')
    }
  };
});

export async function getNoteData(id: string) {
  const result = parseMarkdown(id);

  const htmlContent = await remark().use(html).process(result.content);
  const content = htmlContent.toString();

  return {
    id,
    content,
    ...(result.data as {
      date: string;
      title: string;
      shortDescription: string;
    })
  };
}
