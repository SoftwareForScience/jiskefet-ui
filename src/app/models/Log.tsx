import * as m from 'mithril';

export interface Log {
    log_id: number;
    subtype: string;
    user_id?: number;
    origin: string;
    creation_time: string;
    title: string;
    text: string;
    runs?: any[];
}

const LogModel = {
    list: [] as any[],
    current: {} as Log,
    currentIndex: null as number | null,
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
        return m.request<Log>({
            method: 'POST',
            url: 'http://localhost:3000/log',
            data: LogModel.current,
            withCredentials: false
        });
    }
};

type LogModel = typeof LogModel;
export default LogModel;

const dummyLogList = [
    {
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
        log_id: 1,
        subtype: 'run',
        user_id: 10,
        origin: 'human',
        creation_time: '2018-10-10 14:33',
        title: 'this is a title',
        text: 'this is a description',
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
