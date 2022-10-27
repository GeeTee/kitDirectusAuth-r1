import { writable } from "svelte/store";

const user = writable({})

const customUserStore = {
    subscribe: user.subscribe,
    setUser: (userObj) => {
        user.set(userObj)
    },
    updateUser: (userData) => {
        user.update(() => {
            Object.keys(userData).forEach(key => {
                if (userData[key] !== user[key]) {
                    user[key] = userData[key]
                }
            })
            return user
        })
    },
    deleteUser: () => {
        user.update(
            () => { return {}}
        )
    }
}

export default customUserStore