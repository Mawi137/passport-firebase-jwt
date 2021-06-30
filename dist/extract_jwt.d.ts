export function fromHeader(header_name: any): (request: any) => any;
export function fromBodyField(field_name: any): (request: any) => any;
export function fromUrlQueryParameter(param_name: any): (request: any) => any;
export function fromAuthHeaderWithScheme(auth_scheme: any): (request: any) => string;
export function fromAuthHeaderAsBearerToken(): (request: any) => string;
export function fromExtractors(extractors: any): (request: any) => any;
/**
 * This extractor mimics the behavior of the v1.*.* extraction logic.
 *
 * This extractor exists only to provide an easy transition from the v1.*.* API to the v2.0.0
 * API.
 *
 * This extractor first checks the auth header, if it doesn't find a token there then it checks the
 * specified body field and finally the url query parameters.
 *
 * @param options
 *          authScheme: Expected scheme when JWT can be found in HTTP Authorize header. Default is JWT.
 *          tokenBodyField: Field in request body containing token. Default is auth_token.
 *          tokenQueryParameterName: Query parameter name containing the token. Default is auth_token.
 */
export function versionOneCompatibility(options: any): (request: any) => string;
