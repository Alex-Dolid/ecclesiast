export const DOC_VERSION = "__v";
export const TIMESTAMPS = {
  CREATED_AT: "created",
  UPDATED_AT: "modified"
};
export const RAWS = {
  SORT: `-${ TIMESTAMPS.CREATED_AT }`,
  SELECT: `-${ DOC_VERSION } -${ TIMESTAMPS.CREATED_AT } -${ TIMESTAMPS.UPDATED_AT }`
};
