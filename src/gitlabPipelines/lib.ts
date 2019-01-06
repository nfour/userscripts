
export function extractProjectAndJobIdsFromUrl (url: string) {
  const jobId = url.split('/').slice(-1)[0];
  const projectId = url.split('/').slice(1, 3).join('/');
  const encodedProjectId = encodeURIComponent(projectId);
  const traceId = `${projectId}_${jobId}`;

  return { jobId, projectId, encodedProjectId, traceId };
}

export function reuseElement ({ existing, html }: {
  html: string;
  existing: JQuery<Element>
}): JQuery<Element> {
  return existing && existing.length
    ? existing
    : $(html);
}
