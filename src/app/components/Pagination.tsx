/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

import * as m from 'mithril';
import * as _ from 'lodash';
import { MithrilTsxComponent } from 'mithril-tsx-component';

interface Attrs {
    numberOfPages: number;
    currentPage: number;
    /**
     * Change the current page number in the state
     */
    onChange: (newPage: number) => void;
}

type Vnode = m.Vnode<Attrs, Pagination>;

export default class Pagination extends MithrilTsxComponent<Attrs> {
    previousPage = (currentPage: number): number => {
        return currentPage > 1 ? currentPage - 1 : currentPage;
    }

    nextPage = (numberOfPages: number, currentPage: number): number => {
        return currentPage < numberOfPages ? +currentPage + 1 : currentPage;
    }

    insertPageLinks = (numberOfPages: number, onChange: (newPage: number) => void, currentPage: number) => {
        const pageLink = [] as JSX.Element[];
        if (numberOfPages !== 0) {
            _.times(numberOfPages, (i: number) => pageLink.push((
                <li class={`page-item ${i + 1 === +currentPage ? 'active' : null}`}>
                    <a
                        class="page-link"
                        id={i + 1}
                        onclick={() => {
                            onChange(i + 1);
                        }}
                    >
                        {i + 1}
                    </a>
                </li >
            )));
        } else {
            pageLink.push((
            <li class={`page-item disabled`}>
                <a class="page-link text-muted" disabled>
                    No data found
                </a>
            </li >
            ));
        }
        return pageLink;
    }

    view(vnode: Vnode) {
        const { currentPage, numberOfPages, onChange } = vnode.attrs;
        return (
            <nav aria-label="Pages">
                <ul class="pagination">
                    <li class={`page-item ${currentPage <= 1 && 'disabled'}`}>
                        <a
                            class="page-link"
                            onclick={() => {
                                onChange(this.previousPage(currentPage));
                            }}
                        >
                            Previous
                        </a>
                    </li>
                    {this.insertPageLinks(numberOfPages, onChange, currentPage).map((pageLink: JSX.Element) => pageLink)}
                    <li class={`page-item ${(+currentPage === +numberOfPages || +numberOfPages === 0)  && 'disabled'}`}>
                        <a
                            class="page-link"
                            onclick={() => {
                                onChange(this.nextPage(numberOfPages, currentPage));
                            }}
                        >
                            Next
                        </a>
                    </li>
                </ul>
            </nav>
        );
    }
}
