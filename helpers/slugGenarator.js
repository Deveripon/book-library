export const generateSlug = (str) => {
    // Lowercase the string and replace spaces with hyphens
    const slug = str.toLowerCase().replace(/\s+/g, "-");

    // Remove special characters and non-alphanumeric characters
    return slug.replace(/[^\w-]+/g, "");
};
