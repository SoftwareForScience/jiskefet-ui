/**
 * Classes that implement this interface are able to fetch a list
 * of entities with additional filters given as queryParams.
 */
export default interface Fetchable<Entity> {
    fetch(queryParam?: string): void;
}
