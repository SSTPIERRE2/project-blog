import { BLOG_DESCRIPTION, BLOG_TITLE } from '@/constants';
import { getBlogPostList } from '@/helpers/file-helpers';
import RSS from 'rss';

export async function GET() {
  const blogPosts = await getBlogPostList();

  const feed = new RSS({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    webMaster: 'Stephen St.Pierre',
    language: 'en',
  });

  blogPosts.forEach((post) => {
    const { title, abstract, publishedOn } = post;

    feed.item({
      title,
      description: abstract,
      date: publishedOn,
    });
  });

  return new Response(feed.xml({ indent: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
