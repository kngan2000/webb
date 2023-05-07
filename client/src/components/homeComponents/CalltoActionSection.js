import React from "react";

const CalltoActionSection = () => {
  return (
    <div className="subscribe-section bg-with-black">
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="subscribe-head">
              <h2>Do you need more advice from us?</h2>
              <p>Confirm Email so that we can advise and support you specifically.</p>
              <form className="form-section">
                <input placeholder="Please enter your email...." name="email" type="email" />
                <input value="Confirm" name="subscribe" type="submit" />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalltoActionSection;
