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
import { IEvent } from '../interfaces/Event';
import * as $ from 'jquery';

interface Attrs {
    /**
     * The range of the pagination, from 1 to {numberOfPages}
     */
    numberOfPages: number;
    /**
     * The current 'active' page shown in the pagination component.
     */
    currentPage: number;
    /**
     * Called when switching pages.
     */
    onChange: (newPage: number) => void;
}

type Vnode = m.Vnode<Attrs, Pagination>;

/**
 * Pagination component that is able to select a page over a range, calling onChange when switching pages.
 * (onChange should handle state mutation, i.e. changing the currentPage given to the component externally.)
 */
export default class Pagination extends MithrilTsxComponent<Attrs> {
    /**
     * Boolean whether the input field of manual page selection is active.
     */
    inputIsActive: boolean = false;

    /**
     * A block that does not represent a page, but displays a string.
     * To be used in-between buttons.
     */
    nonPageBlock = (content: string): JSX.Element => (
        <li class={`page-item disabled `}>
            <a class="page-link jf-page-non-link">
                {content}
            </a>
        </li >
    )

    /**
     * Button that shows the current page, becoming an input element on click that
     * enables changes the page with user input.
     */
    currentPageButton = (attrs: Attrs): JSX.Element => {
        const { numberOfPages, currentPage, onChange } = attrs;
        return (
            <li class="page-item active">
                {<input
                    {...{ type: this.inputIsActive ? 'text' : 'hidden' }}
                    class="page-selector form-control form-control-sm"
                    id="page-selector-id"
                    onchange={(event: IEvent) => {
                        let newPage = +event.target.value;
                        newPage = newPage > numberOfPages ? numberOfPages : newPage;
                        newPage = newPage < 1 ? 1 : newPage;
                        newPage = isNaN(newPage) ? currentPage : newPage;
                        onChange(newPage);
                        this.inputIsActive = false;
                    }}
                    onblur={() => this.inputIsActive = false}
                    value={currentPage}
                />}
                {!this.inputIsActive &&
                    <div
                        id="page-selector-label"
                        class="page-link page-selector-label"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Click to manually select a page"
                        onclick={() => {
                            this.inputIsActive = true;
                            ($('#page-selector-label') as any).tooltip('hide');
                        }}
                    >
                        {currentPage}
                    </div>
                }
            </li >
        );
    }

    /**
     * Button that shows a page number and calles a function onClick.
     */
    regularPageButton = (pageNumber: string | number, onClick: (newPage: number) => void): JSX.Element => {
        return (
            <li class="page-item">
                <a
                    class="page-link"
                    id={pageNumber}
                    onclick={() => {
                        this.inputIsActive = false;
                        onClick(+pageNumber);
                    }}
                >
                    {pageNumber}
                </a>
            </li>
        );
    }

    /**
     * A section shown when no pages exist.
     */
    noDataFound = (): JSX.Element => (
        <li class={`page-item disabled`}>
            <a class="page-link text-muted" disabled>
                No results found
            </a>
        </li >
    )

    /**
     * Returns the previous page number or the current page number, if the left-most edge is reached, i.e. page 1.
     */
    previousPage = (currentPage: number): number => {
        return currentPage > 1 ? +currentPage - 1 : currentPage;
    }

    /**
     * Returns the next page number or the current page number, if the right-most edge is reached, i.e. numberOfPages.
     */
    nextPage = (numberOfPages: number, currentPage: number): number => {
        return currentPage < numberOfPages ? +currentPage + 1 : currentPage;
    }

    /**
     * Creates the buttons (excluding nextPage and previousPage) for the pagination component.
     */
    createPageElements = (pages: Array<string | number>, attrs: Attrs): JSX.Element[] => {
        const pageElements = [] as JSX.Element[];
        const { currentPage, onChange } = attrs;

        _.times(pages.length, (i: number) => {
            if (typeof pages[i] === 'number') {
                const isCurrentPage: boolean = pages[i] === +currentPage;
                if (isCurrentPage) {
                    pageElements.push(this.currentPageButton(attrs));
                } else {
                    pageElements.push(this.regularPageButton(pages[i], onChange));
                }
            } else {
                pageElements.push((this.nonPageBlock(pages[i] as string)));
            }
        });
        return pageElements;
    }

    /**
     * Returns an array of the pages that are to be displayed in the final rendering of the pagination component.
     *
     * Example
     * Input:   numberOfPages = 100, currentPage = 20
     * Output:  [1, '...', 18, 19, 20, 21, 22, 'of', 100]
     */
    getPageValues = (numberOfPages: number, currentPage: number): Array<string | number> => {
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
        const pageValues: Array<string | number> = this.getPageValues(numberOfPages, currentPage);

        // JQuery needed to initialize the bootstrap tooltip.
        $(() => {
            ($('[data-toggle="tooltip"]') as any).tooltip();
        });

        return (
            <nav aria-label="Pages">
                <ul class="pagination pagination-sm jf-pagination">
                    <li class={`page-item ${currentPage <= 1 && 'disabled'}`}>
                        <a
                            class="page-link"
                            onclick={() => {
                                this.inputIsActive = false;
                                onChange(this.previousPage(currentPage));
                            }}
                        >
                            Previous
                        </a>
                    </li>
                    {numberOfPages > 0
                        ? this.createPageElements(pageValues, vnode.attrs).map(
                            (pageElement: JSX.Element) => pageElement
                        )
                        : this.noDataFound()
                    }
                    <li class={`page-item ${(+currentPage === +numberOfPages || +numberOfPages === 0) && 'disabled'}`}>
                        <a
                            class="page-link"
                            onclick={() => {
                                this.inputIsActive = false;
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
