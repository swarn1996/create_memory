import React from 'react'
import Post from './post/Post';
import { Grid, CircularProgress } from '@material-ui/core';
import { useSelector  } from "react-redux";


import { selectAllPosts } from '../../actions/postsSlice';

import useStyles from './styles';


const Posts = () => {
  const posts = useSelector(selectAllPosts);

    const classes  = useStyles();
  return (
    !posts.length ? <CircularProgress /> 
   : <Grid className={classes.container} container alignItems="stretch" spacing={3} > 
       {
        posts.map((post,index)=>(
          <Grid key={index} item xs={12} sm={6}>
            <Post  post={post}/>
            </Grid>
        ))
       }
   </Grid> 
  )
}

export default Posts