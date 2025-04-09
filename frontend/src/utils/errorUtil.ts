export const handleAxiosError = (error: unknown): string => {
    if (error.response) {
        return error.response.data?.message || "Something went wrong. Please try again later.";
    }
    return "An unexpected error occurred.";
};
