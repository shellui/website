# ShellUI Website

The official website for ShellUI, the lightweight microfrontend shell.

## Overview

This repository contains the source code for the ShellUI landing page. It is built as a static site using HTML and Tailwind CSS. The site is currently in a "Coming Soon" state as we prepare for the initial release.

## Getting Started

Since this is a static site, you can view it by opening `index.html` in your browser. However, for the best experience, it is recommended to use a local static server.

### Prerequisites

- A web browser
- Python 3 (optional, for simple local server)
- Node.js (optional, for other static servers like `http-server`)

### Running Locally

You can use Python's built-in HTTP server:

```bash
python3 -m http.server 8000
```

Then navigate to `http://localhost:8000` in your browser.

Or with Node.js `http-server` or `serve`:

```bash
npx serve .
```

## Project Structure

```
/
├── index.html          # "Coming Soon" Homepage
├── LICENSE             # MIT License
└── README.md           # Project documentation
```

## Technologies

- **HTML5**: Semantic markup.
- **Tailwind CSS**: Utility-first CSS framework (loaded via CDN for simplicity).
- **Inter Font**: Used for typography.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
