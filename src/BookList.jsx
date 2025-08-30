import React from "react";
import "./App.css";

export default function BookList({
  books,
  onSelectBook,
  page = 1,
  totalPages = 0,
  onPageChange,
}) {
  return (
    <section>
      {books.length === 0 ? (
        <p className="no-results">No results. Try a different search.</p>
      ) : (
        <div className="book-grid" role="list">
          {books.map((book) => (
            <article
              key={book.key ?? `${book.title}-${Math.random()}`}
              className="book-card"
              onClick={() => onSelectBook(book)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter") onSelectBook(book);
              }}
            >
              {book.cover_i ? (
                <img
                  className="book-cover"
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                  loading="lazy"
                />
              ) : (
                <div className="book-placeholder">No Cover</div>
              )}

              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author_name?.join(", ") || "Unknown Author"}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
