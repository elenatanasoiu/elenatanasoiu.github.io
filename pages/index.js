import Head from 'next/head';
import Layout, { siteTitle } from '../components/layout';
import utilStyles from '../styles/utils.module.scss';

export default function Home() {
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section className={utilStyles.headingMd}>
        <p>
          Hello, I’m <strong>Elena</strong>. I’m a software engineer. You can contact me on{' '}
          <a href="https://twitter.com/elenatanasoiu">Twitter</a>.
        </p>
      </section>
    </Layout>
  );
}
