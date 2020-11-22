import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);

    return initialProps;
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          {process.env.HOSTNAME === 'localhost' ? (
            ''
          ) : (
            <>
              <script async src="https://www.googletagmanager.com/gtag/js?id=G-7XFFYZEJ8V" />
              <script
                async
                dangerouslySetInnerHTML={{
                  __html: `window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', 'G-7XFFYZEJ8V');`
                }}
              />
            </>
          )}
          <meta
            name="google-site-verification"
            content="cg7jAFWfVCMMoxw-zNJGgiAPBXETsQfHfFLiY7axkF0"
          />
          <meta
            name="google-site-verification"
            content="cg7jAFWfVCMMoxw-zNJGgiAPBXETsQfHfFLiY7axkF0"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
