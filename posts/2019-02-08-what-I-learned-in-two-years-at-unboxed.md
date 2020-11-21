---
title: 'What I learned in two years at Unboxed'
date: '2019-02-08'
---

When I joined Unboxed in 2016 I had recently moved to the UK and was looking for a place where I
would be able to learn “what good looks like” as a software developer.

This post is inspired by Anna Shipman’s excellent (“What I learned in six years at
GDS”)[https://www.annashipman.co.uk/jfdi/what-i-learned-in-six-years-at-gds.html] which made me
think about my own experience and what work patterns I could extract from it. Here’s what I came up
with

## 1. Communicate your intent

It’s good practice to learn to justify what you’re doing to your team mates before you embark on any
elaborate task. I’ve found it’s always better to include people in your decision process. You can do
this either through pairing, typing things out in a Slack channel or just by asking people questions
informally. Many times the feedback I get from my co-workers gives me new ideas to explore/increases
my understanding on a topic/saves me time. It’s a great way to learn from others and it ensures you
don’t step on people’s toes, especially if you’re just starting out on a team.

Another lesson related to open communication is that it’s useful for you and your co-workers to
speak up about the things that make your job difficult. If there’s something that bothers you,
chances are it’s already bothering someone else as well. And if it’s not, you might point out
something that makes people realise it could be better. It could be something as simple as moving
noisy GitHub alerts out of the main dev Slack channel. Or as complicated as changing a bottleneck
work pattern that holds up deployments.

## 2. TDD like you mean it

It feels like this is common knowledge and yet not everyone appreciates the power of a failing test.
It might be because it’s really quite a boring process with predictable results: you write a test,
it fails, and then the code your write will eventually make it pass. Some of the time, writing a
test gets treated as an afterthought, something that should be done once functionality has already
been implemented.

But using a technique like “red-green-refactor” can lessen your mental workload and bring your ideas
into focus. It forces you to state your intent and narrows down the scope of your problem to a
single issue at a time.

The principle of “red-green-refactor”:

1. Red: Write a failing test that states your intent.
2. Green: Be shameless about getting your test to pass.
3. Refactor: Focus on rewriting your code to make it better.

For a better and more eloquent explanation of why this works™ I recommend checking out Tom Stuart’s
“Get Off the Tightrope” talk: https://confreaks.tv/videos/rubyconf2017-get-off-the-tightrope

## 3. Ask for help

There’s a huge advantage to learning to be ok with not knowing everything. Making an active choice
to ask for help is an an act of courage and not a sign of weakness. I’m painfully aware that I don’t
do this nearly enough and I’m doing my best to work on it. I know things can change quite rapidly in
a project as I learn more about what works and what doesn’t, so I try to be flexible and admit when
something isn’t going as expected. By doing that I hope that my team-mates also feel more
comfortable talking about when they need help and share their pain with me.

In addition, I recommend seeking out mentors that you can learn from. Try to set regular meetings
with people that are better than you. It’s useful to remember that your mentors are human too and
have made more mistakes than you. So they deserve your appreciation for sharing their experiences
and offering you new perspectives.

If setting up a traditional mentorship meeting isn’t an option, then consider trying to learn from
your peers or juniors as much as from someone more senior than you. People enjoy participating and
sharing ideas, so there’s no need to restrict yourself to searching for that perfect all-knowing
mentor. In fact, if they see themselves that way it’s probably best you avoid them and search for a
more ego-less relationship. Getting comfortable with being vulnerable and asking for help applies to
your mentors as much as to you and you should appreciate people who have the courage to admit they
don’t know everything, are fallible, and are willing to learn.

## 4. Make things better for everybody

Whenever your job permits it, try to find ways you could improve things not just for yourself but
for the people around you as well. This can set the tone for your co-workers to want to continue
that pattern by bringing improvements of their own because it feels good to know you’ve got each
other’s backs.

For example: Something as small as suggesting a tool or command to speed up someone’s workflow or
something more elaborate like mentoring someone to become more confident. Another good example for
this is when you’re starting out on a project and have to go through the setup process. Make sure
you write down what pain points you have along the way so that the next person doesn’t have to do
the same amount of work. Perhaps there’s a README with the setup steps that you could improve or a
wiki page/Confluence page etc. If none of these exist, why not start one? It could be as small as
adding a “Setup” section to a project’s README.

Another way to make things better for everyone is to try to organise activities together. I’ve found
that people love interacting and exchanging ideas, as long as you give them a good pretext to get
going. This will help both you and them open up and bond, while possibly learning something along
the way. Even if you didn’t learn anything, you still had some fun, so win-win.

Ex: At some point, I organised a book club that I found was a very good pretext to bounce ideas off
of my reading buddy about best practices (in our case it was about writing tests in RSpec). We found
we got different things from the book we were reading, so it was nice to share and discuss. We both
felt we reached a deeper understanding of our reading material.

## 5. Don’t be busy for the sake of being busy

I personally do my best work when I keep work and personal life separate. This involves keeping a
fixed working schedule and avoiding Slack / work e-mail outside normal working hours. This is
particularly hard when I need to stop myself when I’m in the middle of working on a task. My
solution is to try to organise my day so that I have a buffer before leaving work where I only do
small tasks (usually reviews) and then close down shop for the day.

Equally, it’s a good habit to try to narrow down scope when embarking on a task. Doing too much
might slow you down or demoralise you, especially if you constantly get sucked down rabbit holes. So
it’s a good idea to start from the principle of doing less but doing it well.

One frequent source of scope creep that I’ve encountered a lot is a tendency to try to fix things
that aren’t broken. If you’re running a deployment pipeline that’s not hip and cool there’s no need
for you to venture off into the devops wilderness if your current setup runs just fine and caters to
your needs. It’s not an exciting solution but it does free you up to focus on things that need your
attention and could add new tangible benefits.

## TL;DR

I believe that what lies at the core of these lessons is that knowing how to collaborate in your
team and focusing on being open and honest about what you’re doing are an important part of “what
good looks like” as a software developer. That and writing tests like you mean it. I’m grateful I
got a chance to witness that first hand during my time at Unboxed.
