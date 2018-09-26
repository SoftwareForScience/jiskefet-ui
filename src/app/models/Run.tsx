import * as m from 'mithril'

export interface IRun {

}

const RunModel = {
    current: {} as IRun,
    async fetch(id) {
        return m.request({
            method: "GET",
            url: "http://localhost:3000/runs/" + id,
            withCredentials: false
        }).then(result=> {
            RunModel.current = result
        });
    },

    saved: {} as IRun,
    save(poll) {
        return m.request<IRun>( {
            method: "POST",
            url: "http://localhost:3000/runs",
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
            url: "http://localhost:3000/runs",
            data: poll,
            withCredentials: false
        }).then(result => {
            RunModel.updated = result
        });
    }
}
type RunModel = typeof RunModel
export default RunModel