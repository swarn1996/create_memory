import { createSlice,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const POST_URL = 'http://localhost:5000/posts'

const initialState = {
 posts:[],
 updatePostId:null,
 status:"idle",
 error:null
};

export const getPosts  = createAsyncThunk('posts/getPosts', async ()=>{
       const response = await axios.get(POST_URL);
       return response.data
})
export const createPost  = createAsyncThunk('posts/createPost' , async (postData) =>{
    const response = await axios.post(POST_URL,postData);
    return response.data;
})
export const updatePostById = createAsyncThunk('posts/updatePostById', async ({_id,postData}) =>{
    const response = await axios.patch(`${POST_URL}/${_id}`,postData);
    return response.data;
})
export const deletePostById = createAsyncThunk('posts/deletePostById', async(_id) =>{
    const response = await axios.delete(`${POST_URL}/${_id}`)
    return response.data
})
export const updatePostLike = createAsyncThunk('posts/updatePostLike' ,  async(_id) =>{
    const response = await axios.patch(`${POST_URL}/${_id}/likePost`);
    return response.data
})

const postsSlice = createSlice({
    name:"posts",
    initialState,
    reducers:{
        updatePostId(state,action){
            state.updatePostId = action.payload
        }
    },
    extraReducers:builder =>{
        builder.addCase(getPosts.fulfilled, (state,action) =>{
            state.status = "succeeded"
            state.posts = action.payload
        })
        builder.addCase(getPosts.rejected,(state,action)=>{
            state.status = "failed"
            state.error = action.error.message
        })
        builder.addCase(createPost.fulfilled,(state,action)=>{
            state.posts.push(action.payload);
        })
        builder.addCase(updatePostById.fulfilled,(state,action)=>{
            state.updatePostId = null;
            const array = [...state.posts]
           const updateArray =  array.map(item => item._id === action.payload._id ? action.payload : item);
            state.posts = updateArray
        })
        builder.addCase(deletePostById.fulfilled,(state,action)=>{
            state.updatePostId = null;
            const array = [...state.posts];
            const updateArray = array.filter(post => post._id !== action.payload);
            state.posts = updateArray;
        })
        builder.addCase(updatePostLike.fulfilled,(state,action)=>{
            state.updatePostId = null;
            const array = [...state.posts];
            const findPostIndex  = state.posts.findIndex(post => post._id === action.payload);
            array[findPostIndex].likeCount = ++array[findPostIndex].likeCount;
            console.log(array);
            state.posts = array;
        })
    }
})

export const selectAllPosts = (state) => state.posts.posts;
export const selectID = (state) => state.posts.updatePostId;

export const {  updatePostId } = postsSlice.actions;

export default postsSlice.reducer;
