import React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { patchClient } from "../../redux/slices/clientSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const EditClientForm = ({ client, token }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      name: client.name,
      address: client.address,
      phone: client.phone,
      email: client.email,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("The client email direction is required.")
        .email("Invalid email."),
      address: Yup.string().required("The client address is required."),
      name: Yup.string().required("The client name is required."),
      phone: Yup.string().required("The client phone is required."),
    }),
    onSubmit: async (FormData) => {
      if (dispatch(await patchClient(FormData, client._id, token))) {
        formik.handleReset();
        router.push("/");
      }
    },
  });

  return (
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
        className="btn btn-primary text-uppercase"
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
        Edit Client
      </button>
    </form>
  );
};
