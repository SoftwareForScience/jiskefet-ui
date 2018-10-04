import * as m from 'mithril';

export interface Run {
    runNumber?: number;
    timeO2Start?: Date;
    timeTrgStart?: Date;
    timeTrgEnd?: Date;
    timeO2End?: Date;
    runType: string[];
    runQuality: string[];
    activityId: string;
    nDetectors: number;
    nFlps: number;
    nEpns: number;
    nTimeframes: number;
    nSubtimeframes: number;
    bytesReadOut: number;
    bytesTimeframeBuilder: number;
}

const RunModel = {
    list: [] as Run[],
    current: {} as Run,
    createRun: {} as Run,
    async fetch() {
        return m.request({
            method: 'GET',
            url: 'http://localhost:3000/runs',
            withCredentials: false
        }).then((result: any) => {
            this.list = result;
        });
    },
    save() {
        return m.request<Run>({
            method: 'POST',
            url: 'http://localhost:3000/runs',
            data: RunModel.createRun,
            withCredentials: false
        });
    },
    fetchById(id: number) {
        return m.request<Run>({
            method: 'GET',
            url: 'http://localhost:3000/runs/' + id,
            withCredentials: false
        }).then((result: any) => {
            this.current = result;
        });
    },
};

type RunModel = typeof RunModel;
export default RunModel;
