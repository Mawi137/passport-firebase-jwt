declare function parseAuthHeader(hdrValue: any): {
    scheme: string;
    value: string;
};
export { parseAuthHeader as parse };
