/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

 /**
  * Interface for the creation of different tabs.
  */
export interface Tab {
    /**
     * The name of the tab
     */
    name: string;

    /**
     * the id of the tab
     */
    id: string;

    /**
     * Indicator that sets it the class to active if true
     */
    active?: boolean;

    /**
     * Function to create the content of the tab body.
     */
    content: (param?: object | string) => JSX.Element | string;
}
