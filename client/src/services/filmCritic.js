import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = 'api_key=XCFghnVFhgKbvCvhj';

export const filmCriticApi = createApi({
    reducerPath: 'filmCriticApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/' }),
    tagTypes: ["Review", "User", "ReviewLike", "Comment"],
    endpoints: (build) => ({
        login: build.mutation({
            query: (body) => ({
                url: `auth/login?${API_KEY}`,
                method: 'POST',
                body,
                credentials: "include",
              }),
        }),
        register: build.mutation({
            query: (body) =>({
                url: `users?${API_KEY}`,
                method: 'POST',
                body,
                credentials: 'include',
            }),
        }),
        me: build.query({
            query: () => ({ 
                url: `auth/me?${API_KEY}`, 
                credentials: 'include',
            }),
        }),
        createReview: build.mutation({
            query: (body) => ({
                url: `reviews?${API_KEY}`,
                method: "POST",
                body,
                credentials: 'include'
            }),
            invalidatesTags: (result, error, arg) => [{ type: 'Review', id: arg.id }],
        }),
        getReviewsByMovie: build.query({
            query: (movie) => {
                var type = movie.title === undefined ? 'shows' : 'movies';
                return {
                    url: `reviews/${type}?id=${movie.id}&${API_KEY}`,
                    credentials: 'include'
                }
            },
            providesTags: (result, error, arg) =>
                result
                ? [...result.map(({ id }) => ({ type: 'Review', id })), 'Review']
                : ['Review'],
        }),
        createReviewLike: build.mutation({
            query: (body) => ({
                url: `likes?${API_KEY}`,
                method: "POST",
                body,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: "ReviewLike", id: arg.id }],
        }),
        getReviewLikesByReviewId: build.query({
            query: (reviewId) => ({
                url: `likes/review?reviewId=${reviewId}&${API_KEY}`,
                credentials: 'include'
            }),
            providesTags: (result, error, arg) =>
                result
                ? [...result.map(({ id }) => ({ type: 'ReviewLike', id })), 'ReviewLike']
                : ['ReviewLike'],
        }),
        deleteReviewLike: build.mutation({
            query: (body) => ({
                url: `likes?${API_KEY}`,
                method: 'DELETE',
                body,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: "ReviewLike", id: arg.id }],
        }),
        getAlreadyReviewed: build.query({
            query: (movieId) => ({
                url: `reviews/alreadyreviewed?id=${movieId}&${API_KEY}`,
                credentials: 'include',
            }),
            providesTages: (result, error, args) =>
                result
                ? [...result.map(({ id }) => ({ type: 'Review', id })), 'Review']
                : ['Review'],
        }),
        createComment: build.mutation({
            query: (body) => ({
                url: `comments?${API_KEY}`,
                method: 'POST',
                body,
                credentials: 'include',
            }),
            invalidatesTags: (result, error, arg) => [{ type: "Comment", id: arg.id }],
        }),
        getComments: build.query({
            query: (args) => {
                var queryString = '';
                Object.keys(args).forEach(key => {
                    queryString += `&${key}=${args[key]}`
                });
                return {
                    url: `comments?${API_KEY}${queryString}`,
                    credentials: 'include'
                }
            },
            providesTags: (result, error, args) =>
                result
                ? [...result.map(({ id }) => ({ type: 'Comment', id })), 'Comment']
                : ['Comment'],
        }),
        getUserProfile: build.query({
            query: (username) => ({
                url: `users/profile?username=${username}&${API_KEY}`,
                credentials: 'include',
            })
        }),
        logOut: build.mutation({
            query: () => ({
                url: `auth/logout?${API_KEY}`,
                method: "POST",
                credentials: 'include',
            }),
        })
    })
});

export const { 
    useLoginMutation, 
    useRegisterMutation, 
    useGetReviewsByMovieQuery, 
    useCreateReviewMutation, 
    useMeQuery,
    useCreateReviewLikeMutation,
    useGetReviewLikesByReviewIdQuery,
    useDeleteReviewLikeMutation,
    useCreateCommentMutation,
    useGetCommentsQuery,
    useGetUserProfileQuery,
    useLogOutMutation,
} = filmCriticApi;