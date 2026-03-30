export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}

export const socialLinks: SocialLink[] = [
  {
    name: "GitHub",
    url: "https://github.com/elenatanasoiu",
    icon: "github",
  },
  {
    name: "LinkedIn",
    url: "https://linkedin.com/in/elenatanasoiu",
    icon: "linkedin",
  },
  {
    name: "Bluesky",
    url: "https://bsky.app/profile/elenatanasoiu.bsky.social",
    icon: "bluesky",
  },
  {
    name: "Ruby.social",
    url: "https://ruby.social/@elenatanasoiu",
    icon: "mastodon",
  },
];
