export const sanitizeOpenApiPath = (path: string) => path.replace(/[{}]/gim, '')
