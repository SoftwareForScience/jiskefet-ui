import * as m from 'mithril';

export interface Run {
    run_number?: number;
    time_o2_start?: Date;
    time_trg_start?: Date;
    time_trg_end?: Date;
    time_o2_end?: Date;
    run_type: string[];
    run_quality: string[];
    activity_id: string;
    n_detectors: number;
    n_flps: number;
    n_epns: number;
    n_timeframes: number;
    n_subtimeframes: number;
    bytes_read_out: number;
    bytes_timeframe_builder: number;
}

const RunModel = {
    list: [] as Run[],
    current: {} as Run,
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
            data: RunModel.current,
            withCredentials: false
        });
    },
    fetchById(id: number) {
        // return m.request<Run>({
        //     method: 'GET',
        //     url: 'http://localhost:3000/runs/' + id,
        //     withCredentials: false
        // }).then((result: any) => {
        //     this.current = result;
        // });
        RunModel.current.run_number = id;
        RunModel.current.run_type = ['test'];
        RunModel.current.run_quality = ['test'];
        RunModel.current.activity_id = "A9j2nI92";
        RunModel.current.n_detectors = 1;
        RunModel.current.n_flps = 2;
        RunModel.current.n_epns = 3;
        RunModel.current.n_timeframes = 4;
        RunModel.current.n_subtimeframes = 5;
        RunModel.current.bytes_read_out = 6;
        RunModel.current.bytes_timeframe_builder = 7;
    },
};

type RunModel = typeof RunModel;
export default RunModel;
