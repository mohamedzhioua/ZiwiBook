import { store } from "../../store"
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { extendedApiSlice } from "../post/postApi";
import { reactionApiSlice } from "../reaction/reactionApi";
import { CommentApiSlice } from "../comment/commentApi";


const Prefetch = () => {

    useEffect(() => {
        store.dispatch(extendedApiSlice.util.prefetch('fetchPosts', 'fetchPosts', { force: true }));
        store.dispatch(reactionApiSlice.util.prefetch('fetchReactions', 'fetchReactions', { force: true }));
        store.dispatch(CommentApiSlice.util.prefetch('fetchComments', 'fetchComments', { force: true })); 
    }, [])

    return <Outlet />
}
export default Prefetch
