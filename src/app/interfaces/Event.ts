/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Event that is given when calling functions on input elements.
 * e.g. <input type="text" oninput={(event: Event) => event.target.value} />
 */
export interface IEvent {
    target: HTMLInputElement;
    preventDefault: () => void;
}
