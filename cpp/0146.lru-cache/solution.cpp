// Created by kevin.zhao at 2026/05/17 15:47
// leetgo: 1.4.17
// https://leetcode.com/problems/lru-cache/

#include <bits/stdc++.h>
#include "LC_IO.h"
using namespace std;

// @lc code=begin

class LRUCache {
public:
    LRUCache(int capacity) {
        
    }
    
    int get(int key) {
        
    }
    
    void put(int key, int value) {
        
    }
};

// @lc code=end

int main() {
	ios_base::sync_with_stdio(false);
	stringstream out_stream;

	vector<string> method_names;
	LeetCodeIO::scan(cin, method_names);

	LRUCache *obj;
	const unordered_map<string, function<void()>> methods = {
		{ "LRUCache", [&]() {
			int capacity; LeetCodeIO::scan(cin, capacity); cin.ignore();
			obj = new LRUCache(capacity);
			out_stream << "null,";
		} },
		{ "get", [&]() {
			int key; LeetCodeIO::scan(cin, key); cin.ignore();
			LeetCodeIO::print(out_stream, obj->get(key)); out_stream << ',';
		} },
		{ "put", [&]() {
			int key; LeetCodeIO::scan(cin, key); cin.ignore();
			int value; LeetCodeIO::scan(cin, value); cin.ignore();
			obj->put(key, value);
			out_stream << "null,";
		} },
	};
	cin >> ws;
	out_stream << '[';
	for (auto &&method_name : method_names) {
		cin.ignore(2);
		methods.at(method_name)();
	}
	cin.ignore();
	out_stream.seekp(-1, ios_base::end); out_stream << ']';
	cout << "\noutput: " << out_stream.rdbuf() << endl;

	delete obj;
	return 0;
}
