import { statusLibrary } from './status-library';

function translateStatus(status: number) {
  if (!Object.keys(statusLibrary).includes(status.toString()))
    return statusLibrary[500];
  return statusLibrary[status];
}

export default translateStatus;
