import Loader from "@/components/shared/Loader";
import PostStats from "@/components/shared/PostStats";
import { Button } from "@/components/ui/button";
import { useUserContext } from "@/context/AuthContext";
import { useGetPostById, useDeletePost } from "@/lib/react-query/queriesAndMutations"
import { multiFormatDateString } from "@/lib/utils";
import { Link, useParams, useNavigate } from "react-router-dom"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/hooks/use-toast";

const PostDetails = () => {
  const { id } = useParams()
  const { data: post, isPending } = useGetPostById(id || '');
  const { user } = useUserContext();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { mutateAsync: deletePost, isPending: isLoadingDelete } = useDeletePost();
  
  const handleDeletePost = async () => {
    try {
      await deletePost({
        postId: post?.$id || '',
        imageId: post?.imageId,
      });

      toast({ title: "Post deleted successfully" });
      navigate("/");
    } catch (error) {
      toast({ title: "Failed to delete post", variant: "destructive" });
    }
  };

  return (
    <div className="post_details-container">
      {isPending ? <Loader /> : (
        <div className="post_details-card">
          <img
            src={post?.imageUrl || '/assets/icons/profile-placeholder.svg'}
            alt="post"
            className="post_details-img"
          />

          <div className="post_details-info">
            <div className="flex-between w-full">
              <Link to={`/profile/${post?.creator.$id}`} className="flex items-center gap-3">
                <img
                  src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                  alt="creator"
                  className="rounded-full w-8 h-8 lg:w-12 lg:h-12"
                />

                <div className="flex flex-col">
                  <p className="body-semibold text-light-1">
                    {post?.creator.name}
                  </p>
                  <div className="flex-center gap-2 text-light-3">
                    <p className="subtle-semibold lg:small-regular">
                      {multiFormatDateString(post?.$createdAt)}
                    </p>
                    -
                    <p className="subtle-semibold lg:small-regular">
                      {post?.location}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex-center gap-3">
                <Link to={`/update-post/${post?.$id}`} className={`${user?.id !== post?.creator.$id && 'hidden'}`}>
                  <img src="/assets/icons/edit.svg" alt="edit" width={24} height={24} />
                </Link>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className={`ghost_details-delete_btn ${user.id !== post?.creator.$id && "hidden"}`}
                    >
                      <img 
                        src="/assets/icons/delete.svg"
                        alt="delete"
                        width={24}
                        height={24}
                      />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="bg-dark-2 border-none">
                    <AlertDialogHeader>
                      <AlertDialogTitle className="text-light-1">Delete Post</AlertDialogTitle>
                      <AlertDialogDescription className="text-light-2">
                        Are you sure you want to delete this post? This action cannot be undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel className="bg-dark-4 text-light-1 hover:bg-dark-4/80">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleDeletePost} 
                        disabled={isLoadingDelete}
                        className="bg-red-500 text-light-1 hover:bg-red-500/80"
                      >
                        {isLoadingDelete ? "Deleting..." : "Delete"}
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>

            </div>
            <hr className="border w-full border-light-4/80" />
            <div className="flex flex-col flex-1 w-full small-medium lg:base-medium">
              <p>{post?.caption}</p>
              <ul className="flex gap-1 mt-2">
                {post?.tags.map((tag: string) => (
                  <li key={tag} className="text-light-3">
                    #{tag}
                  </li>
                ))}
              </ul>
            </div>
            <div className="w-full">
              <PostStats post={post} userId={user?.id} />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PostDetails