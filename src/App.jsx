import React, { useEffect, useState } from "react";
import BookList from "./BookList";
import BookDetails from "./BookDetails";
import "./App.css";

export default function App() {
  const LIMIT = 10;

  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalFound, setTotalFound] = useState(0);
  const [loading, setLoading] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const [hasSearched, setHasSearched] = useState(false);
  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");

    return () => document.body.classList.remove("dark");
  }, [darkMode]);

  const totalPages = totalFound > 0 ? Math.ceil(totalFound / LIMIT) : 0;

  const fetchBooks = async (searchQuery, pageNum = 1) => {
    if (!searchQuery || !searchQuery.trim()) {
      
      setBooks([]);
      setTotalFound(0);
      setPage(1);
      return;
    }

    setLoading(true);
    setSelectedBook(null);

    try {
      const url = `https://openlibrary.org/search.json?q=${encodeURIComponent(
        searchQuery
      )}&limit=${LIMIT}&page=${pageNum}`;

      const res = await fetch(url);
      if (!res.ok) throw new Error("Network response not ok");
      const data = await res.json();

      setBooks(data.docs || []);
      setTotalFound(data.numFound ?? data.num_found ?? 0);
      setPage(pageNum);
    } catch (err) {
      console.error("Error fetching books:", err);
      setBooks([]);
      setTotalFound(0);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (!query || !query.trim()) return;
    setHasSearched(true);
    fetchBooks(query, 1);
  };

  const handlePageChange = (newPage) => {
    if (!hasSearched) return; // only allow paging after a search
    if (newPage < 1) return;
    if (totalPages && newPage > totalPages) return;
    fetchBooks(query, newPage);
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>📚 Book Finder</h1>

        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search for books..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSearch();
              }}
            />
            <button onClick={handleSearch}>Search</button>
          </div>

          <button
            className="theme-toggle"
            onClick={() => setDarkMode((v) => !v)}
            aria-pressed={darkMode}
          >
            {darkMode ? "☀️ Light" : "🌙 Dark"}
          </button>
        </div>
      </header>

      <main>
        {loading && <p className="loading">Loading...</p>}

        {!selectedBook && (
          <BookList
            books={books}
            onSelectBook={setSelectedBook}
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}

        {selectedBook && (
          <BookDetails book={selectedBook} onBack={() => setSelectedBook(null)} />
        )}
      </main>

      {/* Pagination only shown after a search (hasSearched) and when results exist */}
      {hasSearched && books.length > 0 && (
        <div className="pagination">
          <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
            ⬅ Prev
          </button>

          <span className="page-indicator">
            Page {page} {totalPages ? ` / ${totalPages}` : ""}
          </span>

          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={totalPages ? page >= totalPages : books.length === 0}
          >
            Next ➡
          </button>
        </div>
      )}
    </div>
  );
}


