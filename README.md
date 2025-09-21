# Node link previwer


A lightweight Node.js library to fetch link metadata — title, description, and a highlighted image — suitable for building link previews (for example, in chat apps, social embeds, or content summaries).

---

## Table of Contents

- [Features](#features)  
- [Install](#install)  
- [Usage](#usage)  
- [API Reference](#api-reference)  
- [Error Handling](#error-handling)  
- [Edge Cases & Limitations](#edge-cases--limitations)  
- [Development](#development)  
- [Contributing](#contributing)  
- [License](#license)  

---

## Features

- Parse HTML of any public web page to extract:
  - `<title>` tag  
  - `<meta name="description">`  
  - Open Graph image or other prominent images  
- Simple callback‑based API  
- Fast, minimal dependencies  
- Works in Node.js environments  

---

## Install

```bash
npm install @thiagofeijodev/node-link-preview
```

or using Yarn:

```bash
yarn add @thiagofeijodev/node-link-preview
```

---

## Usage

```js
const LinkPreview = require('@thiagofeijodev/node-link-preview');

LinkPreview.search('https://example.com', (data) => {
  console.log('Preview data:', data);
}, (err) => {
  console.error('Error fetching preview:', err);
});
```

Example output:

```js
{
  title: 'Example Domain',
  description: 'This domain is for use in illustrative examples in documents.',
  img: 'https://example.com/images/example.png',
  link: 'https://example.com'
}
```

---

## API Reference

| Method | Signature | Returns / Callback | Description |
|---|---|---|---|
| `search(url, successCallback, errorCallback)` | `url` (string), `successCallback(data)` function, `errorCallback(error)` function | Calls `successCallback` with an object: `{ title, description, img, link }` on success; calls `errorCallback` if something goes wrong | Fetches and parses the given URL to extract metadata |

---

## Error Handling

- Invalid or malformed URLs (e.g. missing protocol)  
- Network issues (timeouts, DNS errors, unreachable host)  
- Non‑HTML responses or pages without expected tags  
- Pages with no images or where images are relative paths  

Wrap in Promises if you prefer async/await usage.

---

## Edge Cases & Limitations

- Pages behind authentication will fail  
- Dynamically loaded content via JavaScript is not supported  
- Relative image URLs may need to be resolved manually  
- Multiple images on a page — first or OG image is chosen  

---

## Development

1. Clone the repo:
```bash
git clone https://github.com/thiagofeijodev/node-link-previewer.git
cd node-link-previewer
```
2. Install dependencies:
```bash
npm install
```
3. Run tests (when available):
```bash
npm test
```

---

## Contributing

- Fork the repo & create a feature branch  
- Write tests for new behavior  
- Maintain consistent code style  
- Open a pull request with clear description of changes  

---

## License

MIT License — see [LICENSE](LICENSE) for details.
