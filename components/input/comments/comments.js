import { useContext, useEffect, useState } from "react";
import NotificationContext from "../../../store/notification-context";

import CommentList from "../comments-list/comment-list";
import NewComment from "../new-comment/new-comment";
import classes from "./comments.module.scss";

const Comments = ({ eventId }) => {
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const notificationCtx = useContext(NotificationContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (showComments) {
      setIsLoading(true);
      fetch("/api/comments/" + eventId)
        .then((response) => response.json())
        .then((data) => {
          setComments(data.comments);
          setIsLoading(false);
        });
    }
  }, [showComments]);

  const toggleCommentsHandler = () => {
    setShowComments((prevStatus) => !prevStatus);
  };

  const addCommentHandler = (commentData) => {
    notificationCtx.showNotofication({
      title: "Sending comment...",
      message: "Your comment will appear soon.",
      status: "pending",
    });
    fetch("/api/comments/" + eventId, {
      method: "POST",
      body: JSON.stringify(commentData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) return response.json();
        return response.json().then((data) => {
          throw new Error(data.message || "Something went wrong.");
        });
      })
      .then((data) =>
        notificationCtx.showNotofication({
          title: "Success!",
          message: "Your comment was saved!",
          status: "success",
        })
      )
      .catch((error) =>
        notificationCtx.showNotofication({
          title: "Error!",
          message: error.message || "Something went wrong.",
          status: "error",
        })
      );
  };

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? "Hide" : "Show"} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && !isLoading && <CommentList items={comments} />}
      {showComments && isLoading && <p>Loading...</p>}
    </section>
  );
};

export default Comments;
