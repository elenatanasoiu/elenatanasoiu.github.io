import Head from 'next/head';
import Link from 'next/link';
import styles from './layout.module.scss';
import utilStyles from '../styles/utils.module.scss';

const name = 'Elena Tănăsoiu';
export const siteTitle = 'Elena Tănăsoiu';
export const siteName = 'Elena Tănăsoiu';
export const siteImagePath = 'me.jpg';

type LayoutProps = {
  children: React.ReactNode;
  home?: boolean;
  pageTitle?: string;
  cardImagePath?: string;
  shortDescription?: string;
};

export default function Layout({
  children,
  home,
  pageTitle,
  shortDescription,
  cardImagePath
}: LayoutProps) {
  return (
    <div className={styles.container}>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/favicon.ico" />
        <meta name="theme-color" content="#000" />
        <meta name="description" content={shortDescription || siteName} />

        <meta property="og:url" content="https://elenatanasoiu.com" key="ogurl" />
        <meta property="og:site_name" content={siteName} key="ogsitename" />
        <meta property="og:title" content={pageTitle || siteTitle} key="ogtitle" />
        <meta property="og:description" content={shortDescription || siteName} key="ogdesc" />
        <meta
          property="og:image"
          content={`https://elenatanasoiu.com/images/${cardImagePath || siteImagePath}`}
          key="ogimage"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@elenatanasoiu" key="twhandle" />
        <meta name="twitter:site" content="https://elenatanasoiu.com" />
        <meta name="twitter:title" content={pageTitle || siteTitle} />
        <meta name="twitter:description" content={shortDescription || siteName} />
        <meta
          name="twitter:image"
          content={`https://elenatanasoiu.com/images/${cardImagePath || siteImagePath}`}
        />

        <title>{pageTitle || siteTitle}</title>
      </Head>
      <header className={styles.header}>
        {home ? (
          <>
            <img
              src="/images/me.jpg"
              className={`${styles.headerHomeImage} ${utilStyles.borderCircle}`}
              alt={name}
            />
            <h1 className={utilStyles.heading2Xl}>{name}</h1>
          </>
        ) : (
          <>
            <Link href="/">
              <a>
                <img
                  src="/images/me.jpg"
                  className={`${styles.headerImage} ${utilStyles.borderCircle}`}
                  alt={name}
                />
              </a>
            </Link>
            <h2 className={utilStyles.headingLg}>
              <Link href="/">
                <a className={utilStyles.colorInherit}>{name}</a>
              </Link>
            </h2>
          </>
        )}
      </header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">
            <a>← Back to home</a>
          </Link>
        </div>
      )}
    </div>
  );
}
