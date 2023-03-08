import { GetStaticProps, GetStaticPaths } from 'next';
import Layout from '../../components/layout';
import Date from '../../components/date';
import { getAllPostIds, getPostData } from '../../lib/posts';
import utilStyles from '../../styles/utils.module.scss';

export default function Post({
  postData
}: {
  postData: {
    id: string;
    title: string;
    date: string;
    content: string;
    cardImagePath: string;
    shortDescription: string;
  };
}) {
  return (
    <Layout
      pageTitle={postData.title}
      shortDescription={postData.shortDescription}
      cardImagePath={postData.cardImagePath}
    >
      <article>
        {postData.cardImagePath && <img src={`/images/${postData.cardImagePath}`} alt={postData.cardImagePath} /> }
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div className={utilStyles.lightText}>
          <Date dateString={postData.date} />
        </div>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds;
  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params.id as string);
  return {
    props: {
      postData
    }
  };
};
