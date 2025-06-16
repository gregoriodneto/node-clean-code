export class Filters {
    static filtersInStringInArray(content: string, filter: string) {
        return content.toLowerCase().includes(filter.toLowerCase());
    }
}