export const fixReqString = (str: string): string => str.replace('http://', 'https://')
export const getImgUrl = (index: number): string =>
    new URL(`../assets/img/slides/${index}.jpg`, import.meta.url).href
