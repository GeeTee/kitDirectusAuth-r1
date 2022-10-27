import { writable } from 'svelte/store'

const news = writable([]);

const customNewsStore = {
    subscribe: news.subscribe,
    setNews: (itemsArray) => {
        news.set(itemsArray);
    },
    addPost: (PostData) => {
        const newPost = {
            ...PostData
        }
        news.update(items => {
            return [newPost, ...items];
        });
    },
    updatePost: (id, PostData) => {
        news.update((items) => {
        const PostIdx = items.findIndex((item) => item.id == id);
        const updatedPost = {
            ...items[PostIdx],
            ...PostData,
        };
        const updatedPosts = [...items];
        updatedPosts[PostIdx] = updatedPost;
        return updatedPosts;
        });
    },
    deletePost: (id) => {
        news.update((items) => {
        return items.filter((item) => item.id !== id);
        });
    }
};

export default customNewsStore;