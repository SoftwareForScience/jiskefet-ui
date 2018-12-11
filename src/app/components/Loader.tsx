/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';

export default class Loader extends MithrilTsxComponent<{}> {
    view() {
        return (
            <div>
                <div class="row justify-content-center">
                    <p class="saving col-md-2 mt-5">
                        Logging in<span>.</span><span>.</span><span>.</span>
                    </p>
                </div>
                <script>{setTimeout(() => { m.route.set('/logs'); }, 1500)}</script>
            </div>
        );
    }
}
