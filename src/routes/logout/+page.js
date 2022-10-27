export const load = async ({ parent }) => {
    const { user } = await parent();
    if (user) {
        user
    }
};