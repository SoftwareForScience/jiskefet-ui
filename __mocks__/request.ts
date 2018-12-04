// mock example from https://jestjs.io/docs/en/tutorial-async

const logs = [
  {
    logId: 1,
    subtype: 'run',
    origin: 'human',
    creationTime: '2018-10-24T13:46:27.000Z',
    title: 'log for run 1',
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
    creationTime: '2018-1 0-24T13:46:28.000Z',
    title: 'log for run 2',
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
    title: 'log for run 3',
    text: 'lorum ipsum',
    subsystemFkSubsystemId: null,
    announcementValidUntil: null,
    commentFkParentLogId: null,
    commentFkRootLogId: null,
  },
];

const runs = [
  {
    runNumber: 1,
    timeO2Start: '2018-11-01T22:40:09.000Z',
    timeTrgStart: '2018-11-01T22:40:09.000Z',
    timeTrgEnd: '2018-11-01T22:40:09.000Z',
    timeO2End: '2018-11-01T22:40:09.000Z',
    activityId: 'Sl4e12ofb83no92ns',
    runType: 'test',
    runQuality: 'test',
    nDetectors: 16,
    nFlps: 7,
    nEpns: 8,
    nTimeframes: 2,
    nSubtimeframes: 4,
    bytesReadOut: 5,
    bytesTimeframeBuilder: 12,
  }, {
    runNumber: 2,
    timeO2Start: '2018-11-01T22:40:09.000Z',
    timeTrgStart: '2018-11-01T22:40:09.000Z',
    timeTrgEnd: '2018-11-01T22:40:09.000Z',
    timeO2End: '2018-11-01T22:40:09.000Z',
    activityId: 'Sl4e12ofb83no92ns',
    runType: 'test',
    runQuality: 'test',
    nDetectors: 16,
    nFlps: 7,
    nEpns: 8,
    nTimeframes: 2,
    nSubtimeframes: 4,
    bytesReadOut: 5,
    bytesTimeframeBuilder: 12,
  }, {
    runNumber: 3,
    timeO2Start: '2018-11-01T22:40:09.000Z',
    timeTrgStart: '2018-11-01T22:40:09.000Z',
    timeTrgEnd: '2018-11-01T22:40:09.000Z',
    timeO2End: '2018-11-01T22:40:09.000Z',
    activityId: 'Sl4e12ofb83no92ns',
    runType: 'test',
    runQuality: 'test',
    nDetectors: 16,
    nFlps: 7,
    nEpns: 8,
    nTimeframes: 2,
    nSubtimeframes: 4,
    bytesReadOut: 5,
    bytesTimeframeBuilder: 12,
  },
];

export default function request(url: string) {
  return new Promise((
    resolve: (value?: {} | PromiseLike<{}> | undefined) => void,
    reject: (reason?: any) => void) => {
    const logId = url.substr(url.lastIndexOf('/') + 1);
    process.nextTick(
      () => (logs[logId]
        ? resolve(logs[logId])
        : reject(new Error(
          `Log with id:${logId} was not found.`,
        ))),
    );
  });
}
