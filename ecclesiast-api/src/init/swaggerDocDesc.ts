// Constants
import { STATUS_CODES } from "../constants";

const intro = `
Ecclesiast platform provides free solution for analysis of bibles-based and other manuscripts for all accessible languages modern world. This is the documentation of platform’s API extension.
`;
const auth = `
This API uses token authentication (Bearer in HTTP Header). First you retrieve a new Bearer token using login/password authentication. After that you can use it to access other resources.
`;
const tokenDesc = `
The URL examples throughout this documentation use token as a placeholder. For these examples to work, you need to substitute the value with your own access token.
`;
const mediaTypeDesc = `
Where applicable this API uses the JSON media-type. Requests with a message-body are using plain JSON to set or update resource states.


The API accepts JSON in request bodies and requires that the \`Content-type: application/json\` header be specified for all such requests. The API will always respond with a JSON object, unless stated otherwise. Depending on context, resources may be returned as single objects or as arrays of objects, nested within the response object.


\`Content-type: application/json\` and \`Accept: application/json\` headers **should** be set on all requests if not stated otherwise.
`;
const userRolesDesc = `
Each API endpoint has described minimal role to access. Only users with specific roles can access those endpoints. For insufficient role \`403 Forbidden\` HTTP response will be returned.


User roles:

  + \`1 (unconfirmed)\` - registered user with not confirmed e-mail address
  + \`2 (confirmed)\` - registered user with confirmed e-mail address
  + \`9 (network member)\` - user who can have access to Network Member Panel
  + \`11 (moderator)\`
  + \`12 (visualizer)\` - user who can have access to Visualizer Tool
`;
const encodingDesc = `
Every string passed to and from the API needs to be UTF-8 encoded. For maximum compatibility, normalize to Unicode Normalization Form C (NFC) before UTF-8 encoding.
`;
const datesTimesRepresentation = `
All exchange of date and time-related data MUST be done according to ISO 8601 standard and stored in UTC.

All dates in the API are strings in the following format: \`YYYY-MM-DDThh:mm:ss.SSSZ\`.
`;
const paginationDesc = `
This API uses the [Link header - RFC 5988](http://tools.ietf.org/html/rfc5988#page-6) to include pagination details.

An example of a Link header used properly is described in [GitHub documentation](https://developer.github.com/guides/traversing-with-pagination/).

This API returns total count of resources in \`Collection-Total-Count\` HTTP header.
`;

export default `
    ${ intro }

    ## Authentication

    ${ auth }


    **Bearer token example**


    \`sYFuat5lz1y5v0LrCt7Lfqsd32.Jpo1AkdLgm7LbY6eRibN4NYwdsfsdfsfsfs23e2e.9Srf6aMIRJM8KbTwM6\`


    ${ tokenDesc }


    ## Media Type

    ${ mediaTypeDesc }


    ## Status codes

    This API uses HTTP status codes to communicate with the API consumer.

    ${ Object.values(STATUS_CODES).map((codeObj) => `+ \`${ codeObj.STATUS_CODE }\` - ${ codeObj.DESCRIPTION }`) }


    ## Roles

    ${ userRolesDesc }


    ## Encoding

    ${ encodingDesc }


    ## Representation of dates and times

    ${ datesTimesRepresentation }


    ## Pagintation

    ${ paginationDesc }

`;
