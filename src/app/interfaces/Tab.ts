/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface for a tab.
 */
export interface ITab {
  /**
   * The name of the tab
   */
  name: string;

  /**
   * The id of the tab
   */
  id: string;

  /**
   * If the tab is active i.e. selected or not.
   */
  active?: boolean;

  /**
   * Function to create the content of the tab body.
   */
  content: (param?: object | string) => JSX.Element | string;
}
