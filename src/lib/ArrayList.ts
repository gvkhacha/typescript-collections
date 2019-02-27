import * as util from './util';
import * as arrays from './arrays';

export default class ArrayList<T> {

    /**
     * Number of elements in the list
     * @type {number}
     * @private
     */
    private nElements: number = 0;


    /**
     * List data
     * @type {Object}
     * @private
     */
    private data: T[] = new Array();
    /**
     * Last node in the list
     * @type {Object}
     * @private
     */

    /**
     * Creates an empty ArrayList
     * @class An ArrayList is a data structure wrapper for Array objects
     * that can manage dynamic size handling
     * @constructor
     */
    constructor() { }

    /**
     * Adds an element to this list.
     * @param {Object} item element to be added.
     * @param {number=} index optional index to add the element. If no index is specified
     * the element is added to the end of this list.
     * @return {boolean} true if the element was added or false if the index is invalid
     * or if the element is undefined.
     */
    add(item: T, index?: number): boolean {
        if (util.isUndefined(index)) {
            index = this.nElements;
        }
        if (index < 0 || index > this.nElements || util.isUndefined(item)) {
            return false;
        }
        this.data.splice(index, 0, item);
        this.nElements++;
        return true;
    }

    /**
     * Returns the first element in this list.
     * @return {*} the first element of the list or undefined if the list is
     * empty.
     */
    first(): T | undefined {
        return this.data[0];
    }

    /**
     * Returns the last element in this list.
     * @return {*} the last element in the list or undefined if the list is
     * empty.
     */
    last(): T | undefined {
        return this.data[this.nElements - 1];
    }

    /**
     * Returns the element at the specified position in this list.
     * @param {number} index desired index.
     * @return {*} the element at the given index or undefined if the index is
     * out of bounds.
     */
    elementAtIndex(index: number): T | undefined {
        return this.data[index];
    }

    /**
     * Returns the index in this list of the first occurrence of the
     * specified element, or -1 if the List does not contain this element.
     * <p>If the elements inside this list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {number} the index in this list of the first occurrence
     * of the specified element, or -1 if this list does not contain the
     * element.
     */
    indexOf(item: T, equalsFunction?: util.IEqualsFunction<T>): number {
        if (util.isUndefined(equalsFunction)) {
            return this.data.indexOf(item);
        }
        if (util.isUndefined(item)) {
            return -1;
        }
        for (let i = 0; i < this.nElements; i++) {
            if (equalsFunction(this.data[i], item)) {
                return i;
            }
        }
        return -1;
    }


    /**
     * Returns true if this list contains the specified element.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to search for.
     * @param {function(Object,Object):boolean=} equalsFunction Optional
     * function used to check if two elements are equal.
     * @return {boolean} true if this list contains the specified element, false
     * otherwise.
     */
    contains(item: T, equalsFunction?: util.IEqualsFunction<T>): boolean {
        return (this.indexOf(item, equalsFunction) >= 0);
    }

    /**
     * Removes the first occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained the specified element.
     */
    remove(item: T, equalsFunction?: util.IEqualsFunction<T>): boolean {
        const equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }

        for (let i = 0; i < this.nElements; i++) {
            if (equalsF(this.data[i], item)) {
                this.data.splice(i, 1);
                i--;
                this.nElements--;
                return true;
            }
        }

        return false;
    }

    /**
     * Removes every occurrence of the specified element in this list.
     * <p>If the elements inside the list are
     * not comparable with the === operator a custom equals function should be
     * provided to perform searches, the function must receive two arguments and
     * return true if they are equal, false otherwise. Example:</p>
     *
     * <pre>
     * const petsAreEqualByName = function(pet1, pet2) {
     *  return pet1.name === pet2.name;
     * }
     * </pre>
     * @param {Object} item element to be removed from this list, if present.
     * @return {boolean} true if the list contained and removed at least one occurance
     * of the specified element
     */
    removeAll(item: T, equalsFunction?: util.IEqualsFunction<T>): boolean {
        const equalsF = equalsFunction || util.defaultEquals;
        if (this.nElements < 1 || util.isUndefined(item)) {
            return false;
        }
        let found = false;
        for (let i = 0; i < this.nElements; i++) {
            if (equalsF(this.data[i], item)) {
                this.data.splice(i, 1);
                i--;
                this.nElements--;
                found = true;
            }
        }

        return found;
    }



    /**
     * Removes all of the elements from this list.
     */
    clear(): void {
        this.nElements = 0;
        this.data = new Array();
    }

    // /**
    //  * Returns true if this list is equal to the given list.
    //  * Two lists are equal if they have the same elements in the same order.
    //  * @param {LinkedList} other the other list.
    //  * @param {function(Object,Object):boolean=} equalsFunction optional
    //  * function used to check if two elements are equal. If the elements in the lists
    //  * are custom objects you should provide a function, otherwise
    //  * the === operator is used to check equality between elements.
    //  * @return {boolean} true if this list is equal to the given list.
    //  */
    // equals(other: any, equalsFunction?: util.IEqualsFunction<T>): boolean {
    //     const eqF = equalsFunction || util.defaultEquals;
    //     if (!(other instanceof LinkedList)) {
    //         return false;
    //     }
    //     if (this.size() !== other.size()) {
    //         return false;
    //     }
    //     return this.equalsAux(this.firstNode, other.firstNode, eqF);
    // }


    /**
     * Removes the element at the specified position in this list.
     * @param {number} index given index.
     * @return {*} removed element or undefined if the index is out of bounds.
     */
    removeElementAtIndex(index: number): T | undefined {
        if (index < 0 || index >= this.nElements) {
            return undefined;
        }
        const element = this.data[index];
        this.data.splice(index, 1);
        this.nElements--;
        return element;
    }

    /**
     * Executes the provided function once for each element present in this list in order.
     * As with native Arrays, if callback modifies the list, some elements may be skipped.
     * @param {function(Object):*} callback function to execute, it is
     * invoked with one argument: the element value, to break the iteration you can
     * optionally return false.
     */
    forEach(callback: util.ILoopFunction<T>): void {
        for (let i = 0; i < this.nElements; i++) {
            if (callback(this.data[i]) === false) {
                break;
            }
        }
    }

    /**
     * Reverses the order of the elements in this list (makes the last
     * element first, and the first element last).
     */
    reverse(): void {
        this.data.reverse();
    }

    /**
     * Returns an array containing all of the elements in this list in proper
     * sequence.
     * @return {Array.<*>} an array containing all of the elements in this list,
     * in proper sequence.
     */
    toArray(): T[] {
        return this.data;
    }

    /**
     * Returns the number of elements in this list.
     * @return {number} the number of elements in this list.
     */
    size(): number {
        return this.nElements;
    }

    /**
     * Returns true if this list contains no elements.
     * @return {boolean} true if this list contains no elements.
     */
    isEmpty(): boolean {
        return this.nElements <= 0;
    }

    toString(): string {
        return this.data.toString();
    }

} // End of ArrayList
