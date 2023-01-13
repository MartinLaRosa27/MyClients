import React from "react";
import Modal from "react-bootstrap/Modal";
import * as Yup from "yup";
import { useFormik } from "formik";
import { postClient } from "../../redux/slices/clientSlice";
import { useDispatch } from "react-redux";

export const NewClientModal = (props) => {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      phone: "",
      email: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The client email direction is required.")
        .email("Invalid email.")
        .min(3, "The client email only can have between 3 and 140 characters.")
        .max(
          140,
          "The client email only can have between 3 and 140 characters."
        ),
      address: Yup.string()
        .required("The client address is required.")
        .min(
          1,
          "The client address only can have between 1 and 140 characters."
        )
        .max(
          140,
          "The client address only can have between 1 and 140 characters."
        ),
      name: Yup.string()
        .required("The client name is required.")
        .min(3, "The client name only can have between 4 and 140 characters.")
        .max(
          140,
          "The client name only can have between 3 and 140 characters."
        ),
      phone: Yup.string()
        .required("The client phone is required.")
        .max(25, "The client phone only can have until 25 characters."),
    }),
    onSubmit: async (FormData) => {
      if (dispatch(await postClient(FormData, props.token))) {
        formik.handleReset();
        props.onHide();
      }
    },
  });

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title
          id="contained-modal-title-vcenter"
          className="fst-italic text-uppercase"
        >
          REGISTER A NEW CLIENT
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Client Name</label>
            <input
              type="text"
              className="form-control"
              required
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.errors.name && formik.values.name.length !== 0 && (
              <small className="text-danger">{formik.errors.name}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Client Email</label>
            <input
              type="email"
              className="form-control"
              required
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            {formik.errors.email && formik.values.email.length !== 0 && (
              <small className="text-danger">{formik.errors.email}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Client Address</label>
            <input
              type="text"
              className="form-control"
              required
              name="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
            {formik.errors.address && formik.values.address.length !== 0 && (
              <small className="text-danger">{formik.errors.address}</small>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">Client Phone</label>
            <input
              type="text"
              className="form-control"
              required
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
            {formik.errors.phone && formik.values.phone.length !== 0 && (
              <small className="text-danger">{formik.errors.phone}</small>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={
              formik.errors.phone ||
              formik.errors.email ||
              formik.errors.address ||
              formik.errors.name ||
              formik.values.address.length === 0 ||
              formik.values.email.length === 0 ||
              formik.values.name.length === 0 ||
              formik.values.phone.length === 0
            }
          >
            Save Client
          </button>
          <div id="emailHelp" className="form-text text-center text-uppercase">
            Client information will not be shared with anyone.
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};
