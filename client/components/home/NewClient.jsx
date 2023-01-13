import React, { useState } from "react";
import { NewClientModal } from "./NewClientModal";

export const NewClient = ({ token }) => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <div className="mt-5">
      <h2>List of Clients</h2>
      <button
        type="button"
        className="btn btn-primary fst-italic text-uppercase"
        onClick={() => setModalShow(true)}
      >
        Register a new Client
      </button>

      <NewClientModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        token={token}
      />
    </div>
  );
};
