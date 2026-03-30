---
title: "How We Reduced OpenTelemetry Memory Usage by 97%"
date: "2024-02-22"
description: "A 56-line change to the OpenTelemetry GraphQL instrumentation gem that cut allocated memory from 130KB to 3.6KB per request - by caching attributes that were being recomputed on every single call."
---

The biggest memory hog in our GraphQL stack wasn't our code - it was the library we'd installed to *observe* our code.

This is the story of a [56-line change](https://github.com/open-telemetry/opentelemetry-ruby-contrib/pull/867) to the OpenTelemetry GraphQL instrumentation gem that reduced its memory allocations by 97%.

## The problem

At GitHub, we use OpenTelemetry for distributed tracing. The `opentelemetry-instrumentation-graphql` gem instruments GraphQL queries, creating spans for field execution, type resolution, and authorisation checks.

But when I ran `memory_profiler` against a typical GraphQL request as part of a routine profiling sweep, the numbers were alarming:

```
allocated memory by gem
-----------------------------------
   130,896  graphql/lib    ← the instrumentation
```

Over 130KB of memory allocated per request, just for instrumentation. For a library whose job is to *observe* your application, it was consuming a surprising amount of resources.

## The investigation

Memory profiling revealed the root cause: span attributes were being recomputed from scratch on every single `execute_field` call. For a complex GraphQL query that resolves dozens or hundreds of fields, this meant the same attribute hashes were being created and discarded over and over again.

The attributes in question - things like the field name, parent type, and return type - are static.

## The fix

The fix was to cache these static attributes so they're computed once when the schema loads, not on every field execution. This is a technique that had already been applied in the GraphQL v2 instrumentation - I backported it to v1.

The core change was straightforward:

```ruby
# Before: computed on every call
attributes['graphql.field.parent'] = data[:owner]&.graphql_name

# After: cached per field, computed once
attributes = @cached_attributes[key] ||= {
  'graphql.field.parent' => data[:owner]&.graphql_name
}
```

**56 lines added. 17 lines deleted.**

## The results

```diff
  allocated memory by gem
  -----------------------------------
-   130,896  graphql/lib
+     3,616  graphql/lib  ❗️
```

The results speak for themselves:

- **Total allocated memory:** 130,896 → 3,616 bytes (**97% reduction**)
- **Total allocated objects:** 786 → 32 (**96% reduction**)
- **Overall bytes used:** 2,084,536 → 1,957,424 (**6% reduction**)

The gem went from being one of the top memory allocators to being barely visible in the profiler output.

## The trade-off

This change wasn't entirely free. By caching attributes at the interface level rather than the concrete type level, the `graphql.field.parent` attribute now reports the GraphQL interface name instead of the concrete class for `execute_field` spans.

For example, if you have a `Node` interface implemented by `User` and `Repository`, the parent would be reported as `Node` instead of `User` or `Repository`.

We made this trade-off consciously: very serious performance gains versus 100% specificity in one span attribute. For GraphQL v2, the concrete class is reported - so upgrading always remains an option.

## The lesson

**Profile your dependencies, not just your code.** Instrumentation libraries, ORMs, serialisers, and middleware all allocate memory and consume CPU. When you profile at the application level, these costs are visible - and a small upstream change can have an outsized impact.

This fix was [merged upstream](https://github.com/open-telemetry/opentelemetry-ruby-contrib/pull/867) into the official OpenTelemetry Ruby contrib repository, so every user of the gem benefits from it.

The tools I used:
- [memory_profiler](https://github.com/SamSaffron/memory_profiler) for allocation analysis
- [stackprof](https://github.com/tmm1/stackprof) for CPU profiling
- A custom benchmark script to compare before/after in isolation

If you're new to profiling, check out my [gentle introduction to flamegraphs](/blog/intro-to-flamegraphs) - the same investigative approach applies whether you're profiling your own code or a dependency.
