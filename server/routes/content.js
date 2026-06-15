const express = require("express");
const router = express.Router();

const contentData = {
  react: {
    title: "React.js",
    topics: [
      {
        name: "JSX & Rendering",
        theory:
          "JSX is a syntax extension for JavaScript that looks like HTML. It is transpiled to React.createElement calls. React uses a Virtual DOM to efficiently update the actual DOM by comparing changes (diffing) and applying minimal updates (reconciliation).",
        example: `function Welcome({ name }) {\n  return <h1>Hello, {name}!</h1>;\n}\n\n// JSX compiles to:\n// React.createElement('h1', null, 'Hello, ', name, '!')`,
        practice:
          "Create a component that renders a list of items using map().",
      },
      {
        name: "Components & Props",
        theory:
          "Components are reusable UI pieces. Props (properties) are read-only data passed from parent to child. Props enable component composition and reusability.",
        example: `function Card({ title, description, image }) {\n  return (\n    <div className="card">\n      <img src={image} alt={title} />\n      <h2>{title}</h2>\n      <p>{description}</p>\n    </div>\n  );\n}\n\n// Usage: <Card title="Hello" description="World" image="img.jpg" />`,
        practice:
          "Build a ProductCard component that receives name, price, and image props.",
      },
      {
        name: "State & Lifecycle",
        theory:
          "State is mutable data managed within a component. useState hook returns [value, setter]. State changes trigger re-renders. useEffect handles side effects like API calls, subscriptions, or DOM manipulation.",
        example: `function Counter() {\n  const [count, setCount] = useState(0);\n  \n  useEffect(() => {\n    document.title = \`Count: \${count}\`;\n  }, [count]);\n  \n  return (\n    <div>\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+</button>\n    </div>\n  );\n}`,
        practice:
          "Create a timer that counts up with start/stop/reset controls.",
      },
      {
        name: "useEffect Deep Dive",
        theory:
          "useEffect runs after render. Dependencies array controls when it re-runs: [] runs once (mount), [dep] runs when dep changes, omitted runs after every render. Cleanup function runs on unmount or before re-run.",
        example: `useEffect(() => {\n  const subscription = api.subscribe(id);\n  return () => {\n    subscription.unsubscribe(); // cleanup\n  };\n}, [id]);`,
        practice:
          "Fetch data from an API when a component mounts and show a loading spinner.",
      },
      {
        name: "Custom Hooks",
        theory:
          'Custom hooks extract reusable stateful logic. They must start with "use". They can call other hooks internally. They let you share logic between components without changing component hierarchy.',
        example: `function useLocalStorage(key, initialValue) {\n  const [value, setValue] = useState(() => {\n    const stored = localStorage.getItem(key);\n    return stored ? JSON.parse(stored) : initialValue;\n  });\n  \n  useEffect(() => {\n    localStorage.setItem(key, JSON.stringify(value));\n  }, [key, value]);\n  \n  return [value, setValue];\n}`,
        practice:
          "Write a custom hook useFetch(url) that returns { data, loading, error }.",
      },
      {
        name: "Context API & useReducer",
        theory:
          "Context avoids prop drilling by making values available to the entire subtree. useReducer is like useState but with a reducer function for complex state logic. Often used together for global state management.",
        example: `const AuthContext = createContext();\n\nfunction authReducer(state, action) {\n  switch (action.type) {\n    case 'LOGIN':\n      return { ...state, user: action.payload, isAuthenticated: true };\n    case 'LOGOUT':\n      return { ...state, user: null, isAuthenticated: false };\n    default:\n      return state;\n  }\n}\n\nfunction AuthProvider({ children }) {\n  const [state, dispatch] = useReducer(authReducer, {\n    user: null,\n    isAuthenticated: false\n  });\n  return (\n    <AuthContext.Provider value={{ state, dispatch }}>\n      {children}\n    </AuthContext.Provider>\n  );\n}`,
        practice:
          "Build a theme toggler (light/dark) using Context + useReducer.",
      },
      {
        name: "React Router",
        theory:
          "React Router enables client-side routing. BrowserRouter wraps the app, Route maps paths to components, Link navigates without page reload. Nested routes, URL params, and lazy loading are core features.",
        example: `<BrowserRouter>\n  <Routes>\n    <Route path="/" element={<Home />} />\n    <Route path="/products/:id" element={<ProductDetail />} />\n    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />\n  </Routes>\n</BrowserRouter>`,
        practice:
          "Create a multi-page app with navigation, a 404 page, and route guards.",
      },
      {
        name: "Performance Optimization",
        theory:
          "React.memo prevents re-renders when props haven't changed. useMemo caches computed values. useCallback caches function references. Code splitting with React.lazy and Suspense reduces bundle size.",
        example: `const ExpensiveList = React.memo(({ items }) => {\n  return items.map(item => <div key={item.id}>{item.name}</div>);\n});\n\nfunction SearchResults({ query, data }) {\n  const filtered = useMemo(\n    () => data.filter(item => item.includes(query)),\n    [query, data]\n  );\n  return <ExpensiveList items={filtered} />;\n}`,
        practice:
          "Profile a slow component with React DevTools and apply memo/useMemo/useCallback fixes.",
      },
    ],
  },
  javascript: {
    title: "JavaScript",
    topics: [
      {
        name: "Closures & Scope",
        theory:
          "A closure is a function that retains access to its lexical scope even when executed outside that scope. Every function in JavaScript forms a closure. They enable data privacy and function factories.",
        example: `function createCounter() {\n  let count = 0;\n  return function() {\n    count++;\n    return count;\n  };\n}\n\nconst counter = createCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2`,
        practice:
          "Write a function that creates private variables using closures.",
      },
      {
        name: "Promises & Async/Await",
        theory:
          "Promises represent eventual completion (or failure) of an async operation. async/await is syntactic sugar over Promises. Error handling uses .catch() or try/catch. Promise.all runs in parallel.",
        example: `async function fetchUserData(userId) {\n  try {\n    const response = await fetch(\`/api/users/\${userId}\`);\n    if (!response.ok) throw new Error('Network error');\n    const data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Failed to fetch:', error);\n    throw error;\n  }\n}\n\n// Promise.all for parallel requests\nconst [user, posts] = await Promise.all([\n  fetchUserData(1),\n  fetchUserPosts(1)\n]);`,
        practice:
          "Write a function that retries an async operation N times with exponential backoff.",
      },
      {
        name: "Prototypes & Classes",
        theory:
          "JavaScript uses prototypal inheritance. Every object has a [[Prototype]] (accessed via __proto__ or Object.getPrototypeOf). ES6 classes are syntactic sugar over prototypes. The prototype chain ends at Object.prototype.",
        example: `class Animal {\n  constructor(name) {\n    this.name = name;\n  }\n  speak() {\n    console.log(\`\${this.name} makes a sound.\`);\n  }\n}\n\nclass Dog extends Animal {\n  speak() {\n    console.log(\`\${this.name} barks.\`);\n  }\n}\n\n// Equivalent using prototypes:\nfunction AnimalProto(name) {\n  this.name = name;\n}\nAnimalProto.prototype.speak = function() {\n  console.log(this.name + ' makes a sound.');\n};`,
        practice:
          "Implement inheritance using both classes and pure prototypes.",
      },
      {
        name: "Event Loop & Microtasks",
        theory:
          "JavaScript is single-threaded with a concurrency model based on an event loop. Call stack executes synchronously. Web APIs (setTimeout, fetch) push callbacks to task/microtask queues. Microtasks (Promises) run before macrotasks (setTimeout).",
        example: `console.log('1');\nsetTimeout(() => console.log('2'), 0);\nPromise.resolve().then(() => console.log('3'));\nconsole.log('4');\n// Output: 1, 4, 3, 2`,
        practice:
          "Predict the output of complex async code with nested Promises and timeouts.",
      },
      {
        name: "Array Methods & Functional Programming",
        theory:
          "Modern JS encourages immutable transformations: map, filter, reduce, find, some, every. These methods chain together for readable data pipelines. Avoid mutating original arrays.",
        example: `const orders = [\n  { id: 1, items: 3, total: 45 },\n  { id: 2, items: 1, total: 20 },\n  { id: 3, items: 5, total: 100 }\n];\n\nconst result = orders\n  .filter(o => o.total > 30)\n  .map(o => ({ ...o, discount: o.total * 0.1 }))\n  .reduce((sum, o) => sum + o.total - o.discount, 0);\n\nconsole.log(result); // 130.5`,
        practice:
          "Write a pipeline that reads an array of objects, filters, transforms, and aggregates data.",
      },
    ],
  },
  node: {
    title: "Node.js",
    topics: [
      {
        name: "Modules & require vs import",
        theory:
          "Node.js uses CommonJS (require/module.exports) and ESM (import/export). CommonJS is synchronous and loads modules at runtime. ESM is asynchronous, supports static analysis, and is the modern standard.",
        example: `// CommonJS\nconst fs = require('fs');\nmodule.exports = { myFunction };\n\n// ESM (add "type": "module" to package.json)\nimport fs from 'fs';\nexport function myFunction() {};\n\nexport default class MyClass {};`,
        practice:
          "Convert a CommonJS module to ESM and note the differences in import resolution.",
      },
      {
        name: "File System & Streams",
        theory:
          "fs module provides file I/O. Streams process data chunk-by-chunk, critical for large files. Readable, Writable, Transform, and Duplex stream types. Piping connects streams. Backpressure handling prevents memory overflow.",
        example: `const { createReadStream, createWriteStream } = require('fs');\nconst { Transform } = require('stream');\nconst zlib = require('zlib');\n\nconst readStream = createReadStream('input.txt');\nconst writeStream = createWriteStream('output.gz');\nconst gzip = zlib.createGzip();\n\nreadStream\n  .pipe(gzip)\n  .pipe(writeStream)\n  .on('finish', () => console.log('Done compressing'));`,
        practice:
          "Write a script that reads a large CSV file line-by-line using streams, processes each row, and writes results.",
      },
      {
        name: "Event Emitter",
        theory:
          "Many Node.js objects (HTTP server, streams) extend EventEmitter. It implements the observer pattern: emit events, listen with .on(). Custom EventEmitters enable decoupled architectures.",
        example: `const EventEmitter = require('events');\n\nclass OrderSystem extends EventEmitter {\n  placeOrder(order) {\n    console.log('Order placed:', order.id);\n    this.emit('order:placed', order);\n    setTimeout(() => {\n      this.emit('order:processed', order);\n    }, 2000);\n  }\n}\n\nconst orders = new OrderSystem();\norders.on('order:placed', (o) => console.log('Notification sent'));\norders.on('order:processed', (o) => console.log('Inventory updated'));`,
        practice:
          "Build a simple task queue using EventEmitter that processes jobs with status updates.",
      },
      {
        name: "Error Handling & Process Management",
        theory:
          "Uncaught exceptions crash the process. Use try/catch, .catch() on Promises, and process.on('uncaughtException') as last resort. process.on('unhandledRejection') catches unhandled Promise rejections. Graceful shutdown handles cleanup.",
        example: `process.on('unhandledRejection', (reason, promise) => {\n  console.error('Unhandled Rejection at:', promise, 'reason:', reason);\n});\n\nasync function safeHandler(req, res) {\n  try {\n    const data = await riskyOperation();\n    res.json(data);\n  } catch (err) {\n    console.error('Handler error:', err);\n    res.status(500).json({ error: 'Internal server error' });\n  }\n}`,
        practice:
          "Set up graceful shutdown for an Express server that closes DB connections and finishes pending requests.",
      },
    ],
  },
  express: {
    title: "Express.js",
    topics: [
      {
        name: "Middleware",
        theory:
          "Middleware functions have access to req, res, and next. They can modify req/res, end the request, or call next(). Application-level, router-level, error-handling, and third-party middleware.",
        example: `// Logger middleware\napp.use((req, res, next) => {\n  console.log(\`\${req.method} \${req.url} - \${new Date().toISOString()}\`);\n  next();\n});\n\n// Error handling middleware (4 params)\napp.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(500).json({ error: 'Something went wrong!' });\n});`,
        practice:
          "Create middleware that validates request body fields and returns 400 with field-specific errors.",
      },
      {
        name: "Routing & Controllers",
        theory:
          "Express.Router() creates modular route handlers. Route parameters (:id), query strings (?key=val), and body parsing. Controllers separate route definitions from business logic.",
        example: `const router = express.Router();\n\n// Controller\nconst userController = {\n  getAll: async (req, res) => {\n    const users = await User.find();\n    res.json(users);\n  },\n  getById: async (req, res) => {\n    const user = await User.findById(req.params.id);\n    if (!user) return res.status(404).json({ error: 'Not found' });\n    res.json(user);\n  }\n};\n\n// Routes\nrouter.get('/users', userController.getAll);\nrouter.get('/users/:id', userController.getById);`,
        practice:
          'Build a CRUD router for a "books" resource with validation and proper HTTP status codes.',
      },
    ],
  },
  database: {
    title: "Database Concepts",
    topics: [
      {
        name: "ACID Properties",
        theory:
          "Atomicity (all-or-nothing), Consistency (valid state transitions), Isolation (concurrent transactions don't interfere), Durability (committed data survives failures). Essential for relational databases.",
        example: `-- Transaction example\nBEGIN TRANSACTION;\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\nCOMMIT;\n-- If any step fails, ROLLBACK restores previous state`,
        practice:
          "Write a transaction that transfers money between two accounts with error handling.",
      },
      {
        name: "Indexing & Query Optimization",
        theory:
          "Indexes speed up read queries at the cost of write performance. B-tree indexes for equality/range queries, Hash indexes for equality only, Composite indexes for multi-column queries. EXPLAIN shows query plans.",
        example: `-- Create index\nCREATE INDEX idx_users_email ON users(email);\n\n-- Composite index for queries filtering by status AND date\nCREATE INDEX idx_orders_status_date ON orders(status, created_at);\n\n-- Analyze query\nEXPLAIN ANALYZE SELECT * FROM orders WHERE status = 'pending';`,
        practice:
          "Given a slow query, analyze its EXPLAIN output and create appropriate indexes to fix it.",
      },
      {
        name: "Normalization & Denormalization",
        theory:
          "1NF: atomic columns. 2NF: remove partial dependencies. 3NF: remove transitive dependencies. BCNF: every determinant is a candidate key. Denormalization adds redundancy for read performance in read-heavy systems.",
        example: `-- Before normalization (redundant data)\nOrders: id | customer_name | customer_email | product_name | product_price\n\n-- After 3NF\nCustomers: id | name | email\nProducts: id | name | price\nOrders: id | customer_id | product_id | quantity | order_date`,
        practice:
          "Take a flat table and normalize it to 3NF, then write queries to rejoin the data.",
      },
    ],
  },
  sql: {
    title: "SQL",
    topics: [
      {
        name: "Joins",
        theory:
          "INNER JOIN returns matching rows from both tables. LEFT/RIGHT JOIN returns all rows from one side. FULL OUTER JOIN returns all rows. CROSS JOIN produces cartesian product. SELF JOIN joins a table to itself.",
        example: `SELECT o.id, c.name, p.title\nFROM orders o\nJOIN customers c ON o.customer_id = c.id\nLEFT JOIN products p ON o.product_id = p.id\nWHERE o.status = 'shipped'\nORDER BY o.created_at DESC;`,
        practice:
          "Write queries with 3+ joins and aggregate functions (SUM, COUNT, AVG).",
      },
      {
        name: "Aggregations & GROUP BY",
        theory:
          "GROUP BY groups rows with same values. HAVING filters groups (WHERE filters rows). Common aggregate functions: COUNT, SUM, AVG, MIN, MAX, STRING_AGG, ARRAY_AGG.",
        example: `SELECT \n  c.id,\n  c.name,\n  COUNT(o.id) as order_count,\n  SUM(o.total) as total_spent,\n  AVG(o.total) as avg_order_value\nFROM customers c\nLEFT JOIN orders o ON c.id = o.customer_id\nGROUP BY c.id, c.name\nHAVING COUNT(o.id) > 5\nORDER BY total_spent DESC;`,
        practice:
          "Write a query that finds the top 10 customers by total spend with their order count and last order date.",
      },
      {
        name: "Subqueries & CTEs",
        theory:
          "Subqueries can be in SELECT, FROM, or WHERE clauses. CTEs (WITH clause) make complex queries readable and allow recursion. Correlated subqueries reference outer query columns.",
        example: `-- CTE for readability\nWITH high_value_customers AS (\n  SELECT customer_id, SUM(total) as total_spent\n  FROM orders\n  GROUP BY customer_id\n  HAVING SUM(total) > 10000\n),\nrecent_orders AS (\n  SELECT * FROM orders WHERE created_at > '2024-01-01'\n)\nSELECT c.name, hvc.total_spent, COUNT(ro.id) as recent_orders\nFROM customers c\nJOIN high_value_customers hvc ON c.id = hvc.customer_id\nLEFT JOIN recent_orders ro ON c.id = ro.customer_id\nGROUP BY c.id, c.name, hvc.total_spent;`,
        practice:
          "Use a recursive CTE to query an employee hierarchy (manager_id references).",
      },
    ],
  },
  dsa: {
    title: "Data Structures & Algorithms",
    topics: [
      {
        name: "Arrays & Two Pointers",
        theory:
          "Two pointers technique uses left/right indices to traverse from both ends (or one at different speeds). O(n) time, O(1) space. Used for sorted array problems, palindrome checking, sliding window.",
        example: `function twoSumSorted(arr, target) {\n  let left = 0, right = arr.length - 1;\n  while (left < right) {\n    const sum = arr[left] + arr[right];\n    if (sum === target) return [left, right];\n    if (sum < target) left++;\n    else right--;\n  }\n  return [-1, -1];\n}`,
        practice:
          'Implement the "container with most water" problem using two pointers.',
      },
      {
        name: "Linked Lists",
        theory:
          "Each node stores data and a pointer to the next node. Singly vs doubly linked. Reversal, cycle detection (Floyd's algorithm: slow/fast pointers), merging sorted lists. O(1) insert/delete at head.",
        example: `// Floyd's cycle detection\nfunction hasCycle(head) {\n  if (!head) return false;\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}\n\n// Reverse linked list\nfunction reverseList(head) {\n  let prev = null, curr = head;\n  while (curr) {\n    const next = curr.next;\n    curr.next = prev;\n    prev = curr;\n    curr = next;\n  }\n  return prev;\n}`,
        practice:
          "Merge two sorted linked lists in O(n) time and O(1) extra space.",
      },
      {
        name: "Trees (BST & Tries)",
        theory:
          "Binary Search Tree: left <= root < right. O(log n) search/insert in balanced trees. Trie (prefix tree): node per character, shared prefixes. Used for autocomplete, spell check, IP routing.",
        example: `class TrieNode {\n  constructor() {\n    this.children = new Map();\n    this.isEnd = false;\n  }\n}\n\nclass Trie {\n  constructor() {\n    this.root = new TrieNode();\n  }\n\n  insert(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children.has(char)) {\n        node.children.set(char, new TrieNode());\n      }\n      node = node.children.get(char);\n    }\n    node.isEnd = true;\n  }\n\n  search(word) {\n    let node = this.root;\n    for (const char of word) {\n      if (!node.children.has(char)) return false;\n      node = node.children.get(char);\n    }\n    return node.isEnd;\n  }\n}`,
        practice:
          "Implement autocomplete: given a prefix, return all words with that prefix from a Trie.",
      },
      {
        name: "Dynamic Programming",
        theory:
          "DP solves problems by breaking into overlapping subproblems. Top-down (memoization) vs bottom-up (tabulation). Classic patterns: 0/1 Knapsack, Longest Common Subsequence, Coin Change, Fibonacci with memo.",
        example: `// Longest Common Subsequence - bottom-up\nfunction longestCommonSubsequence(text1, text2) {\n  const m = text1.length, n = text2.length;\n  const dp = Array(m + 1).fill(null).map(() => Array(n + 1).fill(0));\n  \n  for (let i = 1; i <= m; i++) {\n    for (let j = 1; j <= n; j++) {\n      if (text1[i - 1] === text2[j - 1]) {\n        dp[i][j] = 1 + dp[i - 1][j - 1];\n      } else {\n        dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);\n      }\n    }\n  }\n  return dp[m][n];\n}`,
        practice:
          'Solve "Coin Change" (minimum coins to make amount) with both memoization and tabulation.',
      },
      {
        name: "Graphs (BFS & DFS)",
        theory:
          "Graph representation: adjacency list (most common), adjacency matrix, edge list. BFS uses queue, finds shortest path in unweighted graph. DFS uses stack/recursion, used for topological sort, connected components.",
        example: `function bfs(graph, start) {\n  const visited = new Set();\n  const queue = [start];\n  visited.add(start);\n  \n  while (queue.length > 0) {\n    const node = queue.shift();\n    console.log(node);\n    \n    for (const neighbor of graph[node]) {\n      if (!visited.has(neighbor)) {\n        visited.add(neighbor);\n        queue.push(neighbor);\n      }\n    }\n  }\n}\n\nfunction dfs(graph, node, visited = new Set()) {\n  if (visited.has(node)) return;\n  visited.add(node);\n  console.log(node);\n  for (const neighbor of graph[node]) {\n    dfs(graph, neighbor, visited);\n  }\n}`,
        practice:
          "Detect if a graph has a cycle using both DFS (back edge detection) and topological sort (Kahn's algorithm).",
      },
      {
        name: "Sorting Algorithms",
        theory:
          "QuickSort: O(n log n) average, O(n²) worst, in-place. MergeSort: O(n log n) guaranteed, O(n) space. HeapSort: O(n log n), in-place. Counting Sort: O(n + k) for integers. Stability matters for sorting by multiple keys.",
        example: `function quickSort(arr, low = 0, high = arr.length - 1) {\n  if (low < high) {\n    const pivot = partition(arr, low, high);\n    quickSort(arr, low, pivot - 1);\n    quickSort(arr, pivot + 1, high);\n  }\n  return arr;\n}\n\nfunction partition(arr, low, high) {\n  const pivot = arr[high];\n  let i = low - 1;\n  for (let j = low; j < high; j++) {\n    if (arr[j] <= pivot) {\n      i++;\n      [arr[i], arr[j]] = [arr[j], arr[i]];\n    }\n  }\n  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];\n  return i + 1;\n}`,
        practice:
          "Implement MergeSort and compare its performance with QuickSort on random, sorted, and reversed arrays.",
      },
    ],
  },
  "system-design": {
    title: "System Design & Architecture",
    topics: [
      {
        name: "Load Balancers & Scaling",
        theory:
          "Horizontal (add more machines) vs vertical (bigger machine) scaling. Load balancers distribute traffic using round-robin, least connections, or consistent hashing. Stateless vs stateful services. Auto-scaling groups.",
        example: `// Load balancer strategies:\n// Round Robin: request -> server1, server2, server3, repeat\n// Least Connections: request -> server with fewest active connections\n// IP Hash: hash(client_ip) % N -> sticky sessions\n// Consistent Hashing: minimizes re-mapping when servers change`,
        practice:
          "Design a load-balanced architecture for a read-heavy social media feed that serves 10M DAU.",
      },
      {
        name: "Caching (Redis, CDN)",
        theory:
          "Cache strategies: Cache Aside (read: miss -> DB -> cache, write: write DB then invalidate cache), Write Through (write DB + cache simultaneously), Write Behind (write to cache, async flush to DB). TTL, eviction policies (LRU, LFU, FIFO). CDN caches static assets at edge locations.",
        example: `// Cache Aside pattern\nasync function getUser(id) {\n  let user = await redis.get(\`user:\${id}\`);\n  if (user) return JSON.parse(user);\n  \n  user = await db.findUser(id);\n  await redis.set(\`user:\${id}\`, JSON.stringify(user), 'EX', 3600);\n  return user;\n}\n\n// Invalidate on write\nasync function updateUser(id, data) {\n  await db.updateUser(id, data);\n  await redis.del(\`user:\${id}\`);\n}`,
        practice:
          "Design a caching layer for a product catalog API that handles hot keys and cache stampede.",
      },
      {
        name: "Database Sharding & Replication",
        theory:
          "Sharding splits data across databases by a shard key. Replication: primary-replica (leader-follower) for read scalability and failover. CAP theorem: Consistency, Availability, Partition tolerance — pick 2. Eventual consistency vs strong consistency.",
        example: `// Sharding strategies:\n// Range-based: shard = user_id / 1000\n// Hash-based: shard = hash(user_id) % N\n// Directory-based: lookup table for shard location\n\n// Leader-follower replication pattern:\n// Writes go to primary, reads can go to replicas\n// Replicas async copy from primary`,
        practice:
          "Design a sharding strategy for a messaging app (WhatsApp scale) considering chat rooms and user data.",
      },
      {
        name: "Message Queues & Event-Driven Architecture",
        theory:
          "Message queues (SQS, RabbitMQ, Kafka) decouple producers and consumers. Pub/Sub pattern. Kafka: topics, partitions, consumer groups. Idempotent consumers handle duplicate messages. Dead letter queues for failed messages.",
        example: `// Event-driven architecture example:\n// Order Service emits "order.created"\n// Email Service subscribes -> sends confirmation\n// Inventory Service subscribes -> reserves items\n// Analytics Service subscribes -> logs event\n// Shipping Service subscribes -> schedules delivery`,
        practice:
          "Design an event-driven order processing system that handles payment, inventory, shipping, and notifications.",
      },
      {
        name: "Microservices & API Gateway",
        theory:
          "Microservices decompose a monolith into independently deployable services. API Gateway (single entry point) handles routing, auth, rate limiting, aggregation. Service discovery (Consul, Eureka). Circuit breakers prevent cascading failures.",
        example: `// API Gateway responsibilities:\n// - Route /users/* to User Service\n// - Route /orders/* to Order Service\n// - Authentication (validate JWT once)\n// - Rate limiting (100 req/min per user)\n// - Request/response transformation\n// - Aggregation (e.g., /user-dashboard calls 3 services)`,
        practice:
          "Design an API gateway for an e-commerce platform with services: User, Product, Cart, Order, Payment.",
      },
    ],
  },
  hld: {
    title: "High-Level Design",
    topics: [
      {
        name: "URL Shortener (TinyURL)",
        theory:
          "Requirements: create short URLs, redirect, analytics. Key design decisions: hash function (Base62 encoding of DB auto-increment ID, or use MD5/SHA256 truncated). Redirect: 301 (permanent, cached) vs 302 (temporary).",
        example: `// URL Shortener Design:\n// Write path: POST /shorten -> generate key -> store in DB -> return short URL\n// Read path: GET /{key} -> look up in cache/DB -> 301 redirect to long URL\n// \n// Key generation: base62_encode(counter++) -> 7 chars = 62^7 ≈ 3.5T URLs\n// Cache: Redis LRU for hot URLs\n// DB: Cassandra for write scalability\n// Analytics: Kafka -> Spark -> real-time dashboard`,
        practice:
          "Design a URL shortener for 100M URLs/month. Include key generation, caching, and analytics.",
      },
      {
        name: "WhatsApp/Chat System",
        theory:
          "Two main flows: real-time messaging (WebSocket persistent connection) and offline message storage. Per-user message ordering via sequence numbers or timestamps. End-to-end encryption. Last-seen and typing indicators.",
        example: `// Chat System Design:\n// WebSocket server handles real-time\n// Each user connects to one WS server\n// Messages stored in Cassandra (partitioned by chat_id, ordered by timestamp)\n// Read-receipts: client sends ack on message read\n// Offline: push notification + inbox on reconnection\n// Group chat: fan-out on write for small groups, fan-out on read for large`,
        practice:
          "Design a chat system supporting 1-on-1 and group chats, offline messages, and message sync across devices.",
      },
      {
        name: "Netflix/Video Streaming",
        theory:
          "Video upload: transcode to multiple bitrates (HLS/DASH adaptive streaming). CDN stores chunks at edge. Recommendation system: collaborative + content-based filtering. Watch history stored in Cassandra.",
        example: `// Streaming Pipeline:\n// Upload -> Transcode (FFmpeg, multiple resolutions 360p-4K) -> Segment into 10s chunks\n// -> Store in S3 -> CDN edge servers cache hot content\n// \n// Playback: client requests manifest (.m3u8) -> selects bitrate based on bandwidth\n// -> downloads segments sequentially -> adaptive bitrate switching\n// \n// Recommendation: User-item matrix -> ALS (Alternating Least Squares) for collaborative filtering`,
        practice:
          "Design a video streaming platform. Cover: upload pipeline, adaptive bitrate streaming, CDN caching, recommendations.",
      },
      {
        name: "Design Uber/Ride-Sharing",
        theory:
          'Core: real-time driver location updates (WebSocket/HTTP long polling), geospatial indexing (QuadTree or GeoHash for "find nearby drivers"), ride matching, surge pricing, ETA calculations.',
        example: `// Ride-sharing Design:\n// Driver App: sends GPS every 3 seconds via WebSocket\n// GeoService: Redis GeoSpatial or QuadTree indexing for "drivers within 2km"\n// Matching: push ride request to nearest available driver(s), first to accept wins\n// \n// Surge Pricing: high demand area -> multiply base fare\n// ETA: Google Maps API + historical data + Haversine distance\n// Payment: third-party gateway (Stripe) for processing`,
        practice:
          "Design Uber's ride-matching system. Cover: real-time location, driver discovery, fare calculation, surge pricing.",
      },
      {
        name: "Design YouTube",
        theory:
          "Upload pipeline with transcoding. CDN distribution. Feed generation via fan-out. View count consistency (eventual). Search via Elasticsearch. Comment threading with materialized paths.",
        example: `// YouTube Design:\n// Upload: API receives video -> stored in blob storage -> add to transcoding queue\n// Transcoding: FFmpeg workers produce multiple resolutions (144p-4K)\n// -> segmented into 10s chunks -> uploaded to CDN\n// \n// Feed: pre-computed for users with many subscriptions (fan-out on write)\n//       or computed on-read for celebrities\n// \n// Search: Elasticsearch indexes title, description, tags\n// Comments: stored in MySQL/Cassandra, threaded via materialized path (0.1.3.5)\n// View count: buffered in Redis, batch write to DB every 60s`,
        practice:
          "Design YouTube's video upload, transcoding, and feed generation system for 500 hours of uploads per minute.",
      },
    ],
  },
  lld: {
    title: "Low-Level Design & OOP",
    topics: [
      {
        name: "SOLID Principles",
        theory:
          "S: Single Responsibility (one reason to change). O: Open/Closed (open for extension, closed for modification). L: Liskov Substitution (subtypes replace base types). I: Interface Segregation (small, focused interfaces). D: Dependency Inversion (depend on abstractions, not concretions).",
        example: `// SRP violation: Report class does printing too\nclass Report {\n  generate() { /* ... */ }\n  printToPDF() { /* ... */ }  // WRONG\n}\n\n// Fixed: separate concerns\nclass Report {\n  generate() { /* ... */ }\n}\n\nclass ReportPrinter {\n  printPDF(report) { /* ... */ }\n}`,
        practice:
          'Take a monolithic "OrderProcessor" class and refactor it to follow SRP and DIP.',
      },
      {
        name: "Design Patterns: Creational",
        theory:
          "Singleton: one instance globally. Factory Method: interface for creating objects. Abstract Factory: families of related objects. Builder: step-by-step construction of complex objects. Prototype: clone existing objects.",
        example: `// Factory Method\ninterface PaymentGateway {\n  processPayment(amount: number): boolean;\n}\n\nclass StripeGateway implements PaymentGateway {\n  processPayment(amount) { /* Stripe API */ return true; }\n}\n\nclass PayPalGateway implements PaymentGateway {\n  processPayment(amount) { /* PayPal API */ return true; }\n}\n\nclass PaymentFactory {\n  static createGateway(type: string): PaymentGateway {\n    switch (type) {\n      case 'stripe': return new StripeGateway();\n      case 'paypal': return new PayPalGateway();\n      default: throw new Error('Unknown gateway');\n    }\n  }\n}`,
        practice:
          'Implement the Builder pattern to construct a complex "House" object with optional features (pool, garage, garden).',
      },
      {
        name: "Design Patterns: Structural",
        theory:
          "Adapter: makes incompatible interfaces work together. Decorator: adds behavior without modifying the class. Facade: simplified interface to a complex subsystem. Proxy: controls access to the object. Composite: tree structures of objects.",
        example: `// Decorator Pattern\ninterface Coffee {\n  cost(): number;\n  description(): string;\n}\n\nclass SimpleCoffee implements Coffee {\n  cost() { return 5; }\n  description() { return 'Simple coffee'; }\n}\n\nclass MilkDecorator implements Coffee {\n  constructor(private coffee: Coffee) {}\n  cost() { return this.coffee.cost() + 2; }\n  description() { return this.coffee.description() + ', milk'; }\n}\n\nclass SugarDecorator implements Coffee {\n  constructor(private coffee: Coffee) {}\n  cost() { return this.coffee.cost() + 0.5; }\n  description() { return this.coffee.description() + ', sugar'; }\n}`,
        practice:
          "Use the Adapter pattern to integrate a third-party analytics SDK that has a different interface than your app expects.",
      },
      {
        name: "Design Patterns: Behavioral",
        theory:
          "Observer: one-to-many dependency, notify on state change. Strategy: interchangeable algorithms. Command: encapsulate a request as an object. State: object behaves differently based on internal state. Chain of Responsibility: pass request along a chain.",
        example: `// Observer Pattern\ninterface Observer {\n  update(event: string, data: any): void;\n}\n\nclass EventBus {\n  private observers: Map<string, Observer[]> = new Map();\n  \n  subscribe(event: string, observer: Observer) {\n    if (!this.observers.has(event)) {\n      this.observers.set(event, []);\n    }\n    this.observers.get(event)!.push(observer);\n  }\n  \n  publish(event: string, data: any) {\n    this.observers.get(event)?.forEach(o => o.update(event, data));\n  }\n}`,
        practice:
          "Implement a vending machine using the State pattern (states: idle, selecting, dispensing, out-of-stock).",
      },
      {
        name: "Parking Lot Design",
        theory:
          "Classic OOD problem. Entities: ParkingLot, Levels, Spots (compact/large/motorcycle), Vehicles, Tickets. Spot assignment: nearest to entrance. Payment: hourly rate. Multi-level with different capacities.",
        example: `// Key classes\nclass ParkingSpot {\n  constructor(\n    public id: string,\n    public size: SpotSize,\n    public isAvailable: boolean = true,\n    public vehicle: Vehicle | null = null\n  ) {}\n  \n  park(vehicle: Vehicle): boolean {\n    if (!this.isAvailable || vehicle.size > this.size) return false;\n    this.vehicle = vehicle;\n    this.isAvailable = false;\n    return true;\n  }\n  \n  unpark(): Vehicle | null {\n    const v = this.vehicle;\n    this.vehicle = null;\n    this.isAvailable = true;\n    return v;\n  }\n}`,
        practice:
          "Design a parking lot with multiple levels, different spot sizes, ticket system, and hourly pricing.",
      },
    ],
  },
};

router.get("/topics", (req, res) => {
  const summary = {};
  for (const [key, value] of Object.entries(contentData)) {
    summary[key] = { title: value.title, topicCount: value.topics.length };
  }
  res.json(summary);
});

router.get("/:topic", (req, res) => {
  const { topic } = req.params;
  const data = contentData[topic];
  if (!data) return res.status(404).json({ error: "Topic not found" });
  res.json(data);
});

module.exports = router;
