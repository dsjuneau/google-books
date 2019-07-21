import React from "react";

export default function Saved() {
  return (
    <div>
      <h3 className="mx-3">Saved Books</h3>
      <ul className="list-group mt-4">
        <li className="list-group-item list-group-item-action">
          <div
            className="btn-group btn-group-sm float-right"
            role="group"
            aria-label="Basic example"
          >
            <button type="button" className="btn btn-primary">
              View
            </button>

            <button type="button" className="btn btn-danger">
              Delete
            </button>
          </div>
          <h4>Title of Book</h4>
          <h5>Authors</h5>
          <img
            src="http://placekitten.com/g/100/100"
            alt="..."
            class="img-thumbnail float-left"
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur
          dignissimos, est dolorem, quidem repudiandae fugiat debitis architecto
          odio ad totam provident soluta cupiditate quasi distinctio! Quia, non
          tempora illum dignissimos molestias aliquid velit obcaecati ut? Dolore
          amet omnis doloremque laborum voluptates rem optio vero quas tempore
          nulla, rerum illo fuga?
        </li>
      </ul>
    </div>
  );
}
