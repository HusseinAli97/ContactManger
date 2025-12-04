import ContactCard from "./ContactCard";

const ContactList = ({
    contacts,
    setEditingContact,
    favContact,
    delContact,
}) => {
    if (!contacts || contacts.length === 0) {
        return (
            <p className="text-lg text-gray-400 my-4 p-2 border rounded-2xl text-center">
                No Contacts Add Yet
            </p>
        );
    }

    return (
        <div className="border p-2 rounded-lg bg-gray-500">
            {contacts.map((contact) => (
                <ContactCard
                    key={contact.id}
                    contact={contact}
                    setEditingContact={setEditingContact}
                    favContact={favContact}
                    delContact={delContact}
                />
            ))}
        </div>
    );
};

export default ContactList;
