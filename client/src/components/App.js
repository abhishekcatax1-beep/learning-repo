import React, { useState, useEffect } from "react";
import "./../styles/App.css";

const API = process.env.REACT_APP_API || "";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "react", label: "React.js" },
  { id: "javascript", label: "JavaScript" },
  { id: "node", label: "Node.js" },
  { id: "express", label: "Express" },
  { id: "database", label: "Database" },
  { id: "sql", label: "SQL" },
  { id: "dsa", label: "DSA" },
  { id: "system-design", label: "System Design" },
  { id: "hld", label: "HLD" },
  { id: "lld", label: "LLD" },
  { id: "interview-qa", label: "Interview Q&A" },
  { id: "simulator", label: "Practice Simulator" },
];

function App() {
  const [page, setPage] = useState("home");
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (page === "home" || page === "interview-qa" || page === "simulator") {
      setContent(null);
      return;
    }
    setLoading(true);
    setError(null);
    fetch(`${API}/api/content/${page}`)
      .then((r) => {
        if (!r.ok) throw new Error("Topic not found");
        return r.json();
      })
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [page]);

  const renderPage = () => {
    if (page === "home") return <HomePage onNavigate={setPage} />;
    if (page === "interview-qa") return <InterviewQA />;
    if (page === "simulator") return <PracticeSimulator />;
    if (loading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;
    if (content)
      return <TopicPage title={content.title} topics={content.topics} />;
    return null;
  };

  return (
    <div className="app">
      <nav className="sidebar">
        <div className="sidebar-header" onClick={() => setPage("home")}>
          <h1>📚 LRNDLH</h1>
          <span className="subtitle">Learning Repository</span>
        </div>
        <ul className="nav-list">
          {NAV_ITEMS.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${page === item.id ? "active" : ""}`}
              onClick={() => setPage(item.id)}
            >
              {item.label}
            </li>
          ))}
        </ul>
      </nav>
      <main className="main-content">{renderPage()}</main>
    </div>
  );
}

function HomePage({ onNavigate }) {
  const [topics, setTopics] = useState({});

  useEffect(() => {
    fetch(`${API}/api/content/topics`)
      .then((r) => r.json())
      .then(setTopics)
      .catch(() => {});
  }, []);

  return (
    <div className="home-page">
      <header className="hero">
        <h1>LRNDLH</h1>
        <p>
          A comprehensive learning repository covering React, JavaScript,
          Node.js, Express, Databases, SQL, DSA, System Design, HLD, LLD, and
          more. Theory + Examples + Practice Problems + Interview Questions.
        </p>
      </header>

      <div className="quick-stats">
        <div className="stat-card">
          <span className="stat-number">10+</span>
          <span className="stat-label">Topics</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">60+</span>
          <span className="stat-label">Concepts</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">80+</span>
          <span className="stat-label">Interview Qs</span>
        </div>
        <div className="stat-card">
          <span className="stat-number">12</span>
          <span className="stat-label">Practice Problems</span>
        </div>
      </div>

      <div className="topic-grid">
        {NAV_ITEMS.filter((i) => i.id !== "home").map((item) => (
          <div
            key={item.id}
            className="topic-card"
            onClick={() => onNavigate(item.id)}
          >
            <h3>{item.label}</h3>
            <p>
              {item.id === "interview-qa"
                ? "Company-wise & topic-wise interview questions with difficulty levels"
                : item.id === "simulator"
                  ? "Interactive coding practice with real-time test case validation"
                  : topics[item.id]
                    ? `${topics[item.id].topicCount} concepts covered`
                    : "Click to explore"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function TopicPage({ title, topics }) {
  const [activeTopic, setActiveTopic] = useState(0);
  const topic = topics[activeTopic];

  return (
    <div className="topic-page">
      <h2>{title}</h2>
      <div className="topic-tabs">
        {topics.map((t, i) => (
          <button
            key={i}
            className={`tab-btn ${i === activeTopic ? "active" : ""}`}
            onClick={() => setActiveTopic(i)}
          >
            {t.name}
          </button>
        ))}
      </div>
      {topic && (
        <div className="topic-content">
          <div className="theory-section">
            <h3>📖 Theory</h3>
            <p>{topic.theory}</p>
          </div>
          <div className="example-section">
            <h3>💻 Example</h3>
            <pre className="code-block">{topic.example}</pre>
          </div>
          <div className="practice-section">
            <h3>✏️ Practice Task</h3>
            <p>{topic.practice}</p>
          </div>
        </div>
      )}
    </div>
  );
}

function InterviewQA() {
  const [view, setView] = useState("company");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const category = view === "company" ? "company-wise" : "topic-wise";
    setLoading(true);
    fetch(`${API}/api/interview/${category}`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [view]);

  const difficultyColor = (d) => {
    if (d === "Easy") return "#4caf50";
    if (d === "Medium") return "#ff9800";
    return "#f44336";
  };

  if (loading)
    return <div className="loading">Loading interview questions...</div>;

  return (
    <div className="interview-page">
      <h2>Interview Questions & Answers</h2>
      <div className="view-toggle">
        <button
          className={`toggle-btn ${view === "company" ? "active" : ""}`}
          onClick={() => setView("company")}
        >
          Company Wise
        </button>
        <button
          className={`toggle-btn ${view === "topic" ? "active" : ""}`}
          onClick={() => setView("topic")}
        >
          Topic Wise
        </button>
      </div>
      {data && view === "company" && data.companies ? (
        <div className="company-list">
          {data.companies.map((company, i) => (
            <details key={i} className="company-group">
              <summary className="company-name">{company.name}</summary>
              <div className="questions-list">
                {company.questions.map((q, j) => (
                  <div key={j} className="question-item">
                    <span className="q-text">{q.q}</span>
                    <div className="q-tags">
                      <span
                        className="difficulty-badge"
                        style={{ background: difficultyColor(q.difficulty) }}
                      >
                        {q.difficulty}
                      </span>
                      <span className="topic-badge">{q.topic}</span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      ) : data && view === "topic" && data.topics ? (
        <div className="topic-list">
          {data.topics.map((topic, i) => (
            <details key={i} className="topic-group">
              <summary className="topic-name">{topic.name}</summary>
              <div className="questions-list">
                {topic.questions.map((q, j) => (
                  <div key={j} className="question-item">
                    <span className="q-text">{q.q}</span>
                    <span
                      className="difficulty-badge"
                      style={{ background: difficultyColor(q.difficulty) }}
                    >
                      {q.difficulty}
                    </span>
                  </div>
                ))}
              </div>
            </details>
          ))}
        </div>
      ) : null}
    </div>
  );
}

function PracticeSimulator() {
  const [problems, setProblems] = useState([]);
  const [activeProblem, setActiveProblem] = useState(null);
  const [code, setCode] = useState("");
  const [results, setResults] = useState(null);
  const [showSolution, setShowSolution] = useState(false);
  const [solution, setSolution] = useState("");

  useEffect(() => {
    fetch(`${API}/api/simulator/problems`)
      .then((r) => r.json())
      .then(setProblems)
      .catch(() => {});
  }, []);

  const selectProblem = (id) => {
    setShowSolution(false);
    setResults(null);
    setCode("");
    fetch(`${API}/api/simulator/problems/${id}`)
      .then((r) => r.json())
      .then((p) => {
        setActiveProblem(p);
        setCode(p.starterCode);
      })
      .catch(() => {});
  };

  const runCode = () => {
    if (!activeProblem) return;
    setResults(null);
    fetch(`${API}/api/simulator/run`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ problemId: activeProblem.id, code }),
    })
      .then((r) => r.json())
      .then(setResults)
      .catch(() => {});
  };

  const loadSolution = () => {
    if (!activeProblem) return;
    fetch(`${API}/api/simulator/solution/${activeProblem.id}`)
      .then((r) => r.json())
      .then((d) => {
        setSolution(d.solution);
        setShowSolution(true);
      })
      .catch(() => {});
  };

  const difficultyColor = (d) => {
    if (d === "Easy") return "#4caf50";
    if (d === "Medium") return "#ff9800";
    return "#f44336";
  };

  return (
    <div className="simulator-page">
      <h2>🧪 DSA Practice Simulator</h2>
      <div className="simulator-layout">
        <div className="problem-sidebar">
          <h3>Problems</h3>
          {problems.map((p) => (
            <div
              key={p.id}
              className={`problem-item ${activeProblem?.id === p.id ? "active" : ""}`}
              onClick={() => selectProblem(p.id)}
            >
              <span className="problem-title">{p.title}</span>
              <div className="problem-meta">
                <span
                  className="diff-badge"
                  style={{ background: difficultyColor(p.difficulty) }}
                >
                  {p.difficulty}
                </span>
                <span className="cat-badge">{p.category}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="problem-editor">
          {activeProblem ? (
            <>
              <div className="problem-description">
                <h3>{activeProblem.title}</h3>
                <p>{activeProblem.description}</p>
              </div>
              <div className="code-area">
                <textarea
                  className="code-editor"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  spellCheck={false}
                />
              </div>
              <div className="action-bar">
                <button className="btn btn-run" onClick={runCode}>
                  ▶ Run Tests
                </button>
                <button className="btn btn-solution" onClick={loadSolution}>
                  💡 Solution
                </button>
              </div>
              {showSolution && (
                <div className="solution-section">
                  <h4>Solution:</h4>
                  <pre className="solution-code">{solution}</pre>
                </div>
              )}
              {results && (
                <div className="results-section">
                  <h4>
                    Results:{" "}
                    {results.allPassed ? (
                      <span className="pass">✅ All Passed</span>
                    ) : (
                      <span className="fail">❌ Some Failed</span>
                    )}
                  </h4>
                  {results.results.map((r, i) => (
                    <div
                      key={i}
                      className={`result-item ${r.passed ? "pass" : "fail"}`}
                    >
                      <span>Test #{r.testCase}</span>
                      <span>Input: {r.input}</span>
                      <span>Expected: {r.expected}</span>
                      {r.error && <span>Error: {r.error}</span>}
                    </div>
                  ))}
                </div>
              )}
            </>
          ) : (
            <div className="select-prompt">
              Select a problem to start coding
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
