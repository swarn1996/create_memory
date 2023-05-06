import React from "react";
import { useDispatch } from "react-redux";
import {
  Card,
  Button,
  Typography,
  CardContent,
  CardMedia,
  CardActions,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";

import {
  updatePostId,
  deletePostById,
  updatePostLike,
} from "../../../actions/postsSlice";

import useStyles from "./styles";

const Post = ({ post }) => {
  const dispatch = useDispatch();

  const handleOnClickEdit = (_id) => {
    dispatch(updatePostId(_id));
  };
  const deletePost = (_id) => {
    dispatch(deletePostById(_id));
  };
  const handleLikeOnClick = (_id) => {
    dispatch(updatePostLike(_id));
  };
  const classes = useStyles();
  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        image={post.selectedFile}
        title={post.title}
      />
      <div className={classes.overlay}>
        <Typography variant="h6"> {post.creator}</Typography>
        <Typography variant="body2">
          {" "}
          {moment(post.createdAt).fromNow()}
        </Typography>
      </div>
      <div className={classes.overlay2}>
        <Button
          style={{ color: "#fff" }}
          size="small"
          onClick={() => handleOnClickEdit(post._id)}
        >
          <MoreHorizIcon fontSize="medium" />
        </Button>
      </div>
      <div className={classes.details}>
        <Typography variant="body2" text="textSecondary">
          {typeof post.tags !== "string"
            ? post.tags.map((tag) => `#${tag} `)
            : `#${post.tags}`}
        </Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>
        {post.title}
      </Typography>
      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          onClick={() => handleLikeOnClick(post._id)}
        >
          <ThumbUpAltIcon fontSize="small" />
          Like &nbsp;
          {post.likeCount}
        </Button>
        <Button
          size="small"
          color="primary"
          onClick={() => deletePost(post._id)}
        >
          <DeleteIcon fontSize="small" />
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default Post;
