---
title: "How Removing One Query Cut a Page's CPU by 23%"
date: "2025-03-27"
description: "A flamegraph revealed an unnecessary search query on one of GitHub's most visited pages. The fix was 12 lines added, 65 deleted."
---

The repo overview page is one of GitHub's most visited pages. When I pulled up its flamegraph, one bar stood out immediately: a search query consuming 198ms on every single page load for logged-in users.

This is the story of the wrong fix, the right fix, and the 23% improvement that came from deleting code.

## Starting with the flamegraph

Every performance investigation I do starts the same way: pull up a flamegraph from production traffic and look for things that shouldn't be there.

This particular investigation started as a mob profiling session with a few colleagues. We pulled up a flamegraph of the repository overview page and something immediately stood out: a wide, unmissable bar consuming 198ms.

![Flamegraph showing might_have_packages? taking 198ms on the critical path](/images/flamegraph-overview.png)

The culprit was a method that checked whether a repository had any published packages - running on every single page load, on the critical rendering path. It was making an expensive query against a search service to answer a simple yes/no question.

## The plot thickens

When we zoomed into the method, we found something even more interesting: the same search query was being executed *twice* within the method - once at the start and once at the end.

![Zoomed flamegraph showing duplicate search query](/images/flamegraph-detail.png)

But the real question wasn't "why is this slow?" - it was "why is this here at all?"

The packages sidebar was already loaded as a deferred request. The main page didn't need to know upfront whether packages existed. The sidebar's own endpoint already handled the empty state, rendering a "No packages published" message when appropriate. The upfront check was entirely redundant.

## The first attempt (and why it failed)

Our initial instinct was to replace the expensive search query with a cheaper database query. A simple `EXISTS` query against the packages table would be orders of magnitude faster.

We set up a [Scientist experiment](/blog/scientist-experiments) to validate that the new implementation produced the same results. The database query was 91% faster - but at 1% of production traffic, the mismatch rate settled at 3-4%.

We dug into the mismatches. Every single one was the same pattern: the database query returned `false` (no packages) when the search service returned `true`. The database query was checking `registry_packages` directly, but it only covered Maven packages. The search service indexed *all* package types - npm, Docker, RubyGems, everything.

A 4% error rate on a page serving tens of millions of logged-in requests per day? That's a lot of incorrect sidebar renders. We reverted the experiment. Wrong answers aren't an acceptable trade-off, no matter how fast they are.

## The real fix

Stepping back, a colleague asked the obvious question: why replace the query when we could just *remove it entirely*?

Since the deferred sidebar endpoint already handled the empty state, we could always render the deferred fragment and let it figure out the answer. The only visible difference would be that repositories with no packages would briefly show a skeleton loading state instead of an immediate empty state. A perfectly acceptable trade-off.

**12 lines added. 65 lines deleted.** The best optimisation is the one where you delete code.

In simplified terms, the change looked like this:

```ruby
# Before: check upfront, conditionally render
if might_have_packages?        # ← 198ms search query
  render_deferred :packages
end

# After: always render the deferred fragment
render_deferred :packages      # the endpoint handles the empty state
```

## The results

The improvement showed up immediately and was concentrated entirely in logged-in traffic - confirming that the search query only ran for authenticated users. Anonymous traffic was completely flat, acting as a perfect control group.

**p50 latency (logged-in users):** dropped from ~671ms to ~516ms - **a 23% improvement**, saving ~155ms per request.

**p99 latency:** improved by 5.4%, saving ~73ms per request.

The downstream search service also saw significant load reduction, with call volume dropping by a third.

## What this taught me

Nobody on the team would have guessed a packages sidebar check was the most expensive thing on the page. The flamegraph made it obvious.

The first fix we tried (replace the query) was more complex and had correctness issues. The fix that actually worked (remove the query) was simpler and had no downsides. `git blame` confirmed the check was added when the packages feature launched and the sidebar was rendered inline. The page architecture had since evolved to use deferred loading, making the upfront check unnecessary - but nobody noticed because it wasn't visibly broken. It just cost 155ms that nobody could see without a flamegraph.

This was a [textbook case of strategy #1](/blog/intro-to-flamegraphs): *don't do it*. The work didn't need to happen at all.

I'll be telling this story in more detail at [Brighton Ruby](https://brightonruby.com) in June 2026, co-presented with Emma Gabriel.
