import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import SearchInput from "./Components//Controls/SearchInput";
import ContactForm from "./Components/ContactForm";
import ContactList from "./Components/ContactList";
import logo from "/logo.png";

const App = () => {
    // -----------------------
    // State
    // -----------------------
    const [contacts, setContacts] = useState([
        {
            id: 1764628114389912,
            name: "Ahmed Laila",
            email: "ahmed.laila@mail.net",
            phone: "+20(15) 345-6789",
            category: "👪Family",
            notes: "My brother's contact",
            isFavorite: true,
            createdAt: 1735704000000,
        },
        {
            id: 1764628114390025,
            name: "Youssef Noura",
            email: "youssef.noura@web.com",
            phone: "+971(98) 901-2345",
            category: "🧑‍💼Work",
            notes: "Colleague at work",
            isFavorite: false,
            createdAt: 1718872000000,
        },
        {
            id: 1764628114390141,
            name: "Omar Sara",
            email: "omar.sara@corp.net",
            phone: "+966(32) 567-8901",
            category: "👫Friend",
            notes: "Childhood friend",
            isFavorite: true,
            createdAt: 1726002000000,
        },
        {
            id: 1764628114390231,
            name: "Khalid Fatima",
            email: "khalid.fatima@email.com",
            phone: "+1(65) 123-4567",
            category: "🫂Acquaintance",
            notes: "Met at conference",
            isFavorite: false,
            createdAt: 1740924000000,
        },
        {
            id: 1764628114390317,
            name: "Mohamed Amira",
            email: "mohamed.amira@mail.com",
            phone: "+20(77) 789-0123",
            category: "⛑️Emergency",
            notes: "Important contact",
            isFavorite: true,
            createdAt: 1753900000000,
        },
        {
            id: 1764628114390408,
            name: "Tariq Hana",
            email: "tariq.hana@web.net",
            phone: "+971(44) 345-6789",
            category: "🧑‍💼Work",
            notes: "Colleague at work",
            isFavorite: false,
            createdAt: 1729000000000,
        },
        {
            id: 1764628114390499,
            name: "Ziad Mona",
            email: "ziad.mona@corp.com",
            phone: "+966(21) 901-2345",
            category: "👫Friend",
            notes: "Childhood friend",
            isFavorite: true,
            createdAt: 1748200000000,
        },
        {
            id: 1764628114390595,
            name: "Adel Salma",
            email: "adel.salma@email.net",
            phone: "+1(89) 567-8901",
            category: "👪Family",
            notes: "My brother's contact",
            isFavorite: false,
            createdAt: 1731600000000,
        },
    ]);

    // search + edit + modal state
    const [searchTerm, setSearchTerm] = useState("");
    const [editingContact, setEditingContact] = useState(null);

    // -----------------------
    // Derived
    // -----------------------
    const filteredContacts = contacts.filter((contact) => {
        const searchKey = searchTerm.trim().toLowerCase();
        if (searchKey === "") return contacts;

        return (
            contact.name.toLowerCase().includes(searchKey) ||
            contact.email.toLowerCase().includes(searchKey)
        );
    });

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
