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
  issues: getData(await octokit.rest.issues.listForRepo({ owner, repo })),
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
  Promise.all([
    fetchShields(`/github/commit-activity/w/${owner}/${repo}`),
    fetchShields(`/github/contributors/${owner}/${repo}`),
    fetchShields(`/github/last-commit/${owner}/${repo}`),
    fetchShields(`/github/issues-raw/${owner}/${repo}`),
    fetchShields(`/github/issues-closed-raw/${owner}/${repo}`),
    fetchShields(`/github/issues-pr-raw/${owner}/${repo}`),
    fetchShields(`/github/issues-pr-closed-raw/${owner}/${repo}`),
    ...[
      fetchShields(`/snyk/vulnerabilities/github/${owner}/${repo}`),
      fetchShields(`/librariesio/github/${owner}/${repo}`),
    ],
    ...(commits || []).flatMap((c) => [
      // fetchShields(`/github/commits-difference/${owner}/${repo}?base=main&head=${c}`),
      fetchShields(`/github/last-commit/${owner}/${repo}/${c}`),
      fetchShields(`/github/checks-status/${owner}/${repo}/${c}`),
    ]),
    ...(branches || []).flatMap((b) => [
      // fetchShields(`/github/commits-difference/${owner}/${repo}?base=main&head=${b}`),
      fetchShields(`/github/last-commit/${owner}/${repo}/${b}`),
      fetchShields(`/github/checks-status/${owner}/${repo}/${b}`),
    ]),
    ...(files || []).flatMap((f) => [
      fetchShields(`/github/size/${owner}/${repo}/${f}`),
    ]),
  ]);
