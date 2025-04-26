
export const handleAxiosError = (error: unknown): string => {
    if (error && typeof error === 'object' && 'response' in error) {
        return "Something went wrong. Please try again later.";
    }
    return "An unexpected error occurred.";
};
