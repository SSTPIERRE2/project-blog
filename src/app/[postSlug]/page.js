import React from 'react';

import BlogHero from '@/components/BlogHero';
import { MDXRemote } from 'next-mdx-remote/rsc';
import styles from './postSlug.module.css';
import { loadBlogPost } from '@/helpers/file-helpers';
import CircularColorsDemo from '@/components/CircularColorsDemo';
import CodeSnippet from '@/components/CodeSnippet';
import dynamic from 'next/dynamic';
import { notFound } from 'next/navigation';

const DivisionGroupsDemo = dynamic(() =>
  import('@/components/DivisionGroupsDemo')
);

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
    title,
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
        <MDXRemote
          source={content}
          components={{
            DivisionGroupsDemo,
            CircularColorsDemo,
            pre: CodeSnippet,
          }}
        />
      </div>
    </article>
  );
}

export default BlogPost;
