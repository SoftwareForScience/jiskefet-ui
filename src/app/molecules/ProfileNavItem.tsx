/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import Spinner from '../atoms/Spinner';
import { UserProfile } from '../interfaces/UserProfile';
import { GithubProfileDto } from '../interfaces/GitHubProfile';
import { CernProfileDto } from '../interfaces/CernProfile';
import { store } from '../redux/configureStore';
import { selectIsFetchingProfile } from '../redux/ducks/auth/selectors';
import { logout } from '../redux/ducks/auth/operations';

interface Attrs {
    profile: UserProfile | null;
}

type Vnode = m.Vnode<Attrs, ProfileNavItem>;

export default class ProfileNavItem extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { profile } = vnode.attrs;
        const isCernProfile = localStorage.getItem('USE_CERN_SSO') === 'true';
        return (
            <Spinner isLoading={selectIsFetchingProfile(store.getState())} class="jf-loader-sm mr-3">
                <div class="jf-profile-nav-item">
                    {profile ?
                        <div class="btn-group">
                            <div
                                class="dropdown-toggle mt-2"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false"
                            >
                                <img
                                    src={isCernProfile
                                        ? '/assets/img/user.png'
                                        : (profile as GithubProfileDto).profileData.avatar_url}
                                    class="rounded"
                                    alt={`@${profile.profileData.name}`}
                                    height="25"
                                    width="25"
                                />
                                <span><i class="fas fa-caret-down jf-caret-down ml-2" /></span>
                            </div>
                            <div class="dropdown-menu dropdown-menu-right">
                                <div
                                    class="dropdown-item jf-dropdown-name"
                                    href={`/user/${profile.userData.userId}`}
                                    oncreate={m.route.link}
                                >
                                    Signed in as <br /> <b>{isCernProfile
                                        ? (profile as CernProfileDto).profileData.username
                                        : (profile as GithubProfileDto).profileData.login}</b>
                                </div>
                                <div class="dropdown-divider" />
                                <button
                                    href={`/user/${profile.userData.userId}`}
                                    oncreate={m.route.link}
                                    class="dropdown-item jf-dropdown-item"
                                    type="button"
                                >
                                    Your profile
                                </button>
                                <div class="dropdown-divider" />
                                <button
                                    href="/tokens"
                                    oncreate={m.route.link}
                                    class="dropdown-item jf-dropdown-item"
                                    type="button"
                                >
                                    Tokens
                                </button>
                                <div class="dropdown-divider" />
                                <a
                                    href={`${process.env.API_URL}doc/`}
                                    target="_blank"
                                >
                                    <button
                                        class="dropdown-item jf-dropdown-item"
                                        type="button"
                                    >
                                        API docs
                                    </button>
                                </a>
                                <div class="dropdown-divider" />
                                <a
// tslint:disable-next-line: max-line-length
                                    href="https://alice.its.cern.ch/jira/secure/RapidBoard.jspa?rapidView=309&view=detail&selectedIssue=O2B-124"
                                    target="_blank"
                                >
                                    <button
                                        class="dropdown-item jf-dropdown-item"
                                        type="button"
                                    >
                                        JIRA Board
                                    </button>
                                </a>
                                <div class="dropdown-divider" />
                                <button
                                    type="button"
                                    class="dropdown-item jf-dropdown-item"
                                    onclick={() => store.dispatch(logout())}
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                        : <button
                            class="btn btn-outline-danger"
                            type="button"
                            onclick={() => store.dispatch(logout())}
                        >
                            Sign out
                        </button>
                    }
                </div>
            </Spinner>
        );
    }
}
