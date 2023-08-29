import React from 'react';

import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import { notFound } from 'next/navigation';
import { BLOG_TITLE } from '@/constants';
import COMPONENT_MAP from '@/helpers/mdx-components';

export const getPostMetadata = React.cache(async (postSlug) => {
  let post;

  try {
    post = await loadBlogPost(postSlug);
  } catch (err) {
    notFound();
  }

  const {
    frontmatter: { title, publishedOn, abstract },
    content,
  } = post;

  return {
    title: `${title} • ${BLOG_TITLE}`,
    abstract,
    publishedOn,
    content,
  };
});

export async function generateMetadata({ params: { postSlug } }) {
  const { title, abstract } = await getPostMetadata(postSlug);

  return {
    title,
    description: abstract,
  };
}

async function BlogPost({ params: { postSlug } }) {
  const { title, publishedOn, content } = await getPostMetadata(postSlug);

  return (
    <article className={styles.wrapper}>
      <BlogHero title={title} publishedOn={publishedOn} />
      <div className={styles.page}>
        <MDXRemote source={content} components={COMPONENT_MAP} />
      </div>
    </article>
  );
}

export default BlogPost;
