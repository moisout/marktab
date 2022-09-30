import { BookmarkTreeNode } from '@/types/browser';
import { mockdata } from '@/data/mockdata';

export const useGetBookmarksTree = () => {
  const runtimeConfig = useRuntimeConfig();

  return useAsyncData<BookmarkTreeNode>('bookmarksTree', async () => {
    if (process.browser && window?.browser) {
      const bookmarksTreeValue = await window.browser.bookmarks.getTree();
      return bookmarksTreeValue[0];
    } else if (runtimeConfig.public.mockData) {
      return mockdata[0] as BookmarkTreeNode;
    }
    return null;
  });
};
