/**
 * @dev Fuction to set an error message
 * @param message Error object
 * @returns The error message
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ErrorMessage = (message?: any) => {
  const defaultMsg =
    message && typeof message === 'string'
      ? message
      : 'Something went wrong. Please try again later.';

  const contractErrorMessage =
    message?.error?.body && JSON.parse(message?.error?.body)?.error?.message;

  const systemMessage = message?.errorArgs && message?.errorArgs[0];

  const contractRevertErrorMessage =
    message?.error?.error?.body &&
    JSON.parse(message?.error?.error?.body)?.error?.message;

  return new Error(
    contractErrorMessage ||
      contractRevertErrorMessage ||
      systemMessage ||
      defaultMsg
  );
};
