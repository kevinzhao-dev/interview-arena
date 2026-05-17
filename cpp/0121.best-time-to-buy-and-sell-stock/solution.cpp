// Created by kevin.zhao at 2026/05/17 16:21
// leetgo: 1.4.17
// https://leetcode.com/problems/best-time-to-buy-and-sell-stock/

#include <bits/stdc++.h>
#include "LC_IO.h"
using namespace std;

// @lc code=begin

class Solution {
public:
    int maxProfit(vector<int>& prices) {
        int maxProfit = 0;
        int left = 0;
        for (int i = 1; i < (int)prices.size(); ++i) {
            if (prices[i] < prices[left]) {
                left = i;
                continue;
            }
            int cur = prices[i] - prices[left];
            maxProfit = max(maxProfit, cur);
        }
        return maxProfit;
    }
};

// @lc code=end

int main() {
	ios_base::sync_with_stdio(false);
	stringstream out_stream;

	vector<int> prices;
	LeetCodeIO::scan(cin, prices);

	Solution *obj = new Solution();
	auto res = obj->maxProfit(prices);
	LeetCodeIO::print(out_stream, res);
	cout << "\noutput: " << out_stream.rdbuf() << endl;

	delete obj;
	return 0;
}
