import * as collections from '../lib/index';

import * as assert from 'power-assert';
import {expect} from 'chai';

describe('ArrayList',
    function() {

        var list: collections.ArrayList<any>;

        beforeEach(function() {
            list = new collections.ArrayList();
        });

        var toStringF: any = function(f: any) {
            return f.description;
        };

        it('Gives the right size',
            function() {
                list.add('a');
                list.add('b');
                list.add('c');
                expect(list.size()).equals(3);
                list.add('d');
                expect(list.size()).equals(4);
                list.remove('d');
                expect(list.size()).equals(3);
                list.clear();

                list.add('a');
                list.add('b');
                list.add('c');
                expect(list.size()).equals(3);
                list.add('d');
                expect(list.size()).equals(4);
                list.remove('d');
                expect(list.size()).equals(3);
            });

        it('Gives the right size with duplicated elements',
            function() {
                list.add('a');
                list.add('a');
                list.add('b');
                list.add('b');
                list.add('c');
                expect(list.size()).equals(5);
                list.remove('b');
                list.remove('a');
                expect(list.size()).equals(3);
                list.remove('a');
                list.remove('b');
                list.remove('c');
                expect(list.size()).equals(0);
            });

        it('Contains existing elements',
            function() {
                list.add('a');
                list.add('b');
                list.add('c');
                list.add('c');
                list.add('d');

                expect(list.contains('a')).equals(true);
                expect(list.contains('b')).equals(true);
                expect(list.contains('c')).equals(true);
                expect(list.contains('d')).equals(true);
                expect(list.contains('e')).equals(false);
                list.remove('c');
                expect(list.contains('c')).equals(true);
                list.remove('c');
                expect(list.contains('c')).equals(false);
                list.clear();
                list.add(1);
                list.add(2);
                expect(list.contains(1)).equals(true);
                expect(list.contains(2)).equals(true);
                expect(list.contains(3)).equals(false);
            });

        it('An empty bag is empty',
            function() {
                expect(list.isEmpty()).equals(true);
                list.add(1);
                list.add(1);
                expect(list.isEmpty()).equals(false);
                list.remove(1);
                expect(list.isEmpty()).equals(false);
                list.remove(1);
                expect(list.isEmpty()).equals(true);
            });

        it('Adds',
            function() {
                expect(list.add('a')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.contains('a')).equals(true);
                expect(list.contains('b')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.contains('b')).equals(true);
                expect(list.add(null)).equals(true);
                expect(list.contains(null)).equals(true);
                expect(list.add(null)).equals(true);
                expect(list.contains(undefined)).equals(false);
                expect(list.add(undefined)).equals(false);
                expect(list.contains(undefined)).equals(false);
            });

        it('Removes',
            function() {
                expect(list.add('a')).equals(true);
                expect(list.add('a')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.remove('a')).equals(true);
                expect(list.remove('a')).equals(true);
                expect(list.size()).equals(1);
                expect(list.remove('b')).equals(true);
                expect(list.size()).equals(0);
            });

        it('Removes all occurances',
            function(){
                expect(list.removeAll('a')).equals(false);
                expect(list.add('a')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.add('c')).equals(true);
                expect(list.size()).equals(4);
                expect(list.removeAll('a')).equals(true);
                expect(list.size()).equals(3);
                expect(list.removeAll('b')).equals(true);
                expect(list.size()).equals(1);
            });

        it('Clear removes all elements',
            function() {
                expect(list.add('b')).equals(true);
                list.clear();
                expect(list.contains('b')).equals(false);
                expect(list.size()).equals(0);
            });

        it('Converts to an array',
            function() {
                var arr = list.toArray();
                expect(arr.length).equals(0);
                expect(list.add('b')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.add('b')).equals(true);
                expect(list.add('a')).equals(true);
                expect(list.add('a')).equals(true);
                expect(list.add('c')).equals(true);
                arr = list.toArray();
                expect(collections.arrays.frequency(arr, 'b')).equals(3);
                expect(collections.arrays.frequency(arr, 'a')).equals(2);
                expect(collections.arrays.frequency(arr, 'c')).equals(1);
            });

        it('For each gives all the elements',
            function() {
                list.forEach(function(e) {
                    expect(false).equals(true);
                });
                var a = [1, 5, 5, 6];
                list.add(1);
                list.add(5);
                list.add(5);
                list.add(6);
                list.forEach(function(e) {
                    expect(collections.arrays.contains(a, e)).equals(true);
                });
                expect(list.size()).equals(4);
                var count = 0;
                list.forEach(function(e) {
                    expect(collections.arrays.contains(a, e)).equals(true);
                    if (e === 5) {
                        count++;
                    }
                });
                expect(count).equals(2);
            });

        it('For each can be interrupted',
            function() {
                for (var i = 0; i < 5; i++) {
                    list.add(i);
                }
                var t = 0;
                list.forEach(function(e) {
                    t++;
                    return false;
                });
                expect(t).equals(1);
            });
    });
