/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { GithubProfileDto } from '../interfaces/GitHubProfile';
import State from '../models/State';
import Spinner from '../components/Spinner';

type Vnode = m.Vnode<{}, Profile>;

export default class Profile extends MithrilTsxComponent<{}> {
    oninit() {
        if (!State.AuthModel.profile) {
            State.AuthModel.fetchProfile();
        }
    }
    view(vnode: Vnode) {
        const profile = State.AuthModel.profile as GithubProfileDto;
        return (
            <Spinner isLoading={State.AuthModel.isFetchingProfile}>
                <div>
                    {profile &&
                        <div class="card" style="width: 18rem;">
                            <img
                                class="card-img-top"
                                src={profile.avatar_url}
                                alt="Card image cap"
                            />
                            <div class="card-body">
                                <h5 class="card-title m-0">{profile.name}</h5>
                                <p class="card-text">{profile.login}</p>
                                <a
                                    href={profile.html_url}
                                    target="_blank"
                                    class="btn btn-outline-success"
                                >
                                    GitHub profile
                                </a>
                            </div>
                        </div>
                    }
                </div>
            </Spinner>
        );
    }
}
