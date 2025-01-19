export const handleAxiosError = (error: any): string => {
    if (error.response) {
        return error.response.data?.message || "Something went wrong. Please try again later.";
    }
    return "An unexpected error occurred.";
};
