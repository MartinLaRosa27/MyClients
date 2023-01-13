import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllClients, deleteClient } from "../../redux/slices/clientSlice";
import Link from "next/link";

export const ClientTable = ({ token }) => {
  const { clientsList } = useSelector((state) => state.clientSlice);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllClients(token));
  }, [dispatch]);

  return (
    <div className="my-5">
      {clientsList === null && <h1 className="text-center">Cargando...</h1>}
      <br />
      {clientsList !== null && clientsList.length > 0 && (
        <div>
          <table className="table table-striped ">
            <thead>
              <tr className="border-bottom-0 border-dark">
                <th scope="col" className="fst-italic text-uppercase">
                  Name
                </th>
                <th scope="col" className="fst-italic text-uppercase">
                  Email
                </th>
                <th scope="col" className="fst-italic text-uppercase">
                  Phone
                </th>
                <th scope="col" className="fst-italic text-uppercase">
                  Address
                </th>
                <th scope="col" className="fst-italic text-uppercase">
                  Last Mod.
                </th>
                <th scope="col" className="fst-italic text-uppercase">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {clientsList.map((client) => {
                return (
                  <tr
                    className="border-bottom-0 border-secondary"
                    key={client._id}
                  >
                    <th>{client.name}</th>
                    <td>{client.email}</td>
                    <td>{client.phone}</td>
                    <td>{client.address}</td>
                    <td>{client.updatedAt}</td>
                    <td>
                      <Link
                        type="button"
                        className="btn btn-warning me-3 fst-italic text-uppercase"
                        href={`/client/${client._id}`}
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        className="btn btn-danger fst-italic text-uppercase"
                        onClick={() =>
                          dispatch(deleteClient(client._id, token))
                        }
                      >
                        DELETE
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {clientsList !== null && clientsList.length === 0 && (
        <div
          className="alert alert-dark text-center text-uppercase fst-italic"
          role="alert"
        >
          Please, enter a client record
        </div>
      )}
    </div>
  );
};
