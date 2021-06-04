export const authenticateGitHubUser = async ({ proxyUrl, gitHubCode }) => {
  const requestData = { code: gitHubCode };
  const response = await fetch(proxyUrl, {
    method: "POST",
    body: JSON.stringify(requestData),
  });

  if (!response.ok) {
    const message = `Error while trying to authenticate with GitHub: ${response.status}`;
    throw new Error(message);
  }

  const data = await response.json();
  if (data.message) {
    const message = `Error while trying to authenticate with GitHub: ${data.message}`;
    throw new Error(message);
  }

  return data;
};
