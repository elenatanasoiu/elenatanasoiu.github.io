import { GetStaticProps } from 'next';
import Link from 'next/link';
import Layout from '../components/layout';
import utilStyles from '../styles/utils.module.scss';
import postsByDate from '../lib/posts';
import Date from '../components/date';
import SocialList from '../components/SocialList';

export default function Home({
  posts
}: {
  posts: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  return (
    <Layout home>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m <strong>Elena</strong>. I’m a software engineer. You can find me on{' '}
          <SocialList />
        </p>
      </section>
      <section className={`${utilStyles.headingMd} ${utilStyles.padding1px}`}>
        <h2 className={utilStyles.headingLg}>Blog</h2>
        <ul className={utilStyles.list}>
          {posts.map(({ id, date, title }) => (
            <li className={utilStyles.listItem} key={id}>
              <Link href={`/posts/${id}`}>{title}</Link>
              <br />
              <small className={utilStyles.lightText}>
                <Date dateString={date} />
              </small>
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const posts = postsByDate();
  return {
    props: {
      posts
    }
  };
};
