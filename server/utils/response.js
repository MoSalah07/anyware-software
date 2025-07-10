export const sendSuccess = (res, data, message = "Success", status = 200) => {
  return res.status(status).json({
    success: true,
    data,
    message,
  });
};

export const sendError = (
  res,
  message = "Something went wrong",
  status = 500,
  error = null
) => {
  return res.status(status).json({
    success: false,
    message,
    ...(error && { error }),
  });
};
