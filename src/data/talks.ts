export interface Talk {
  title: string;
  event: string;
  date: string;
  location: string;
  type: "talk" | "workshop";
  description: string;
  url?: string;
  videoUrl?: string;
  coSpeaker?: string;
  upcoming: boolean;
}

export const talks: Talk[] = [
  {
    title: "Flamegraphs Workshop",
    event: "Lead Dev London",
    date: "2–3 June 2026",
    location: "London, UK",
    type: "workshop",
    description:
      "An 80-minute hands-on workshop on using flamegraphs to diagnose and fix performance bottlenecks in production applications.",
    url: "https://leaddev.com/london",
    upcoming: true,
  },
  {
    title: "Performance Engineering for Everyone",
    event: "Brighton Ruby",
    date: "27 June 2026",
    location: "Brighton, UK",
    type: "talk",
    description:
      "A real production story about how profiling a single page cut CPU consumption by 13%.",
    url: "https://brightonruby.com",
    coSpeaker: "Emma Gabriel, Sr. Director at GitHub",
    upcoming: true,
  },
  {
    title: "Service Modeling at GitHub",
    event: "Friendly.rb",
    date: "September 2023",
    location: "Bucharest, Romania",
    type: "talk",
    description:
      "Keynote. How GitHub models and monitors its services at scale to keep the platform reliable.",
    videoUrl: "https://www.youtube.com/watch?v=2G35mRB0WFk",
    upcoming: false,
  },
  {
    title: "An RSpec Primer: Increase Your Quality of Life",
    event: "LRUG",
    date: "November 2018",
    location: "London, UK",
    type: "talk",
    description:
      "A practical introduction to writing better RSpec tests and making the testing experience enjoyable.",
    upcoming: false,
  },
];
