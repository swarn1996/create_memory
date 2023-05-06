import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextField, Button, Typography, Paper } from "@material-ui/core";
import FileBase from "react-file-base64";

import {
  createPost,
  selectID,
  selectAllPosts,
  updatePostById,
  updatePostId,
} from "../../actions/postsSlice";

import useStyles from "./styles";
import { useEffect } from "react";

const Form = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector(selectID);
  const posts = useSelector(selectAllPosts);

  const [postData, setPostData] = useState({
    creator: "",
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  });

  const classes = useStyles();

  useEffect(() => {
    if (selectedPostId !== null) {
      const selectedPost = posts.filter((post) => post._id === selectedPostId);
      if (selectedPost) {
        setPostData({
          creator: `${selectedPost[0].creator}`,
          title: `${selectedPost[0].title}`,
          message: `${selectedPost[0].message}`,
          tags: `${selectedPost[0].tags}`,
          selectedFile: `${selectedPost[0].selectedFile}`,
        });
      }
    }
  }, [selectedPostId]);

  const handleSubmit = () => {
    if (selectedPostId === null) {
      dispatch(createPost(postData));
    } else {
      dispatch(updatePostById({ _id: selectedPostId, postData: postData }));
    }

    clear();
  };
  const clear = () => {
    dispatch(updatePostId(null));
    setPostData({
      creator: "",
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    });
  };
  return (
    <Paper className={classes.paper}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.form} ${classes.root}`}
        // onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {selectedPostId === null ? "Creating a Memory" : "Editing a Memory"}{" "}
        </Typography>
        <TextField
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        />
        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={(base64) =>
              setPostData({ ...postData, selectedFile: base64.base64 })
            }
          />
          <Button
            className={classes.buttonSubmit}
            variant="contained"
            color="primary"
            size="large"
            onClick={handleSubmit}
            fullWidth
          >
            Submit
          </Button>
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={clear}
            fullWidth
          >
            Clear
          </Button>
        </div>
      </form>
    </Paper>
  );
};

export default Form;
