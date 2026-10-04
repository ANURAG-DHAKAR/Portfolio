// Minimal GitHub REST helpers used by the admin panel to commit project data
// straight to the repo. The hosting platform redeploys on push.

export const REPO_OWNER = 'ANURAG-DHAKAR';
export const REPO_NAME = 'Portfolio';
export const REPO_BRANCH = 'master';
export const PROJECTS_PATH = 'src/data/projects.json';

const API = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

async function gh<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API}${path}`, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
    },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(`GitHub ${res.status}: ${body.message ?? res.statusText}`);
  }
  return res.json();
}

function decodeBase64Utf8(b64: string) {
  const bin = atob(b64.replace(/\n/g, ''));
  return new TextDecoder().decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
}

function encodeBase64Utf8(text: string) {
  const bytes = new TextEncoder().encode(text);
  let bin = '';
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

/** Checks the token can push to the repo. */
export async function verifyToken(token: string) {
  const repo = await gh<{ permissions?: { push?: boolean } }>(token, '');
  if (!repo.permissions?.push) {
    throw new Error('Token does not have write (Contents) access to this repo.');
  }
}

/** Reads the latest projects.json from the branch (not the possibly stale bundled copy). */
export async function fetchProjectsFile<T>(token: string): Promise<T> {
  const file = await gh<{ content: string }>(
    token,
    `/contents/${PROJECTS_PATH}?ref=${REPO_BRANCH}&t=${Date.now()}`,
  );
  return JSON.parse(decodeBase64Utf8(file.content));
}

export interface CommitFile {
  path: string;
  /** base64-encoded file contents */
  base64: string;
}

/** Creates one commit on REPO_BRANCH containing all given files. */
export async function commitFiles(token: string, message: string, files: CommitFile[]) {
  const ref = await gh<{ object: { sha: string } }>(token, `/git/ref/heads/${REPO_BRANCH}`);
  const parentSha = ref.object.sha;
  const parent = await gh<{ tree: { sha: string } }>(token, `/git/commits/${parentSha}`);

  const tree = await Promise.all(
    files.map(async (f) => {
      const blob = await gh<{ sha: string }>(token, '/git/blobs', {
        method: 'POST',
        body: JSON.stringify({ content: f.base64, encoding: 'base64' }),
      });
      return { path: f.path, mode: '100644', type: 'blob', sha: blob.sha };
    }),
  );

  const newTree = await gh<{ sha: string }>(token, '/git/trees', {
    method: 'POST',
    body: JSON.stringify({ base_tree: parent.tree.sha, tree }),
  });
  const commit = await gh<{ sha: string }>(token, '/git/commits', {
    method: 'POST',
    body: JSON.stringify({ message, tree: newTree.sha, parents: [parentSha] }),
  });
  await gh(token, `/git/refs/heads/${REPO_BRANCH}`, {
    method: 'PATCH',
    body: JSON.stringify({ sha: commit.sha }),
  });
  return commit.sha;
}

export function jsonFile(path: string, data: unknown): CommitFile {
  return { path, base64: encodeBase64Utf8(JSON.stringify(data, null, 2) + '\n') };
}
