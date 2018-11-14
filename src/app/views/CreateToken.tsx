/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';

export default class CreateToken implements m.Component {

    view() {
        return (
            <div class="container-fluid">
                <div class="row">
                    <div class="col-9 mx-auto bg-light rounded p-4 shadow-sm">
                        <div><h2>Create a new token</h2></div>
                        <div>
                            <p> For a machine to make use of the Jiskefet Logging system it needs access, to get access
                                a token needs to be generated. The token is linked to your account.
                            </p>
                        </div>
                        <form>
                            <dl class="form-group">
                                <dt class="input-label">
                                    <label autofocus="autofocus">Token description</label>
                                </dt>
                                <dd>
                                    <input autofocus="autofocus" class="form-control" id="description" type="text" />
                                    <p class="note">What's the token for?</p>
                                </dd>
                            </dl>
                        </form>
                        <div>
                            <button type="submit" class="btn btn-primary">Generate Token</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
