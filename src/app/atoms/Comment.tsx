/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import { MithrilTsxComponent } from 'mithril-tsx-component';
import { ILog } from '../interfaces/Log';
import Button, { ButtonClass } from './Button';

interface Attrs {
    log: ILog;
    key: string | number;
}

type Vnode = m.Vnode<Attrs, Comment>;

export default class Comment extends MithrilTsxComponent<Attrs> {
    view(vnode: Vnode) {
        const { log, key } = vnode.attrs;
        log.creationTime = new Date().toLocaleDateString();
        return (
            <div>
                <ul class="timeline-comments">
                    <li class="timeline-comment" key={key}>
                        <div class="timeline-comment-wrapper">
                            <div class="timeline-comment-header">
                                <div class="timeline-comment-header-text">
                                    <div class="timeline-comment-author">
                                        <h5>
                                            <a
                                                href={`/logs/${log.logId}`}
                                            >{`${log.title}, ${log.logId}`}
                                            </a>
                                        </h5>
                                        <div
                                            class="comment-date"
                                            data-toggle="tooltip"
                                            data-placement="top"
                                        >{log.creationTime}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="timeline-comment-body">
                                <p class="mb-0">{log.body}</p>
                            </div>
                            <div class="timeline-comment-footer">
                                <Button
                                    buttonClass={ButtonClass.SMALL}
                                    onClick={() => m.route.set(
                                        `/logs/create/comments/${log.logId}`
                                    )}
                                    text="Reply"
                                />

                            </div>
                        </div>
                    </li>
                    { // Sub-comments of comments
                        log.comments
                            ?
                            <ul class="timeline-comments">
                                {log.comments && log.comments.map((sublog: ILog) =>
                                    <Comment
                                        log={sublog}
                                        key={sublog.logId}
                                    />
                                )}

                            </ul>
                            : <div />
                    }
                </ul>
            </div>
        );
    }
}
