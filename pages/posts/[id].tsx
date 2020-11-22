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
  };
}) {
  return (
    <Layout>
      {postData.title}
      <br />
      {postData.id}
      <br />
      <div className={utilStyles.lightText}>
        <Date dateString={postData.date} />
      </div>
      <br />
      <div dangerouslySetInnerHTML={{ __html: postData.content }} />
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
