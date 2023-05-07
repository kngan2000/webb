import React from "react";

const CreateCategory = () => {
  return (
    <div className="col-md-12 col-lg-4">
      <form>
        <div className="mb-4">
          <label htmlFor="product_name" className="form-label">
            CATEGORY NAME
          </label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control py-3"
            id="product_name"
          />
        </div>
        <div className="mb-4">
          <label className="form-label">SHOWING</label>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="" />
          </div>
        </div>
        <div className="mb-4">
          <label className="form-label">DESCRIPTION</label>
          <textarea
            placeholder="Type here"
            className="form-control"
            rows="4"
          ></textarea>
        </div>

        <div className="d-grid">
          <button className="btn btn-primary py-3">CREATE A NEW CATEGORY</button>
        </div>
      </form>
    </div>
  );
};

export default CreateCategory;
