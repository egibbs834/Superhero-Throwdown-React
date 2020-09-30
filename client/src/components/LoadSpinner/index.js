import React from "react";

const SpinnerPage = () => {
  return (
    <>
      <div className="spinner-border slow text-secondary" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </>
  );
}

export default SpinnerPage;