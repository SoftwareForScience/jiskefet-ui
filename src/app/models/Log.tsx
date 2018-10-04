import * as m from 'mithril';

export interface Log {
    logId?: number;
    subtype: string;
    userId?: number;
    origin: string;
    creationTime: string;
    title: string;
    text: string;
    runs?: any[];
}

const LogModel = {
    list: [] as any[],
    current: {} as Log,
    createLog: {} as Log, // log being created
    async fetch() {
        return m.request({
            method: 'GET',
            url: 'http://localhost:3000/logs',
            withCredentials: false
        }).then((result: any) => {
            this.list = result;
        }).catch(() => {
            const result = dummyLogList;
            this.list = result;
        });

    },
    async fetchOne(id: number) {
        return m.request({
            method: 'GET',
            url: 'http://localhost:3000/logs/' + id,
            withCredentials: false
        }).then((result: any) => {
            this.current = result;
        }).catch(() => {
            const result = dummyLogList[0];
            this.current = result;
        });
    },
    save() {
        LogModel.createLog.creationTime = new Date().toString();
        LogModel.createLog.origin = 'human';
        return m.request<Log>({
            method: 'POST',
            url: 'http://localhost:3000/logs',
            data: LogModel.createLog,
            withCredentials: false
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;

const dummyLogList = [
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
    {
        logId: 1,
        subtype: 'run',
        userId: 10,
        origin: 'human',
        creationTime: '2018-10-10 14:33',
        title: 'Magic happened',
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        runs: [
            {
                run_number: 1
            },
            {
                run_number: 2
            }
        ]
    },
];
