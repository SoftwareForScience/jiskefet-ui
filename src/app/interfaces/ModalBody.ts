/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Interface with the fields for the modal component.
 */
export interface ModalBody {
    /**
     * Optional variable that holds values for the body
     */
    text?: string;

    /**
     * This function should return the JSX.Element that is
     * given to the modal body.
     */
    content: (text?: string) => void;
}
