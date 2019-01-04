
export function GitlabApi ({ token }: {
  token: string,
}) {
  return (url: string, options: RequestInit = {}) => {
    return fetch(`/api/v4${url}`, {
      headers: {
        'private-token': token,
        ...options.headers || {},
      },
      ...options,
    });
  };
}

export function extractProjectAndJobIdsFromUrl (url: string) {
  const jobId = url.split('/').slice(-1)[0];
  const projectId = encodeURIComponent(url.split('/').slice(1, 3).join('/'));

  return { jobId, projectId };
}
