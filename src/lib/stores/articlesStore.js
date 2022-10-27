import { writable } from 'svelte/store'

const articles = writable([]);

const customArticlesStore = {
    subscribe: articles.subscribe,
    setArticles: (itemsArray) => {
        articles.set(itemsArray);
    },
    addArticle: (ArticleData) => {
        const newArticle = {
            ...ArticleData
        }
        articles.update(items => {
            return [newArticle, ...items];
        });
    },
    updateArticle: (id, ArticleData) => {
        articles.update((items) => {
        const ArticleIdx = items.findIndex((item) => item.id == id);
        console.log('store start', {id}, {ArticleIdx},  {items}, {ArticleData})
        const updatedArticle = {
            ...items[ArticleIdx],
            ...ArticleData,
        };
        const updatedArticles = [...items];
        updatedArticles[ArticleIdx] = updatedArticle;
        return updatedArticles;
        });
    },
    deleteArticle: (id) => {
        articles.update((items) => {
        return items.filter((item) => item.id !== id);
        });
    }
};

export default customArticlesStore;