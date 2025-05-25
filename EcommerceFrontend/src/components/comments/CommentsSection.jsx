import React, { useState } from "react";
import dp from "../../assets/frontend_assets/profile-img/download.jpg";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { postComment } from "../../services/components/commens/postComment";
import toast from "react-hot-toast";
import { getComments } from "../../services/components/commens/getComments";

const CommentItem = ({ comment }) => (
  <div className="flex items-start gap-4 p-4 border border-gray-200 rounded-lg shadow-sm">
    <div className="flex flex-col items-center gap-2">
      <img
        src={dp}
        alt={comment.user}
        className="w-10 h-10 rounded-full object-cover"
      />
      <span className="text-xs text-gray-500">
        {new Date(comment.date).toLocaleDateString()}
      </span>
    </div>
    <div className="flex-1">
      <p className="font-semibold text-zinc-800">{comment.user}</p>
      <p className="text-gray-600 mt-1">{comment.comment}</p>
    </div>
  </div>
);

const CommentInput = ({ onSubmit }) => {
  const namefromlocalstorage = localStorage.getItem("name");
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!namefromlocalstorage.trim() || !comment.trim()) return;
    onSubmit({ user: namefromlocalstorage, comment });
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <textarea
        rows="3"
        className="w-full border border-gray-300 rounded p-2"
        placeholder="Write your comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        required
      />
      <button
        type="submit"
        className="self-start px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Post Comment
      </button>
    </form>
  );
};

const CommentsSection = ({ onNewComment, productData }) => {
  const product_id = productData?.productid;
  const queryClient = useQueryClient();
  const { data, isLoading, error } = useQuery({
    queryKey: ["comments", product_id],
    queryFn: () => getComments({ product_id }),
    refetchOnMount: true,
  });

  const fetchcomments = data?.data;
  console.log("fetchcomments", fetchcomments);
  const postCommentMutation = useMutation({
    mutationFn: postComment,
    onSuccess: (data, variables) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["comments", product_id]);

      onNewComment?.({
        ...variables,
        date: new Date().toISOString(), // add date string
      });
    },
    onError: (err) => {
      toast.error(err.message || "Failed to post comment");
    },
  });

  const handleAddComment = ({ user, comment }) => {
    const user_id = localStorage.getItem("userid");

    if (!user_id || !product_id) {
      toast.error("Missing user or product information");
      return;
    }

    postCommentMutation.mutate({
      user_id,
      product_id,
      comment,
    });
  };

  if (isLoading) return <p>Loading comments...</p>;
  if (error) return <p>Error loading comments.</p>;

  return (
    <div className="space-y-6">
      {!fetchcomments || fetchcomments.length === 0 ? (
        <p className="text-gray-500 text-center py-20">
          No comments available. Be the first to comment!
        </p>
      ) : (
        fetchcomments.map((comment) => (
          <CommentItem key={comment.id || comment.date} comment={comment} />
        ))
      )}

      <div className="bg-gray-50 p-6 rounded-lg">
        <h3 className="text-lg font-medium mb-4">Add a comment</h3>
        <CommentInput onSubmit={handleAddComment} />
      </div>
    </div>
  );
};

export default CommentsSection;
