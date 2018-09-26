import * as m from 'mithril'

export interface IRun {
    run_number: number;
    time_o2_start: Date;
    time_trg_start: Date;
    time_trg_end: Date;
    time_o2_end: Date;
    run_type: [];
    run_quality: [];
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
    current: [] as IRun[],
    async fetch() {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/Runs/",
            withCredentials: false
        }).then((result: any)=> {
            this.current = result
        });
    },

    saved: {} as IRun,
    save(poll) {
        return m.request<IRun>( {
            method: "POST",
            url: "http://localhost:3000/Runs",
            data: poll,
            withCredentials: false
        }).then(result => {
            RunModel.saved = result
        });
    },

    updated: {} as IRun,
    patch(poll) {
        return m.request<IRun>( {
            method: "PATCH",
            url: "http://localhost:3000/Runs",
            data: poll,
            withCredentials: false
        }).then(result => {
            RunModel.updated = result
        });
    }
}

type RunModel = typeof RunModel;
export default RunModel;