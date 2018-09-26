import * as m from 'mithril'

export interface IRun {
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
    list: [] as IRun[],
    current: {} as IRun,
    async fetch() {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/runs",
            withCredentials: false
        }).then((result: any)=> {
            this.list = result
        });
    },
    save() {
        return m.request<IRun>( {
            method: "POST",
            url: "http://localhost:3000/runs",
            data: RunModel.current,
            withCredentials: false
        })
    },
}

type RunModel = typeof RunModel;
export default RunModel;