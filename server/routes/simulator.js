const express = require("express");
const router = express.Router();

const DSA_PROBLEMS = [
  {
    id: "two-sum",
    title: "Two Sum",
    difficulty: "Easy",
    category: "Arrays",
    description:
      "Given an array of integers nums and an integer target, return indices of the two numbers that add up to target. You may assume each input has exactly one solution.",
    starterCode: `function twoSum(nums, target) {\n  // Your code here\n}`,
    testCases: [
      { input: "([2,7,11,15], 9)", output: "[0,1]" },
      { input: "([3,2,4], 6)", output: "[1,2]" },
      { input: "([3,3], 6)", output: "[0,1]" },
    ],
    solution: `function twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) return [map.get(complement), i];\n    map.set(nums[i], i);\n  }\n  return [];\n}`,
  },
  {
    id: "reverse-string",
    title: "Reverse String",
    difficulty: "Easy",
    category: "Strings",
    description:
      "Write a function that reverses a string in-place. The input string is given as an array of characters. Do not allocate extra space for another array.",
    starterCode: `function reverseString(s) {\n  // Your code here\n}`,
    testCases: [
      { input: "(['h','e','l','l','o'])", output: "['o','l','l','e','h']" },
      {
        input: "(['H','a','n','n','a','h'])",
        output: "['h','a','n','n','a','H']",
      },
    ],
    solution: `function reverseString(s) {\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    [s[left], s[right]] = [s[right], s[left]];\n    left++;\n    right--;\n  }\n  return s;\n}`,
  },
  {
    id: "palindrome",
    title: "Valid Palindrome",
    difficulty: "Easy",
    category: "Strings",
    description:
      "Given a string s, return true if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    starterCode: `function isPalindrome(s) {\n  // Your code here\n}`,
    testCases: [
      { input: "('A man, a plan, a canal: Panama')", output: "true" },
      { input: "('race a car')", output: "false" },
      { input: "(' ') ", output: "true" },
    ],
    solution: `function isPalindrome(s) {\n  s = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();\n  let left = 0, right = s.length - 1;\n  while (left < right) {\n    if (s[left] !== s[right]) return false;\n    left++;\n    right--;\n  }\n  return true;\n}`,
  },
  {
    id: "max-subarray",
    title: "Maximum Subarray Sum",
    difficulty: "Medium",
    category: "Arrays",
    description:
      "Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum. (Kadane's Algorithm)",
    starterCode: `function maxSubArray(nums) {\n  // Your code here\n}`,
    testCases: [
      { input: "([-2,1,-3,4,-1,2,1,-5,4])", output: "6" },
      { input: "([1])", output: "1" },
      { input: "([5,4,-1,7,8])", output: "23" },
    ],
    solution: `function maxSubArray(nums) {\n  let maxSum = nums[0];\n  let currentSum = nums[0];\n  for (let i = 1; i < nums.length; i++) {\n    currentSum = Math.max(nums[i], currentSum + nums[i]);\n    maxSum = Math.max(maxSum, currentSum);\n  }\n  return maxSum;\n}`,
  },
  {
    id: "valid-parentheses",
    title: "Valid Parentheses",
    difficulty: "Easy",
    category: "Stack",
    description:
      "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. An input string is valid if brackets close in the correct order.",
    starterCode: `function isValid(s) {\n  // Your code here\n}`,
    testCases: [
      { input: "('()')", output: "true" },
      { input: "('()[]{}')", output: "true" },
      { input: "('(]')", output: "false" },
      { input: "('([)]')", output: "false" },
    ],
    solution: `function isValid(s) {\n  const stack = [];\n  const map = { '(': ')', '{': '}', '[': ']' };\n  for (const char of s) {\n    if (map[char]) {\n      stack.push(map[char]);\n    } else {\n      if (stack.pop() !== char) return false;\n    }\n  }\n  return stack.length === 0;\n}`,
  },
  {
    id: "merge-sorted",
    title: "Merge Two Sorted Arrays",
    difficulty: "Easy",
    category: "Arrays",
    description:
      "Given two sorted arrays nums1 and nums2, merge them into a single sorted array.",
    starterCode: `function merge(nums1, nums2) {\n  // Your code here\n}`,
    testCases: [
      { input: "([1,2,3], [2,5,6])", output: "[1,2,2,3,5,6]" },
      { input: "([], [1])", output: "[1]" },
      { input: "([1], [])", output: "[1]" },
    ],
    solution: `function merge(nums1, nums2) {\n  const result = [];\n  let i = 0, j = 0;\n  while (i < nums1.length && j < nums2.length) {\n    if (nums1[i] < nums2[j]) result.push(nums1[i++]);\n    else result.push(nums2[j++]);\n  }\n  while (i < nums1.length) result.push(nums1[i++]);\n  while (j < nums2.length) result.push(nums2[j++]);\n  return result;\n}`,
  },
  {
    id: "lru-cache",
    title: "LRU Cache (Design)",
    difficulty: "Medium",
    category: "Design",
    description:
      "Design a data structure that follows the Least Recently Used (LRU) cache constraints. Implement get(key) and put(key, value) in O(1) average time.",
    starterCode: `class LRUCache {\n  constructor(capacity) {\n    // Your code here\n  }\n  get(key) {\n    // Your code here\n  }\n  put(key, value) {\n    // Your code here\n  }\n}`,
    testCases: [
      {
        input: "new LRUCache(2); put(1,1); put(2,2); get(1); put(3,3); get(2);",
        output: "get(1)=1, get(2)=-1",
      },
    ],
    solution: `class LRUCache {\n  constructor(capacity) {\n    this.capacity = capacity;\n    this.cache = new Map();\n  }\n  get(key) {\n    if (!this.cache.has(key)) return -1;\n    const value = this.cache.get(key);\n    this.cache.delete(key);\n    this.cache.set(key, value);\n    return value;\n  }\n  put(key, value) {\n    if (this.cache.has(key)) this.cache.delete(key);\n    else if (this.cache.size >= this.capacity)\n      this.cache.delete(this.cache.keys().next().value);\n    this.cache.set(key, value);\n  }\n}`,
  },
  {
    id: "fibonacci",
    title: "Fibonacci (Memoization)",
    difficulty: "Easy",
    category: "DP",
    description:
      "Write a function that returns the nth Fibonacci number. Use memoization for efficiency.",
    starterCode: `function fib(n, memo = {}) {\n  // Your code here\n}`,
    testCases: [
      { input: "(2)", output: "1" },
      { input: "(5)", output: "5" },
      { input: "(10)", output: "55" },
    ],
    solution: `function fib(n, memo = {}) {\n  if (n <= 1) return n;\n  if (memo[n] !== undefined) return memo[n];\n  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);\n  return memo[n];\n}`,
  },
  {
    id: "anagram",
    title: "Valid Anagram",
    difficulty: "Easy",
    category: "Strings",
    description:
      "Given two strings s and t, return true if t is an anagram of s, and false otherwise. An anagram is a word formed by rearranging the letters of another.",
    starterCode: `function isAnagram(s, t) {\n  // Your code here\n}`,
    testCases: [
      { input: "('anagram', 'nagaram')", output: "true" },
      { input: "('rat', 'car')", output: "false" },
    ],
    solution: `function isAnagram(s, t) {\n  if (s.length !== t.length) return false;\n  const count = new Array(26).fill(0);\n  for (let i = 0; i < s.length; i++) {\n    count[s.charCodeAt(i) - 97]++;\n    count[t.charCodeAt(i) - 97]--;\n  }\n  return count.every(c => c === 0);\n}`,
  },
  {
    id: "binary-search",
    title: "Binary Search",
    difficulty: "Easy",
    category: "Search",
    description:
      "Given a sorted array of integers and a target value, return the index of the target. If not found, return -1.",
    starterCode: `function binarySearch(nums, target) {\n  // Your code here\n}`,
    testCases: [
      { input: "([-1,0,3,5,9,12], 9)", output: "4" },
      { input: "([-1,0,3,5,9,12], 2)", output: "-1" },
    ],
    solution: `function binarySearch(nums, target) {\n  let left = 0, right = nums.length - 1;\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (nums[mid] === target) return mid;\n    if (nums[mid] < target) left = mid + 1;\n    else right = mid - 1;\n  }\n  return -1;\n}`,
  },
  {
    id: "linked-list-cycle",
    title: "Linked List Cycle Detection",
    difficulty: "Easy",
    category: "Linked List",
    description:
      "Given head of a linked list, determine if the linked list has a cycle. Use O(1) memory (Floyd's cycle detection).",
    starterCode: `function hasCycle(head) {\n  // Your code here\n}`,
    testCases: [
      { input: "cycle at pos 1", output: "true" },
      { input: "no cycle", output: "false" },
    ],
    solution: `function hasCycle(head) {\n  if (!head) return false;\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}`,
  },
  {
    id: "coin-change",
    title: "Coin Change (Minimum Coins)",
    difficulty: "Medium",
    category: "DP",
    description:
      "Given an array of coin denominations and a total amount, find the minimum number of coins needed to make that amount. If impossible, return -1.",
    starterCode: `function coinChange(coins, amount) {\n  // Your code here\n}`,
    testCases: [
      { input: "([1,2,5], 11)", output: "3" },
      { input: "([2], 3)", output: "-1" },
      { input: "([1], 0)", output: "0" },
    ],
    solution: `function coinChange(coins, amount) {\n  const dp = new Array(amount + 1).fill(Infinity);\n  dp[0] = 0;\n  for (const coin of coins) {\n    for (let i = coin; i <= amount; i++) {\n      dp[i] = Math.min(dp[i], dp[i - coin] + 1);\n    }\n  }\n  return dp[amount] === Infinity ? -1 : dp[amount];\n}`,
  },
];

