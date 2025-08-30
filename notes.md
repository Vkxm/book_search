# Developer Notes

## 📖 Project Overview
This project is a simple **Book Search web application** built with React.  
It allows users to search books using the **OpenLibrary API**, view book details, and navigate results with pagination.  
The app also supports **light/dark mode**.

---

## 🏗️ Component Breakdown
- **App.jsx**
  - Root component of the application.
  - Maintains search query state and renders the search input.
  - Conditionally renders `BookList` only when a query is entered (so the homepage remains clean).

- **BookList.jsx**
  - Fetches books from OpenLibrary API using the search query.
  - Manages pagination with `useState` (previous/next page).
  - Passes each book object to `BookDetail` for rendering.

- **BookDetail.jsx**
  - Displays details of a single book:
    - Title
    - Author(s)
    - First publish year
    - Cover image (if available, else fallback).

---

## 🔑 Key Implementation Details
1. **Search Flow**
   - User enters a query in `App.jsx`.
   - `App.jsx` updates `query` state → passed down to `BookList`.
   - `BookList` fetches matching results → renders multiple `BookDetail` components.

2. **Pagination**
   - Controlled by a `page` state in `BookList`.
   - Buttons **Prev/Next** update page number.
   - Prev button disabled when on the first page.
   - Pagination only appears when search results are active.

3. **Light/Dark Mode**
   - Implemented a toggle to switch between themes.
   - Fixed bug where dark mode left **white gaps on page sides** by applying **full-width background styles**.

---

## 🛠️ Challenges & Fixes
- **Problem:** Dark mode didn’t cover full site (white gaps remained).  
  **Fix:** Applied `min-height: 100vh;` and proper background styles.

- **Problem:** Pagination buttons appeared on homepage (before any search).  
  **Fix:** Added conditional rendering so pagination appears **only with active results**.

- **Problem:** Search bar alignment was inconsistent.  
  **Fix:** Centered search bar in the layout for cleaner UI.

---

## 🚀 Future Improvements
- Add **loading indicator** (spinner) while fetching results.
- Show **error messages** when API call fails.
- Implement **book details modal** with more metadata (publisher, subjects).
- Save **recent searches** for quick access.
- Improve **mobile responsiveness**.

---

## 📂 Deployment
- Deployed on **CodeSandbox/StackBlitz** [link](https://codesandbox.io/p/github/Vkxm/book_search/draft/nervous-varahamihira).  
- Source code hosted on [GitHub](https://github.com/Vkxm/book_search).  

---
