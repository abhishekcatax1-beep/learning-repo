const express = require("express");
const router = express.Router();

const interviewData = {
  "company-wise": {
    title: "Company Wise Interview Questions",
    companies: [
      {
        name: "Google",
        questions: [
          {
            q: "Design a distributed key-value store that is consistent and available.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Find the median of two sorted arrays in O(log(min(n,m)))",
            difficulty: "Hard",
            topic: "DSA",
          },
          {
            q: "Implement a URL shortener with analytics.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Given a stream of integers, find the median at any point.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design Google Docs real-time collaboration.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Serialize and deserialize a binary tree.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Word break problem: can a string be segmented into dictionary words?",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a web crawler that crawls 1B pages.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Longest substring without repeating characters.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a search autocomplete system (like Google Suggest).",
            difficulty: "Hard",
            topic: "System Design",
          },
        ],
      },
      {
        name: "Amazon",
        questions: [
          {
            q: "Design Amazon's product recommendation system.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Two sum with a twist: find pairs that sum to target in a BST.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a shopping cart that handles stock validation.",
            difficulty: "Medium",
            topic: "LLD",
          },
          {
            q: "LRU Cache implementation from scratch.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a distributed counter for likes on a video.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Validate a binary search tree.",
            difficulty: "Easy",
            topic: "DSA",
          },
          {
            q: "Design a rate limiter (token bucket / sliding window).",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Group anagrams from a list of strings.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design an order processing system with event-driven architecture.",
            difficulty: "Hard",
            topic: "HLD",
          },
          {
            q: "Number of islands in a 2D binary matrix.",
            difficulty: "Medium",
            topic: "DSA",
          },
        ],
      },
      {
        name: "Microsoft",
        questions: [
          {
            q: "Design a distributed file system like OneDrive.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Merge k sorted lists efficiently.",
            difficulty: "Hard",
            topic: "DSA",
          },
          {
            q: "Design an authentication and authorization system.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Implement a text editor undo/redo functionality.",
            difficulty: "Medium",
            topic: "LLD",
          },
          {
            q: "Design a real-time notification system.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Reverse words in a string in-place.",
            difficulty: "Easy",
            topic: "DSA",
          },
          {
            q: "Design an API gateway with rate limiting and authentication.",
            difficulty: "Hard",
            topic: "HLD",
          },
          {
            q: "Clone a graph (with cycles).",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a meeting scheduler like Outlook Calendar.",
            difficulty: "Medium",
            topic: "LLD",
          },
          {
            q: "Spiral traversal of a matrix.",
            difficulty: "Medium",
            topic: "DSA",
          },
        ],
      },
      {
        name: "Meta (Facebook)",
        questions: [
          {
            q: "Design Facebook's news feed algorithm.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Clone a graph with random pointers.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a messaging system like Messenger.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Binary tree level order traversal.",
            difficulty: "Easy",
            topic: "DSA",
          },
          {
            q: "Design a real-time commenting system with threads.",
            difficulty: "Medium",
            topic: "System Design",
          },
          { q: "Subarray sum equals K.", difficulty: "Medium", topic: "DSA" },
          {
            q: "Design a friend recommendation system.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Word search in a 2D grid.",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design Facebook Live streaming infrastructure.",
            difficulty: "Hard",
            topic: "HLD",
          },
          {
            q: "K closest points to origin.",
            difficulty: "Easy",
            topic: "DSA",
          },
        ],
      },
      {
        name: "Uber",
        questions: [
          {
            q: "Design Uber's ride-matching and ETAs.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design a geospatial index for nearby drivers.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design UberEats ordering system.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Design a surge pricing algorithm.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Rate limiting for API endpoints.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Design a payment processing system.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Find the shortest path in a weighted graph (Dijkstra).",
            difficulty: "Medium",
            topic: "DSA",
          },
          {
            q: "Design a ride-sharing pooling system.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Trip history and analytics dashboard design.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Implement a real-time driver location tracking system.",
            difficulty: "Hard",
            topic: "System Design",
          },
        ],
      },
      {
        name: "Netflix",
        questions: [
          {
            q: "Design Netflix content recommendation engine.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design a video streaming pipeline (upload to playback).",
            difficulty: "Hard",
            topic: "HLD",
          },
          {
            q: "Design a fault-tolerant video transcoding system.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Adaptive bitrate streaming logic design.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Design a watch history and resume playback system.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Design a CDN caching strategy for video content.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Design Netflix homepage (personalized rows).",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Database sharding for user profiles and watch history.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Design an A/B testing framework.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Chaos engineering: design Netflix Chaos Monkey.",
            difficulty: "Hard",
            topic: "System Design",
          },
        ],
      },
      {
        name: "Stripe",
        questions: [
          {
            q: "Design a payment processing system that handles idempotency.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design a double-entry accounting ledger.",
            difficulty: "Hard",
            topic: "LLD",
          },
          {
            q: "Design a fraud detection system.",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design a billing and subscription management system.",
            difficulty: "Medium",
            topic: "HLD",
          },
          {
            q: "Idempotency key generation and validation.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Payment webhook delivery and retry mechanism.",
            difficulty: "Medium",
            topic: "System Design",
          },
          {
            q: "Design a reconciliation system for bank transactions.",
            difficulty: "Hard",
            topic: "HLD",
          },
          {
            q: "Distributed transaction management (Saga pattern).",
            difficulty: "Hard",
            topic: "System Design",
          },
          {
            q: "Design a multi-currency pricing system.",
            difficulty: "Medium",
            topic: "LLD",
          },
          {
            q: "Design a dispute resolution system.",
            difficulty: "Medium",
            topic: "HLD",
          },
        ],
      },
    ],
  },
  "topic-wise": {
    title: "Topic Wise Interview Questions",
    topics: [
      {
        name: "JavaScript",
        questions: [
          {
            q: "Explain closures with a practical example. Where do closures actually get used in React?",
            difficulty: "Easy",
          },
          {
            q: "What is the event loop? Explain microtasks vs macrotasks with output prediction.",
            difficulty: "Medium",
          },
          {
            q: "Implement debounce and throttle functions from scratch.",
            difficulty: "Medium",
          },
          {
            q: "Explain prototypal inheritance. How does it differ from class-based inheritance?",
            difficulty: "Medium",
          },
          {
            q: "Implement a deep clone function that handles circular references.",
            difficulty: "Hard",
          },
          {
            q: "What is the difference between == and === ? Explain type coercion.",
            difficulty: "Easy",
          },
          {
            q: "Explain Promise.all, Promise.race, Promise.allSettled, and Promise.any.",
            difficulty: "Medium",
          },
          { q: "Implement a custom Promise polyfill.", difficulty: "Hard" },
          {
            q: "What are generators and iterators? Give a practical use case.",
            difficulty: "Medium",
          },
          {
            q: 'Explain the "this" keyword. How does arrow function handle "this" differently?',
            difficulty: "Medium",
          },
        ],
      },
      {
        name: "React",
        questions: [
          {
            q: "Explain the Virtual DOM and how reconciliation works.",
            difficulty: "Medium",
          },
          {
            q: "What is the difference between controlled and uncontrolled components?",
            difficulty: "Easy",
          },
          {
            q: "Explain useEffect lifecycle: dependency array, cleanup, strict mode behavior.",
            difficulty: "Medium",
          },
          {
            q: "How do you optimize performance in a React app? List at least 5 techniques.",
            difficulty: "Medium",
          },
          {
            q: "Explain useMemo vs useCallback with real examples.",
            difficulty: "Medium",
          },
          {
            q: "What is the Context API and when would you use it vs Redux?",
            difficulty: "Medium",
          },
          {
            q: "Implement a custom hook that fetches data with loading/error states.",
            difficulty: "Medium",
          },
          {
            q: "Explain React.lazy and Suspense for code splitting.",
            difficulty: "Easy",
          },
          {
            q: "How does React handle events? What is synthetic events?",
            difficulty: "Medium",
          },
          {
            q: "Explain the render phase, commit phase, and fiber architecture at a high level.",
            difficulty: "Hard",
          },
        ],
      },
      {
        name: "System Design",
        questions: [
          { q: "Design a URL shortener (TinyURL).", difficulty: "Medium" },
          { q: "Design WhatsApp/Messenger for 1B users.", difficulty: "Hard" },
          {
            q: "Design a distributed key-value store (Dynamo-like).",
            difficulty: "Hard",
          },
          { q: "Design a rate limiter for an API.", difficulty: "Medium" },
          { q: "Design a CDN (Content Delivery Network).", difficulty: "Hard" },
          { q: "Design a parking lot system (LLD).", difficulty: "Easy" },
          {
            q: "Design a recommendation system (Netflix/YouTube).",
            difficulty: "Hard",
          },
          { q: "Design a web crawler for 1B pages.", difficulty: "Hard" },
          {
            q: "Design a logging and monitoring system (Splunk/Datadog).",
            difficulty: "Hard",
          },
          {
            q: "Design a real-time leaderboard for a game.",
            difficulty: "Medium",
          },
        ],
      },
      {
        name: "Data Structures & Algorithms",
        questions: [
          {
            q: "Find the longest palindromic substring in O(n²) and O(n).",
            difficulty: "Medium",
          },
          {
            q: "Implement LRU Cache (get and put in O(1)).",
            difficulty: "Medium",
          },
          {
            q: "Merge intervals: given overlapping intervals, merge them.",
            difficulty: "Easy",
          },
          {
            q: "Trapping rain water: calculate water trapped between bars.",
            difficulty: "Hard",
          },
          {
            q: "Find the shortest path in a binary matrix (BFS).",
            difficulty: "Medium",
          },
          {
            q: "Implement a Trie and use it for autocomplete.",
            difficulty: "Medium",
          },
          {
            q: "Topological sort of a DAG (Kahn's algorithm).",
            difficulty: "Medium",
          },
          {
            q: "Maximum subarray sum (Kadane's algorithm).",
            difficulty: "Easy",
          },
          {
            q: "Find the first missing positive integer in an unsorted array.",
            difficulty: "Medium",
          },
          {
            q: "Find all unique triplets that sum to zero (3Sum).",
            difficulty: "Hard",
          },
          {
            q: "Find the largest rectangle in a histogram.",
            difficulty: "Hard",
          },
          {
            q: "Implement union-find with path compression and union by rank.",
            difficulty: "Medium",
          },
          { q: "Design a consistent hash ring.", difficulty: "Medium" },
          { q: "Serialize and deserialize an N-ary tree.", difficulty: "Hard" },
        ],
      },
      {
        name: "SQL & Databases",
        questions: [
          {
            q: "Write a query to find the Nth highest salary in a table.",
            difficulty: "Easy",
          },
          {
            q: "Explain ACID properties with real-world examples.",
            difficulty: "Easy",
          },
          {
            q: "What is the difference between clustered and non-clustered index?",
            difficulty: "Medium",
          },
          {
            q: "Write a recursive CTE to query an employee hierarchy.",
            difficulty: "Medium",
          },
          {
            q: "Explain normalization vs denormalization (1NF, 2NF, 3NF, BCNF).",
            difficulty: "Medium",
          },
          {
            q: "How would you optimize a slow query? Explain EXPLAIN plan.",
            difficulty: "Medium",
          },
          {
            q: "Write a query with JOINs, GROUP BY, and HAVING for a sales report.",
            difficulty: "Medium",
          },
          {
            q: "Explain transaction isolation levels (Read Uncommitted to Serializable).",
            difficulty: "Hard",
          },
          {
            q: "What is a deadlock and how do you prevent it?",
            difficulty: "Medium",
          },
          {
            q: "Design a database schema for a Twitter-like application.",
            difficulty: "Medium",
          },
        ],
      },
      {
        name: "Node.js & Express",
        questions: [
          {
            q: "Explain the Node.js event loop phases in detail.",
            difficulty: "Medium",
          },
          {
            q: "What are streams? Explain readable, writable, duplex, and transform streams.",
            difficulty: "Medium",
          },
          {
            q: "How do you handle errors in Express middleware?",
            difficulty: "Easy",
          },
          {
            q: "Explain clustering in Node.js for multi-core utilization.",
            difficulty: "Medium",
          },
          {
            q: "What is the difference between process.nextTick, setTimeout, and setImmediate?",
            difficulty: "Medium",
          },
          {
            q: "How do you handle file uploads in Node.js?",
            difficulty: "Easy",
          },
          {
            q: "Explain JWT authentication flow with refresh tokens.",
            difficulty: "Medium",
          },
          {
            q: "Design a rate limiter as Express middleware.",
            difficulty: "Medium",
          },
          {
            q: "How does the module resolution algorithm work (require.resolve)?",
            difficulty: "Hard",
          },
          {
            q: "Explain worker threads vs child processes vs clustering.",
            difficulty: "Hard",
          },
        ],
      },
      {
        name: "Low-Level Design (OOP)",
        questions: [
          {
            q: "Design a parking lot system with multiple levels and vehicle types.",
            difficulty: "Medium",
          },
          {
            q: "Design a chess game with all pieces and movement rules.",
            difficulty: "Hard",
          },
          {
            q: "Design a vending machine with state transitions.",
            difficulty: "Medium",
          },
          {
            q: "Design a Tic-Tac-Toe game with win detection.",
            difficulty: "Easy",
          },
          {
            q: "Design a library management system with search and reservations.",
            difficulty: "Medium",
          },
          {
            q: "Design an ATM machine with cash dispensing and balance queries.",
            difficulty: "Medium",
          },
          {
            q: "Design a hotel booking system with room availability.",
            difficulty: "Medium",
          },
          { q: "Design an elevator control system.", difficulty: "Hard" },
          {
            q: "Explain the Strategy pattern with a payment gateway example.",
            difficulty: "Easy",
          },
          {
            q: "Design a logging framework with multiple output destinations (file, DB, console).",
            difficulty: "Medium",
          },
        ],
      },
    ],
  },
};

router.get("/:category", (req, res) => {
  const { category } = req.params;
  const data = interviewData[category];
  if (!data) return res.status(404).json({ error: "Category not found" });
  res.json(data);
});

module.exports = router;
