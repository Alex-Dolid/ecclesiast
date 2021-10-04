export enum Statuses {
  Success = 200,
  Created = 201,
  Accepted = 202,
  NoContent = 204,
  Found = 302,
  NotModified = 304,
  BadRequest = 400,
  Unauthorized = 401,
  PaymentRequired = 402,
  Forbidden = 403,
  NotFound = 404,
  MethodNotAllowed = 405,
  Conflict = 409,
  UnprocessableEntity = 422,
  ServerError = 500,
  NotImplemented = 501
}

export const DEFAULT_STATUS = Statuses.Success;

type ParamObj = { CODE: number, STATUS: string, DESCRIPTION: string };
const getStatusCodeObj = ({ CODE, STATUS, ...OTHER }: ParamObj): ParamObj & { STATUS_CODE: string } => ({
  CODE,
  STATUS,
  get STATUS_CODE(): string {
    return `${ this.CODE } ${ this.STATUS }`;
  },
  ...OTHER
});

const statusCodes = {
  [Statuses.Success]: {
    CODE: Statuses.Success,
    STATUS: "OK",
    DESCRIPTION: "Response to a successful GET, PUT, PATCH or DELETE"
  },
  [Statuses.Created]: {
    CODE: Statuses.Created,
    STATUS: "Created",
    DESCRIPTION: "Response to a POST that results in a creation"
  },
  [Statuses.Accepted]: {
    CODE: Statuses.Accepted,
    STATUS: "Accepted",
    DESCRIPTION: "The request has been accepted for processing, but the processing has not been completed"
  },
  [Statuses.NoContent]: {
    CODE: Statuses.NoContent,
    STATUS: "No Content",
    DESCRIPTION: "Response to a successful request that won't be returning a body (like a DELETE request)"
  },
  [Statuses.Found]: {
    CODE: Statuses.Found,
    STATUS: "Found",
    DESCRIPTION: "Tells the client to look at (browse to) another url"
  },
  [Statuses.NotModified]: {
    CODE: Statuses.NotModified,
    STATUS: "Not Modified",
    DESCRIPTION: "Response has not been modified since the previous transmission"
  },
  [Statuses.BadRequest]: {
    CODE: Statuses.BadRequest,
    STATUS: "Bad Request",
    DESCRIPTION: "Malformed request; request body validation errors"
  },
  [Statuses.Unauthorized]: {
    CODE: Statuses.Unauthorized,
    STATUS: "Unauthorized",
    DESCRIPTION: "When no or invalid authentication details are provided"
  },
  [Statuses.PaymentRequired]: {
    CODE: Statuses.PaymentRequired,
    STATUS: "Payment required",
    DESCRIPTION: "When payment check has failed"
  },
  [Statuses.Forbidden]: {
    CODE: Statuses.Forbidden,
    STATUS: "Forbidden",
    DESCRIPTION: "When authentication succeeded but authenticated user doesn't have access to the resource"
  },
  [Statuses.NotFound]: {
    CODE: Statuses.NotFound,
    STATUS: "Not Found",
    DESCRIPTION: "When a non-existent resource is requested"
  },
  [Statuses.MethodNotAllowed]: {
    CODE: Statuses.MethodNotAllowed,
    STATUS: "Method Not Allowed",
    DESCRIPTION: "Method not allowed"
  },
  [Statuses.Conflict]: {
    CODE: Statuses.Conflict,
    STATUS: "Conflict",
    DESCRIPTION: "When the request could not be completed due to a conflict with the current state of the resource"
  },
  [Statuses.UnprocessableEntity]: {
    CODE: Statuses.UnprocessableEntity,
    STATUS: "Unprocessable Entity",
    DESCRIPTION: "The request was well-formed but was unable to be followed due to semantic errors"
  },
  [Statuses.ServerError]: {
    CODE: Statuses.ServerError,
    STATUS: "Server Error",
    DESCRIPTION: "Something went wrong on the API end"
  },
  [Statuses.NotImplemented]: {
    CODE: Statuses.NotImplemented,
    STATUS: "Not Implemented",
    DESCRIPTION: "The server either does not recognize the request method, or it lacks the ability to fulfill the request"
  }
};

export const STATUS_CODES = Object.fromEntries(
  Object.entries(statusCodes).map(([ key, value ]) => [ key, getStatusCodeObj(value) ])
);