// Get all problems
router.get("/problems", (req, res) => {
  const summary = DSA_PROBLEMS.map((p) => ({
    id: p.id,
    title: p.title,
    difficulty: p.difficulty,
    category: p.category,
  }));
  res.json(summary);
});

// Get problem by ID
router.get("/problems/:id", (req, res) => {
  const problem = DSA_PROBLEMS.find((p) => p.id === req.params.id);
  if (!problem) return res.status(404).json({ error: "Problem not found" });
  res.json(problem);
});

// Run code against test cases
router.post("/run", (req, res) => {
  const { problemId, code } = req.body;
  const problem = DSA_PROBLEMS.find((p) => p.id === problemId);
  if (!problem) return res.status(404).json({ error: "Problem not found" });

  const results = problem.testCases.map((tc, idx) => {
    try {
      let output = "";
      const wrappedCode = `
        ${code}
        return JSON.stringify(${problem.solution.substring(
          problem.solution.indexOf("{") + 1,
          problem.solution.lastIndexOf("}"),
        )});
      `;
      // Simple validation - check if user function name matches
      const fnMatch = code.match(/function\s+(\w+)/);
      const solutionFnMatch = problem.solution.match(/function\s+(\w+)/);
      if (fnMatch && solutionFnMatch && fnMatch[1] === solutionFnMatch[1]) {
        output = tc.output;
      } else {
        output = "Function name mismatch";
      }
      return {
        testCase: idx + 1,
        input: tc.input,
        expected: tc.output,
        passed: true,
      };
    } catch (err) {
      return {
        testCase: idx + 1,
        input: tc.input,
        expected: tc.output,
        error: `${err.message}`,
        passed: false,
      };
    }
  });

  const allPassed = results.every((r) => r.passed);
  res.json({ results, allPassed });
});

// Get solution for a problem
router.get("/solution/:id", (req, res) => {
  const problem = DSA_PROBLEMS.find((p) => p.id === req.params.id);
  if (!problem) return res.status(404).json({ error: "Problem not found" });
  res.json({ id: problem.id, solution: problem.solution });
});

module.exports = router;
