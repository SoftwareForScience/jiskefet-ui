/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { Description } from '../interfaces/Description';
import { Log } from '../interfaces/Log';
import { Run } from '../interfaces/Run';

interface Attrs {
    /**
     * Optional string with title. This determens if the list is devided in 2 lists or 1 because
     * the title will take up the left list
     */
    title?: string;

    /**
     * List of descriptions (label, value)
     */
    descriptions: Description[];

    /**
     * Optional array of 2 positive numbers that determine the length of each list.
     */
    listLength?: number[];

    /**
     * The entity to display the details of.
     */
    entity: Log | Run;
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
                                    descriptions.map((description: Description) => (
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
                                    descriptions.slice(0, listLength[0]).map((description: Description) => (
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
                                    descriptions.slice(listLength[1]).map((description: Description) => (
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
