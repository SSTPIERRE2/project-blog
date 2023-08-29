import { BLOG_TITLE } from '@/constants';

export const metadata = {
  title: `404 Not found • ${BLOG_TITLE}`,
};

const NotFound = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h1>404 Post not found 😅</h1>
    </div>
  );
};

export default NotFound;
