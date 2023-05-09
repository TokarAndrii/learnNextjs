---
title: 'New post abouut revalidation'
date: '2023-05-09'
---

There are two types of revalidation in Next.js:

- Background: Revalidates the data at a specific time interval.
To revalidate cached data at a specific interval, you can use the next.revalidate option in fetch() to set the cache lifetime of a resource (in seconds).

- On-demand: Revalidates the data based on an event such as an update.
Data can be revalidated on-demand by path (revalidatePath) or by cache tag (revalidateTag).