export const isMeasurement = (width) => {
    if (!width) return false;
    return /^\d+(\.\d*)?(px|em|ex|%|in|cn|mm|pt|pc)$/.test(width);
};
