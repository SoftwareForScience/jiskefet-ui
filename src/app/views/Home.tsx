import * as m from 'mithril';
import { Table } from './Table';

export class Home implements m.Component {
    view() {
        return (
            <div className="container-fluid">
                <Table/>
            </div>
        )
    }
}
