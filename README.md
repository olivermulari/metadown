Metadown
========
[![NPM version](https://badgen.net/npm/v/metadown)](https://www.npmjs.com/package/metadown)

A simple package that helps parse metadata from markdown files.
Currenlty supports only node.js environments since it uses filesystem.

# Example usage

./path-to/markdown.md
```
---
title: Metadown
description: helps manage metadata in .md files
date: 03.06.2021
---

# This is a heading

Aww yeaaa

```

Javascript:
```javascript
import metadown from "metadown";

const parsed = await metadown("./path-to/markdown.md")
```

This is the interface for the parsed object
```typescript
interface IParsedMarkdown {
  metadata?: { [key: string]: string };
  title?: string;
  content: string;
}
```
- metadata is the key value pairs of the top part
- title is the biggest title of the markdown content
- content is the actual markdown
