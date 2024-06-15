import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  const handleCreateUser = () => {
    const userName = prompt("Please enter a username");
    if (userName) {
      actions.createUserName(userName);
    }
  };
  const handleSetUser = () => {
    const userName = prompt("Please enter your username");
    if (userName) {
      actions.setUserName(userName);
      console.log(userName);
    }
  };

  const handleDeleteContact = (id) => {
    actions.deleteContact(id);
  };

  return (
    <div className="container mx-auto">
      <h1 className="display-3 text-center p-3 bg-dark text-light mt-3 rounded  ">
        {!store.userName ? "Contact List" : `${store.userName}'s Contact List`}
      </h1>

      <div>
        <Link to="/contactform" className="w-100 btn btn-dark my-2">
          Create Contact
        </Link>
      </div>
      {store.contacts && store.contacts.length > 0 ? (
        store.contacts.map((contact) => {
          const imageUrl =
            contact.id % 2 === 0
              ? `https://randomuser.me/api/portraits/thumb/men/${
                  contact.id % 100
                }.jpg`
              : `https://randomuser.me/api/portraits/thumb/women/${
                  contact.id % 100
                }.jpg`;

          return (
            <div className="card my-2" key={contact.id}>
              <div className="row">
                <div className="card-header col-3 d-flex align-items-center justify-content-center">
                  <img
                    className="rounded-circle"
                    src={imageUrl}
                    style={{ width: "90px", height: "90px" }}
                  />
                </div>

                <div className="col-6 card-body">
                  <h3>{contact.name}</h3>
                  <p>
                    <i className="fas fa-phone"></i> {contact.phone}
                  </p>
                  <p>
                    <i className="fas fa-envelope"></i> {contact.email}
                  </p>
                  <p>
                    <i className="fas fa-map-marker-alt"></i> {contact.address}
                  </p>
                </div>
                <div className="col-3 card-footer d-flex align-items-center justify-content-center">
                  <Link
                    to={{
                      pathname: `/editform/${contact.id}`,
                    }}
                    className="btn btn-dark btn-sm ms-1"
                  >
                    <i className="fas fa-edit"></i>
                  </Link>
                  <button
                    className="btn btn-dark btn-sm ms-1"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          );
        })
      ) : (
        <p className="ms-2 mt-2">No contacts to show, yet...</p>
      )}
      <div className="container text-center">
        <div>
          <button
            className="btn btn-dark ms-1 mt-2  px-5"
            onClick={handleCreateUser}
          >
            {!store.userName ? "Create User" : null}
          </button>
        </div>
        <div>
          {!store.userName ? (
            <button
              className="btn btn-dark ms-1 mt-2 px-5"
              onClick={handleSetUser}
            >
              Sign in
            </button>
          ) : (
            <button
              className="btn btn-dark ms-1 mt-2 px-5"
              onClick={() => actions.setUserName(null)}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
