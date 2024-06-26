import { toast } from "sonner";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      contacts: [],
      userName: null,
      apiUrl: `https://playground.4geeks.com/contact`,
    },
    actions: {
      // Use getActions to call a function within a fuction
      getContacts: async () => {
        const store = getStore();
        try {
          const response = await fetch(
            `${store.apiUrl}/agendas/${store.userName}/contacts`
          );
          if (!response.ok) {
            throw new Error("There has been an error");
          }
          const data = await response.json();
          console.log(data);

          setStore({ contacts: data.contacts });
          toast.success("Contacts Retrieved");
        } catch (error) {
          console.log(error);
        }
      },
      addContact: async (contact) => {
        const store = getStore();
        // {title: string, body: string}
        try {
          const response = await fetch(
            `${store.apiUrl}/agendas/${store.userName}/contacts`,
            {
              method: "POST",
              body: JSON.stringify({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
              }),

              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(response);

            setStore({ contacts: [...store.contacts, data] });
            toast.success("Contact Added");
          }
        } catch (error) {
          console.log(error);
          alert("Contact not added, create user name first");
        }
      },
      createUserName: async (userName) => {
        const store = getStore();
        // {title: string, body: string}
        try {
          const response = await fetch(`${store.apiUrl}/agendas/${userName}`, {
            method: "POST",
          });

          if (response.ok) {
            console.log(response);

            setStore({ userName });
          }
        } catch (error) {
          console.log("failed to create user");
        }
      },
      setUserName: (userName) => {
        const store = getStore();
        const actions = getActions();
        setStore({ userName });
        actions.getContacts();
      },

      editContact: async (contact, id) => {
        const store = getStore();
        console.log("editContact called with id:", id); // Log id
        console.log("Contact details:", contact); // Log contact details
        // {title: string, body: string}
        try {
          const response = await fetch(
            `${store.apiUrl}/agendas/${store.userName}/contacts/${id}`,
            {
              method: "PUT",
              body: JSON.stringify({
                name: contact.name,
                phone: contact.phone,
                email: contact.email,
                address: contact.address,
              }),

              headers: {
                "Content-type": "application/json",
              },
            }
          );
          if (response.ok) {
            const data = await response.json();
            console.log(response);
            const filteredEditedContact = store.contacts.map((item) => {
              if (item.id == id) {
                return data;
              }
              return item;
            });
            setStore({ contacts: filteredEditedContact });
          }
        } catch (error) {
          console.log(error);
        }
      },
      deleteContact: async (id) => {
        const store = getStore();
        // {title: string, body: string}
        try {
          const response = await fetch(
            `${store.apiUrl}/agendas/${store.userName}/contacts/${id}`,
            {
              method: "DELETE",
            }
          );
          if (response.ok) {
            console.log(response);
            toast.success("Contact Deleted");

            const filteredContacts = store.contacts.filter(
              (contact) => contact.id !== id
            );

            setStore({ contacts: filteredContacts });
          }
        } catch (error) {
          console.log(error);
        }
      },
    },
  };
};

export default getState;
