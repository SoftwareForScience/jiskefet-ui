import * as m from 'mithril';

export interface Log {
    log_id: number;
    subtype: string;
    user_id?: number;
    origin: string;
    creation_time: string;
    title: string;
    text: string;
    runs: [
        {
            run_number: number
        }
    ];
}

const LogModel = {
    list: [] as any[],
    current: {} as Log,
    async fetch() {
        return m.request({
            method: 'GET',
            url: 'http://localhost:3000/logs',
            withCredentials: false
        }).then((result: any) => {
            this.list = result;
        }).catch(() => {
            const result = [
                {
                    log_id: 1,
                    subtype: 'run',
                    user_id: 10,
                    origin: 'human',
                    creation_time: '2018 - 10 - 10',
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
                }
            ];
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
