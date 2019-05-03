/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { IDescription } from '../interfaces/Description';
import { ILog } from '../interfaces/Log';
import { IRun } from '../interfaces/Run';

interface Attrs {
    /**
     * Optional string with title. This determens if the list is devided in 2 lists or 1 because
     * the title will take up the left list
     */
    title?: string | null;

    /**
     * List of descriptions (label, value)
     */
    descriptions: IDescription[];

    /**
     * Optional number that determine the length of the first list.
     */
    listLength?: number;

    /**
     * The entity to display the details of.
     */
    entity: ILog | IRun | null;
}

type Vnode = m.Vnode<Attrs, DescriptionList>;

export default class DescriptionList extends MithrilTsxComponent<Attrs> {

    view(vnode: Vnode) {
        const { title, descriptions, listLength, entity } = vnode.attrs;
        return (
            <div>
                {title ?
                    (
                        <div class="row">
                            <div class="col-md-6">
                                <h5 class="card-title">{title}</h5>
                            </div>
                            <div class="col-md-6">
                                {
                                    descriptions.map((description: IDescription) => (
                                        <dl class="row" style="margin-block-end: 0;">
                                            <dt class="col-sm-6">{description.label}</dt>
                                            <dd class="col-sm-6">{description.value(entity)}</dd>
                                        </dl>
                                    ))
                                }
                            </div>
                        </div>
                    ) :
                    (
                        <div class="row">
                            <div class="col-md-6">
                                {
                                    listLength &&
                                    descriptions.slice(0, listLength).map((description: IDescription) => (
                                        <dl class="row" style="margin-block-end: 0;">
                                            <dt class="col-sm-6">{description.label}</dt>
                                            <dd class="col-sm-6">{description.value(entity)}</dd>
                                        </dl>
                                    ))
                                }
                            </div>
                            <div class="col-md-6">
                                {
                                    listLength &&
                                    descriptions.slice(listLength).map((description: IDescription) => (
                                        <dl class="row" style="margin-block-end: 0;">
                                            <dt class="col-sm-6">{description.label}</dt>
                                            <dd class="col-sm-6">{description.value(entity)}</dd>
                                        </dl>
                                    ))
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }
}
