/*
 * Copyright (C) 2018 Amsterdam University of Applied Sciences (AUAS)
 *
 * This software is distributed under the terms of the
 * GNU General Public Licence version 3 (GPL) version 3,
 * copied verbatim in the file "LICENSE"
 */

/**
 * Classes that implement this interface are able to fetch a list
 * of entities with additional filters given as queryParams.
 */
export default interface Fetchable<Entity> {
    fetch(queryParam?: string): void;
}
