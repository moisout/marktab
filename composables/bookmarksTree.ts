import { BookmarkTreeNode } from '@/types/browser';
import { mockdata } from '@/data/mockdata';

export const useGetBookmarksTree = () => {
  const runtimeConfig = useRuntimeConfig();

  const asyncData = useAsyncData<BookmarkTreeNode[]>(
    'bookmarksTree',
    async () => {
      let bookmarksTree: BookmarkTreeNode;
      if (window && window?.browser) {
        const bookmarksTreeValue = await window.browser.bookmarks.getTree();
        bookmarksTree = bookmarksTreeValue[0];
      } else if (runtimeConfig.public.mockData) {
        bookmarksTree = mockdata[0] as BookmarkTreeNode;
      }

      if (bookmarksTree) {
        return sortIntoFolders(
          bookmarksTree.children?.find(el => el?.id?.includes('toolbar'))
            ?.children,
        );
      }
      return null;
    },
    { server: false },
  );

  return asyncData;
};

const sortIntoFolders = (bookmarks: BookmarkTreeNode[]) => {
  const folders = bookmarks.filter(bookmark => bookmark.type === 'folder');

  return [
    ...folders,
    {
      id: random(12),
      title: 'Other',
      type: 'folder',
      children: bookmarks.filter(bookmark => bookmark.type !== 'folder'),
      index: folders.length,
      parentId: folders[0].parentId,
      dateAdded: 0,
      dateGroupModified: 0,
    } as BookmarkTreeNode,
  ].filter(folder => folder?.children?.length > 0);
};

const random = (length = 8) => {
  return Math.random().toString(16).substring(2, length);
};
