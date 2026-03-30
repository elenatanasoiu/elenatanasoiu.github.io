---
title: "Running Science Experiments in Production with Scientist"
date: "2025-01-09"
description: "How Scientist experiments work, and why I contributed CPU time tracking to the gem."
---

We tried to replace a slow search query with a fast database query. It was 91% faster. It was also wrong 4% of the time.

This is the story of how we caught that - and a good example of why Scientist experiments benefit from CPU time tracking, which I later contributed.

## The experiment that failed

The [repo page investigation](/blog/profiling-one-page) had revealed a search query adding 198ms to every page load. The obvious fix was to replace it with a simple database `EXISTS` query that took about 2ms.

But "obvious" and "correct" are different things. We set up a Scientist experiment to run both implementations side by side in production:

```ruby
science "might-have-packages" do |e|
  e.use   { existing_search_query }   # control: always returned
  e.try   { new_database_query }      # candidate: run & compared
end
```

The control result is always returned to the user. The candidate runs alongside it, and if the results differ, a mismatch is recorded. We started at 1% of traffic. The mismatch rate settled at 3-4%.

We dug into the mismatches and found that the database query only checked for one type of package, while the search service knew about all package types. The faster query was giving wrong answers for repositories with non-Maven packages.

Wrong answers aren't an acceptable trade-off, no matter how fast they are. We reverted the experiment.

(The eventual fix was even better: [remove the check entirely](/blog/profiling-one-page).)

## The question these experiments raise

Running these types of experiments can sometimes be frustrating. The wall-clock timings show a massive improvement, but you want to know something more specific: how much *actual CPU work* is the candidate doing compared to the control?

Wall-clock time tells you how long something took. But it includes I/O wait, GC pauses, and other processes competing for the CPU. A method might take 200ms wall time but only 5ms of CPU time because it's mostly waiting on a network call. The optimisation strategy is completely different depending on which one is the bottleneck.

Scientist didn't track CPU time. So I [added it](https://github.com/github/scientist/pull/275).

## The implementation

The change captures `Process.clock_gettime(Process::CLOCK_PROCESS_CPUTIME_ID)` at the start and end of each observation, alongside the existing wall-clock timing:

```ruby
science "my-experiment" do |e|
  e.use { control_code }
  e.try { candidate_code }
end

# Each observation now includes:
# observation.duration   → wall time
# observation.cpu_time   → CPU time only
```

Now when I run an experiment, I can see whether the candidate is actually doing less CPU work, or just getting lucky with I/O timing. When you're trying to free up CPU capacity on a fleet of servers, that's the metric that actually matters.

## What I learned

The interesting thing about contributing to a library you use at work is that you hit the limitation yourself before you write a line of code. I didn't set out to contribute to Scientist. I was running a different experiment, wanted to compare CPU time, found the tool couldn't do it, and filled the gap.
