declare global {
  interface Window {
    browser: {
      bookmarks: bookmarks;
    };
  }
}

export type BookmarkTreeNodeUnmodifiable = 'managed';
export type BookmarkTreeNodeType = 'bookmark' | 'folder' | 'separator';

export type BookmarkTreeNode = {
  id: string;
  parentId?: string;
  index?: number;
  url?: string;
  title: string;
  dateAdded?: number;
  dateGroupModified?: number;
  unmodifiable?: BookmarkTreeNodeUnmodifiable;
  children?: BookmarkTreeNode[];
  type?: BookmarkTreeNodeType;
};

export type CreateDetails = {
  parentId?: string;
  index?: number;
  title?: string;
  type?: BookmarkTreeNodeType;
  url?: string;
};

export interface bookmarks {
  BookmarkTreeNodeUnmodifiable: BookmarkTreeNodeUnmodifiable;
  BookmarkTreeNodeType: BookmarkTreeNodeType;
  BookmarkTreeNode: BookmarkTreeNode;

  CreateDetails: CreateDetails;

  create(bookmark: CreateDetails): Promise<BookmarkTreeNode>;
  get(idOrIdList: string | string[]): Promise<BookmarkTreeNode[]>;
  getChildren(id: string): Promise<BookmarkTreeNode[]>;
  getRecent(numberOfItems: number): Promise<BookmarkTreeNode[]>;
  getSubTree(id: string): Promise<[BookmarkTreeNode]>;
  getTree(): Promise<[BookmarkTreeNode]>;

  Destination:
    | {
        parentId: string;
        index?: number;
      }
    | {
        index: number;
        parentId?: string;
      };
  move(id: string, destination: Destination): Promise<BookmarkTreeNode>;
  remove(id: string): Promise<void>;
  removeTree(id: string): Promise<void>;
  search(
    query:
      | string
      | {
          query?: string;
          url?: string;
          title?: string;
        }
  ): Promise<BookmarkTreeNode[]>;
  update(
    id: string,
    changes: { title: string; url: string }
  ): Promise<BookmarkTreeNode>;

  onCreated: EvListener<(id: string, bookmark: BookmarkTreeNode) => void>;
  onRemoved: EvListener<
    (
      id: string,
      removeInfo: {
        parentId: string;
        index: number;
        node: BookmarkTreeNode;
      }
    ) => void
  >;
  onChanged: EvListener<
    (
      id: string,
      changeInfo: {
        title: string;
        url?: string;
      }
    ) => void
  >;
  onMoved: EvListener<
    (
      id: string,
      moveInfo: {
        parentId: string;
        index: number;
        oldParentId: string;
        oldIndex: number;
      }
    ) => void
  >;
}
