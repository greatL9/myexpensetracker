import React from 'react';

export default function DisplayModal(props) {
  // console.log(props);
  return (
    <div>
      {props.showSuccess ? (
        <>
          <div
            class="alert alert-success d-flex align-items-center"
            role="alert"
          >
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Success:"
            >
              {/* <use xlink:href="#check-circle-fill" /> */}
            </svg>
            <div>{props.showSuccess}</div>
          </div>
        </>
      ) : props.showError ? (
        <>
          <div
            class="alert alert-warning d-flex align-items-center"
            role="alert"
          >
            <svg
              class="bi flex-shrink-0 me-2"
              width="24"
              height="24"
              role="img"
              aria-label="Warning:"
            ></svg>
            <div>{props.showError}</div>
          </div>
        </>
      ) : (
        ''
      )}
    </div>
  );
}
