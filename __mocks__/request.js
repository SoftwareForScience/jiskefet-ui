// mock example from https://jestjs.io/docs/en/tutorial-async

const logs = [
  {
    logId: 1,
    subtype: 'run',
    origin: 'human',
    creationTime: '2018-10-24T13:46:27.000Z',
    title: 'log for run 12',
    text: 'lorum ipsum',
    subsystemFkSubsystemId: null,
    announcementValidUntil: null,
    commentFkParentLogId: null,
    commentFkRootLogId: null,
  },
  {
    logId: 2,
    subtype: 'run',
    origin: 'human',
    creationTime: '2018-10-24T13:46:28.000Z',
    title: 'log for run 12',
    text: 'lorum ipsum',
    subsystemFkSubsystemId: null,
    announcementValidUntil: null,
    commentFkParentLogId: null,
    commentFkRootLogId: null,
  },
  {
    logId: 3,
    subtype: 'run',
    origin: 'human',
    creationTime: '2018-10-24T13:46:29.000Z',
    title: 'log for run 12',
    text: 'lorum ipsum',
    subsystemFkSubsystemId: null,
    announcementValidUntil: null,
    commentFkParentLogId: null,
    commentFkRootLogId: null,
  },
];

export default function request(url) {
  return new Promise((resolve, reject) => {
    const logId = url.split('/').pop();
    process.nextTick(
      () => (logs[logId]
        ? resolve(logs[logId])
        : reject(new Error(
          `Log with id${logId} was not found.`,
        ))),
    );
  });
}
