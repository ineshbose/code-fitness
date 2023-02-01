import { ofetch } from 'ofetch';
import type { Octokit } from 'octokit';
import type { OctokitResponse } from '@octokit/types';

const getData = <T>(d: OctokitResponse<T>) => d.data;

export const getLists = async (
  octokit: Octokit,
  owner: string,
  repo: string
) => ({
  commits: getData(await octokit.rest.repos.listCommits({ owner, repo })),
  issues: getData(
    await octokit.rest.issues.listForRepo({ owner, repo, state: 'all' })
  ),
  // branches: getData(await octokit.rest.repos.listBranches({ owner, repo })),
});

const fetchShields = (
  spath: string,
  baseURL = 'https://img.shields.io'
): Promise<string> => ofetch(spath, { baseURL, parseResponse: (txt) => txt });

export const getShields = (
  owner: string,
  repo: string,
  commits?: Array<string>,
  branches?: Array<string>,
  files?: Array<string>
) =>
  Promise.all(
    [
      `/github/commit-activity/w/${owner}/${repo}`,
      `/github/contributors/${owner}/${repo}`,
      `/github/last-commit/${owner}/${repo}`,
      `/github/issues-raw/${owner}/${repo}`,
      `/github/issues-closed-raw/${owner}/${repo}`,
      `/github/issues-pr-raw/${owner}/${repo}`,
      `/github/issues-pr-closed-raw/${owner}/${repo}`,
      ...[
        `/snyk/vulnerabilities/github/${owner}/${repo}`,
        `/librariesio/github/${owner}/${repo}`,
      ],
      ...(commits || []).flatMap((c) => [
        // (`/github/commits-difference/${owner}/${repo}?base=main&head=${c}`),
        `/github/last-commit/${owner}/${repo}/${c}`,
        `/github/checks-status/${owner}/${repo}/${c}`,
      ]),
      ...(branches || []).flatMap((b) => [
        // (`/github/commits-difference/${owner}/${repo}?base=main&head=${b}`),
        `/github/last-commit/${owner}/${repo}/${b}`,
        `/github/checks-status/${owner}/${repo}/${b}`,
      ]),
      ...(files || []).flatMap((f) => [`/github/size/${owner}/${repo}/${f}`]),
    ].map((i) => fetchShields(i))
  );
