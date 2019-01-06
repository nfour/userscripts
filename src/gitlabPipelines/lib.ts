
export function GitlabApi ({ token }: {
  token: string,
}) {
  return <typeof fetch> ((url: string, options: RequestInit = {}) => {
    return fetch(`/api/v4${url}`, {
      headers: {
        'private-token': token,
        ...options.headers || {},
      },
      ...options,
    });
  });
}

export function extractProjectAndJobIdsFromUrl (url: string) {
  const jobId = url.split('/').slice(-1)[0];
  const projectId = url.split('/').slice(1, 3).join('/');
  const encodedProjectId = encodeURIComponent(projectId);

  return { jobId, projectId, encodedProjectId };
}

export function reuseElement ({ existing, html }: {
  html: string;
  existing: JQuery<Element>
}): JQuery<Element> {
  return existing && existing.length
    ? existing
    : $(html);
}
