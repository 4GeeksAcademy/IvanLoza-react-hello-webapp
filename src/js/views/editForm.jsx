import React, { useState, useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditForm = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const { id } = useParams();

  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Editing contacts with id: ", id);
    actions.editContact(contact, id);
    navigate("/");
  };

  useEffect(() => {
    if (id) {
      const editingId = store.contacts.find((item) => item.id == id);
      setContact(editingId);
    }
  }, []);

  return (
    <div className="container-fluid w-75">
      <div className="card mt-4">
        <div className="card-body">
          <h1>Edit Contact:</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <input
              name="name"
              className="form-control mt-2"
              placeholder="Full Name"
              value={contact.name}
              onChange={(e) => handleChange(e)}
              required
            />

            <input
              name="email"
              placeholder="Email"
              className="form-control mt-2"
              value={contact.email}
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              name="phone"
              placeholder="Phone"
              className="form-control mt-2"
              value={contact.phone}
              onChange={(e) => handleChange(e)}
              required
            />
            <input
              name="address"
              placeholder="Address"
              className="form-control mt-2"
              value={contact.address}
              onChange={(e) => handleChange(e)}
              required
            />
            <button className="mt-2 btn btn-dark w-100" type="submit">
              Save
            </button>
          </form>
        </div>
      </div>
      <Link to="/" className="w-100 btn btn-dark mt-4">
        Go Back to Contact List
      </Link>
    </div>
  );
};

export default EditForm;
