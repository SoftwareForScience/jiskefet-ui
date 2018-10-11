/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import RunModel, { Run as IRun } from '../models/Run';
import Spinner from '../components/Spinner';
import Card from '../components/Card';
import { format } from 'date-fns';

export class Run implements m.Component {
    private isLoading: boolean;
    private run: IRun;

    constructor() {
        this.isLoading = true;
        RunModel.fetchById(Number(m.route.param('id'))).then(() => {
            this.isLoading = false;
            this.run = RunModel.current;
            this.formatDateFields();
        });  
    }

    formatDateFields = () => {        
        this.run.timeO2Start = format(this.run.timeO2Start, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeO2End = format(this.run.timeO2End, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeTrgStart = format(this.run.timeTrgStart, 'HH:mm:ss DD/MM/YYYY');
        this.run.timeTrgEnd = format(this.run.timeTrgEnd, 'HH:mm:ss DD/MM/YYYY');
    }

    view() {
        return (
            <div className="container-fluid">
                <Spinner isLoading={this.isLoading}>
                    {this.run &&
                        <div className="col-md-12 mx-auto">
                            <div className="row">
                                <div className="col-md-4">
                                    <Card data={this.run} title={'Run'} />
                                </div>
                                <div className="col-md-8">
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Card data={{ lorum: 'ipsum' }} title={'Detectors'} />
                                        </div>
                                        <div className="col-md-6">
                                        <Card data={{ lorum: 'ipsum' }} title={'EPN Role Sessions'} />
                                        </div>
                                    </div>
                                    <br />
                                    <div className="row">
                                        <div className="col-md-6">
                                        <Card data={{ lorum: 'ipsum' }} title={'FLP Role Sessions'} />
                                        </div>
                                        <div className="col-md-6">
                                        <Card data={{ lorum: 'ipsum' }} title={'Run Quality history'} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </Spinner>
            </div >
        );
    }
}
