import React from "react";

export default function Nav() {
  return (
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <a class="navbar-brand" href="/">
        Book Search
      </a>

      <ul class="navbar-nav mr-auto">
        <li class="nav-item active">
          <a class="nav-link" href="/saved">
            Saved<span class="sr-only">(current)</span>
          </a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/search">
            Search
          </a>
        </li>
      </ul>
    </nav>
  );
}
