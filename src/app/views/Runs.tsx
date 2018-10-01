import * as m from 'mithril';
import RunModel from '../models/Run';
import { RunsTable } from './RunsTable';
import Spinner from '../components/Spinner';

export class Runs implements m.Component {
    private isLoading: boolean;

    constructor() {
        this.isLoading = true;
    }

    oninit() {
        RunModel.fetch().then(() => this.isLoading = false);
    }

    view() {
        return (
            <Spinner isLoading={this.isLoading}>
                <RunsTable />
            </Spinner>
        );
    }
}