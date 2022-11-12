import { statusLibrary } from './status-library';

export function translateStatus(status: number) {
  if (!Object.keys(statusLibrary).includes(status.toString()))
    return statusLibrary[500];
  return statusLibrary[status];
}
