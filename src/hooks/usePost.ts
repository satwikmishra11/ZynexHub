import { usePostStore } from '../store/postStore';

export const usePost = (postId: string) => {
  const post = usePostStore(state => state.getPost(postId));
  const likePost = usePostStore(state => state.likePost);
  const addComment = usePostStore(state => state.addComment);
  const comments = usePostStore(state => state.comments[postId]);
  const fetchComments = usePostStore(state => state.fetchComments);

  return { post, likePost, addComment, comments, fetchComments };
};
