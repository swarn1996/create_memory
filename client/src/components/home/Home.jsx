import { Container, Grid, Grow } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getPosts } from '../../actions/postsSlice'
import Form from '../form/Form'
import Posts from '../posts/Posts'

const Home = () => {
    const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  return (
    <Grow in>
        <Container>
          <Grid
            container
            justifyContent="space-between"
            alignItems="stretch"
            spacing={3}
          >
            <Grid item xs={12} sm={7}>
              <Posts />
            </Grid>
            <Grid item xs={12} sm={4} style={{marginTop: 20}}>
              <Form />
            </Grid>
          </Grid>
        </Container>
      </Grow>
  )
}

export default Home