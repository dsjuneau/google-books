import React from "react";

export default function SavedItems(props) {
  const { _id, title, authors, description, image, link } = props.bookData;
  return (
    <li className="list-group-item list-group-item-action">
      <div
        className="btn-group btn-group-sm float-right"
        role="group"
        aria-label="Basic example"
      >
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-primary"
        >
          View
        </a>

        <button
          onClick={() => props.handleDelete(_id)}
          type="button"
          className="btn btn-danger"
        >
          Delete
        </button>
      </div>
      <h4>{title}</h4>
      <h5>{authors}</h5>

      <img
        src={
          image
            ? image
            : "https://imgplaceholder.com/200x200?text=Image+not+available"
        }
        alt="..."
        className="img-thumbnail float-left mr-3"
      />
      {description}
    </li>
  );
}
