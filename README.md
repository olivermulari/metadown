# Metadown

A simple package that helps parse metadata from markdown files.
Currenlty supports only node.js environments since it uses filesystem.
Example usage:

./path-to/markdown.md

```
---
title: Metadown
description: helps manage metadata in .md files
date: 03.06.2021
---

# This is the content

Aww yeaaa

```

```javascript
import { metadown } from "metadown";

const parsed = await metadown("./path-to/markdown.md")
```

```
typeof parsed {
  metadata: { [key: string]: string };
  content: string;
  title: string; // determined from the content
}
```