import { invalid } from '@sveltejs/kit';

// @ts-ignore
export const customResponse = (status, success, message) => {
    if (success) {
        return {
            success: success,
            message: message,
        };
    }
    return invalid(status, {
        success: success,
        message: message,
    });
};