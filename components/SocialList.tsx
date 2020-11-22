import utilStyles from '../styles/utils.module.scss';

export default function SocialList() {
  return (
    <div>
      <a
        className={utilStyles.social}
        title="Twitter"
        href="https://twitter.com/elenatanasoiu"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/images/twitter.svg" width="24" height="24" alt="Twitter icon" />
      </a>
      <a
        className={utilStyles.social}
        title="GitHub"
        href="https://github.com/elenatanasoiu"
        target="_blank"
        rel="noreferrer"
      >
        <img src="/images/github.svg" width="24" height="24" alt="Github icon" />
      </a>
    </div>
  );
}
