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
import { Event } from '../interfaces/Event';
import * as $ from 'jquery';

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
    editable: boolean = false;

    pageInput = (currentPage: number, numberOfPages: number, onChange: (page: number) => void): JSX.Element => {
        return (
            <div>
                {this.editable && <input
                    type="text"
                    class="page-selector form-control form-control-sm"
                    id="page-selector-id"
                    onchange={(event: Event) => {
                        let value = +event.target.value;
                        value = value > numberOfPages ? numberOfPages : value;
                        value = value < 1 ? 1 : value;
                        value = isNaN(value) ? currentPage : value;
                        onChange(value);
                        this.editable = false;
                    }}
                    onblur={() => this.editable = false}
                    value={currentPage}
                    autofocus
                />}
                {!this.editable &&
                    <div
                        id="page-selector-label"
                        class="page-link page-selector-label"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Click to manually select a page"
                        onclick={() => {
                            this.editable = true;
                            ($('#page-selector-label') as any).tooltip('hide');
                        }}
                    >
                        {currentPage}
                    </div>
                }
            </div>
        );
    }

    pageNonLink = (item: string) => (
        <li class={`page-item disabled `}>
            <a class="page-link jf-page-non-link">
                {item}
            </a>
        </li >
    )

    pageLink = (item: string | number, currentPage: number, numberOfPages: number, onChange: (page: number) => void): JSX.Element => {
        if (item === +currentPage) {
            return (
                <li class="page-item active">
                    {this.pageInput(currentPage, numberOfPages, onChange)}
                </li >
            );
        }
        return (
            <li class="page-item">
                <a
                    class="page-link"
                    id={item}
                    onclick={() => {
                        this.editable = false;
                        onChange(+item);
                    }}
                >
                    {item}
                </a>
            </li>
        );
    }

    noDataFound = (): JSX.Element => (
        <li class={`page-item disabled`}>
            <a class="page-link text-muted" disabled>
                No results found
            </a>
        </li >
    )

    previousPage = (currentPage: number): number => {
        this.editable = false;
        return currentPage > 1 ? +currentPage - 1 : currentPage;
    }

    nextPage = (numberOfPages: number, currentPage: number): number => {
        this.editable = false;
        return currentPage < numberOfPages ? +currentPage + 1 : currentPage;
    }

    createPageElements = (numberOfPages: number, onChange: (newPage: number) => void, currentPage: number) => {
        const pagesContent = this.getPages(numberOfPages, currentPage);
        const pages = [] as JSX.Element[];
        if (numberOfPages !== 0) {
            _.times(pagesContent.length, (i: number) => {
                if (typeof pagesContent[i] === 'number') {
                    pages.push((this.pageLink(pagesContent[i], currentPage, numberOfPages, onChange)));
                } else {
                    pages.push((this.pageNonLink(pagesContent[i] as string)));
                }
            });
        } else {
            pages.push((this.noDataFound()));
        }
        return pages;
    }

    getPages = (numberOfPages: number, currentPage: number): Array<string | number> => {
        let pages = [] as Array<string | number>;
        const surroundingPages = 5;
        const start = currentPage - Math.floor((surroundingPages / 2));
        if (start > 2) {
            pages.push('...');
        }
        _.times(surroundingPages, (i: number) => {
            pages.push(i + start);
        });
        _.remove(pages, (currentNumber: number) => {
            return currentNumber <= 1 || currentNumber >= numberOfPages;
        });
        if (numberOfPages > surroundingPages) {
            pages.push('of');
        }
        pages.push(numberOfPages);
        pages = _.concat([1], pages);
        pages = _.uniq(pages);
        return pages;
    }

    view(vnode: Vnode) {
        const { currentPage, numberOfPages, onChange } = vnode.attrs;
        $(() => {
            ($('[data-toggle="tooltip"]') as any).tooltip();
        });
        return (
            <nav aria-label="Pages">
                <ul class="pagination pagination-sm justify-content-center jf-pagination">
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
                    {this.createPageElements(numberOfPages, onChange, currentPage).map((item: JSX.Element) => item)}
                    <li class={`page-item ${(+currentPage === +numberOfPages || +numberOfPages === 0) && 'disabled'}`}>
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
