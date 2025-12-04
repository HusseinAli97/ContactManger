import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SearchInput from "./Components//Controls/SearchInput";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import logo from "/logo.png";

const App = () => {
    // -----------------------
    // State
    // -----------------------
    const contactStorage =
        JSON.parse(localStorage.getItem("contacts")) ?? [];

    const [contacts, setContacts] = useState(contactStorage);

    useEffect(() => {
        localStorage.setItem("contacts", JSON.stringify(contacts));
    }, [contacts]);
    // search + edit + modal state
    const [searchTerm, setSearchTerm] = useState("");
    const [editingContact, setEditingContact] = useState(null);

    // -----------------------
    // Derived
    // -----------------------
    const filteredContacts =
        contacts.filter((contact) => {
            const searchKey = searchTerm.trim().toLowerCase();
            if (searchKey === "") return contacts;

            return (
                contact.name.toLowerCase().includes(searchKey) ||
                contact.email.toLowerCase().includes(searchKey)
            );
        }) ?? [];

    // -----------------------
    // Handlers (mutations)
    // -----------------------
    // Add
    const addContact = (newContact) => {
        setContacts((prev) => [newContact, ...prev]);
    };
    // Delete
    const delContact = (id) => {
        if (!contacts.some((c) => c.id === id)) return;
        if (!confirm("Are You Sure You Want Delete ?")) return;
        setContacts((prev) => prev.filter((c) => c.id !== id));
        toast.success("Contact Deleted ", {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };
    // Toggle Fav
    const favContact = (id) => {
        if (!contacts.some((c) => c.id === id)) return;
        setContacts((prev) =>
            prev.map((c) =>
                c.id === id ? { ...c, isFavorite: !c.isFavorite } : c
            )
        );
    };
    // Update
    const updateContactsList = (id, updates) => {
        if (!contacts.some((c) => c.id === id)) return;
        setContacts((prev) =>
            prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
        );
    };

    // -----------------------
    // Render
    // -----------------------
    return (
        <div className="mx-auto bg-gray-600 border rounded-lg text-white m-3 p-4 container mt-6">
            <div className="flex justify-center items-center">
                <img
                    src={logo}
                    alt="logo"
                    className="h-10 mb-3 object-cover"
                />
                <h1 className="font-bold text-3xl mb-3 ml-2">
                    Contact Manager
                </h1>
            </div>

            <ContactForm
                key={editingContact?.id ?? "new"}
                addContact={addContact}
                editingContact={editingContact}
                updateContactsList={updateContactsList}
                setEditingContact={setEditingContact}
            />

            <SearchInput
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
            />

            <ContactList
                contacts={filteredContacts}
                setEditingContact={setEditingContact}
                favContact={favContact}
                delContact={delContact}
            />
            <ToastContainer />
        </div>
    );
};

export default App;
