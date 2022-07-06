import { Feed } from 'feed';
import fs from 'fs';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { toHast } from 'mdast-util-to-hast';
import { toHtml } from 'hast-util-to-html';

// @ts-ignore
export const generateRSSFeed = (articles) => {
  const baseUrl = 'https://mahmoudabdelwahab.com';
  const author = {
    name: 'Mahmoud Abdelwahab',
    email: 'hey@mahmoud.codes',
    link: 'https://twitter.com/thisismahmoud_',
  };

  // Construct a new Feed object
  const feed = new Feed({
    title: 'Articles by Mahmoud Abdelwahab',
    description:
      'Thinking out loud and sharing the things I learn about Software Engineering, Developer Relations, Design and more',
    id: baseUrl,
    link: baseUrl,
    language: 'en',
    feedLinks: {
      rss2: `${baseUrl}/rss.xml`,
    },
    copyright: 'Mahmoud Abdelwahab',
    author,
  });

  // Add each article to the feed
  // @ts-ignore
  articles.map((article) => {
    const {
      content,
      filePath,
      data: { date, description, title },
    } = article;
    const url = `${baseUrl}/writing/${filePath.split('.').slice(0, -1).join('.')}`;
console.log(url);
    const mdast = fromMarkdown(content);
    const hast = toHast(mdast);
    // @ts-ignore
    const html = toHtml(hast);

    feed.addItem({
      title,
      id: url,
      link: url,
      description,
      content: html,
      author: [author],
      date: new Date(date),
    });
  });
  fs.writeFileSync('public/rss.xml', feed.rss2());
};
