import React from "react";
import "./App.css";

export default function BookDetails({ book, onBack }) {
  if (!book) return null;

  const openUrl = book.key ? `https://openlibrary.org${book.key}` : null;

  return (
    <div className="book-details">
      <button className="back-btn" onClick={onBack}>
        ⬅ Back
      </button>

      <h2>{book.title}</h2>

      {book.cover_i ? (
        <img
          src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
          alt={book.title}
          className="details-cover"
        />
      ) : (
        <div className="book-placeholder details-placeholder">No Cover</div>
      )}

      <p>
        <strong>Author(s):</strong> {book.author_name?.join(", ") || "Unknown"}
      </p>
      <p>
        <strong>First published:</strong> {book.first_publish_year || "N/A"}
      </p>
      <p>
        <strong>Publisher(s):</strong> {book.publisher ? book.publisher.slice(0, 5).join(", ") : "N/A"}
      </p>
      <p>
        <strong>Edition count:</strong> {book.edition_count ?? "N/A"}
      </p>

      {book.isbn && (
        <p>
          <strong>ISBNs:</strong> {book.isbn.slice(0, 6).join(", ")}
        </p>
      )}

      {openUrl && (
        <p>
          <a href={openUrl} target="_blank" rel="noopener noreferrer">
            View on OpenLibrary
          </a>
        </p>
      )}
    </div>
  );
}
