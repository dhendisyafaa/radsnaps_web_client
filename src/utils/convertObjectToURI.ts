const convertToURI = (params) => {
  if (Object.keys(params).length === 0) return "";

  const objString =
    "?" +
    Object.keys(params)
      .map((key) => {
        return `${key}=${encodeURIComponent(params[key])}`;
      })
      .join("&");
  return objString;
};

export { convertToURI };
