import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllNoteIds, getNoteData } from '../../lib/notes';
import utilStyles from '../../styles/utils.module.scss';

export default function Note({
  noteData
}: {
  noteData: {
    id: string;
    title: string;
    date: string;
    content: string;
    shortDescription: string;
  };
}) {
  return (
    <Layout
      pageTitle={noteData.title}
      shortDescription={noteData.shortDescription}
    >
      <article>
        <h1 className={utilStyles.headingXl}>{noteData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={noteData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: noteData.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllNoteIds;
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const noteData = await getNoteData(params.id as string);
  return {
    props: {
      noteData
    }
  };
};
