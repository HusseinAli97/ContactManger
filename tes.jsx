import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ContactForm = ({
    addContact,
    editingContact,
    updateContactsList,
    setEditingContact,
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // flag will be true when click on edit and sent editingContact
    let isEditMode = Boolean(editingContact);

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        email: "",
        category: "👪Family",
        notes: "",
        isFavorite: false,
    });

    const resetForm = () => {
        setFormData({
            name: "",
            phone: "",
            email: "",
            category: "👪Family",
            notes: "",
            isFavorite: false,
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((dataObj) => ({
            ...dataObj,
            [name]: value,
        }));
    };

    useEffect(() => {
        if (editingContact) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setFormData({
                name: editingContact.name || "",
                phone: editingContact.phone || "",
                email: editingContact.email || "",
                category: editingContact.category || "👪Family",
                notes: editingContact.notes || "",
                isFavorite: !!editingContact.isFavorite,
            });

            setIsExpanded(true);
        } else {
            resetForm();
            setIsExpanded(false);
        }
    }, [editingContact]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.phone || !formData.email) {
            toast.error("Please Fill Name & Phone & Mail Fields", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });

            return;
        }

        if (isEditMode) {
            updateContactsList(editingContact.id, formData);
            resetForm();
            setIsExpanded(false);
            setEditingContact(null);

            toast.success("Contact Is Updated ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        } else {
            const newContact = {
                id: Date.now() + Math.floor(Math.random() * 1000),
                ...formData,
                createdAt: Date.now(),
            };

            addContact(newContact);
            resetForm();
            setIsExpanded(false);

            toast.success("Contact Created ", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const handleCancel = () => {
        setEditingContact(null);
        resetForm();
        setIsExpanded(false);
    };

    return (
        <div className="border p-4 mx-3 rounded-lg bg-black mt-3 relative">
            <button
                className="text-gray-300 cursor-pointer hover:text-gray-800 duration-300 hover:scale-125"
                onClick={() => {
                    setIsExpanded((prev) => !prev);
                }}>
                {isExpanded ? "Hide ⮞" : "Show ⮟"}
            </button>

            <div className="overflow-hidden transition-all duration-300 ease-in-out">
                <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                        isExpanded
                            ? "max-h-300 lg:max-h-100 opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3  p-3">
                        {/* name */}
                        <div className="mb-4">
                            <label
                                htmlFor="name"
                                className="font-semibold block m-1">
                                Name
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                id="name"
                                className="w-full bg-gray-700 p-2 rounded-lg text-white"
                            />
                        </div>

                        {/* Phone */}
                        <div className="mb-4">
                            <label
                                htmlFor="phone"
                                className="font-semibold block m-1 ">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-gray-700 p-2 rounded-lg text-white"
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                htmlFor="email"
                                className="font-semibold block m-1">
                                Email
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-gray-700 p-2 rounded-lg text-white"
                            />
                        </div>

                        {/* category */}
                        <div className="mb-4">
                            <label
                                htmlFor="category"
                                className="font-semibold block m-1">
                                Category
                            </label>
                            <select
                                type="text"
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className={`w-full bg-gray-700 p-2 rounded-lg text-white`}>
                                <option
                                    value="👪Family"
                                    className="bg-blue-500">
                                    👪 Family
                                </option>
                                <option
                                    value="🧑‍💼Work"
                                    className="bg-green-600">
                                    🧑‍💼 Work
                                </option>
                                <option
                                    value="👫Friend"
                                    className="bg-purple-500">
                                    👫 Friend
                                </option>
                                <option
                                    value="🫂Acquaintance"
                                    className="bg-yellow-400">
                                    🫂 Acquaintance
                                </option>
                                <option
                                    value="⛑️Emergency"
                                    className="bg-red-700">
                                    ⛑️ Emergency
                                </option>
                            </select>
                        </div>

                        <div className="mb-4 absolute top-0 right-0 m-3">
                            <button
                                type="button"
                                title="Favorite"
                                value={formData.isFavorite}
                                onClick={() => {
                                    setFormData((prev) => ({
                                        ...prev,
                                        isFavorite: !prev.isFavorite,
                                    }));
                                }}
                                className={`
                                text-3xl transition-all duration-300 cursor-pointer
                                ${
                                    formData.isFavorite
                                        ? "text-yellow-400 hover:text-gray-400 scale-110"
                                        : "text-gray-400 hover:text-yellow-300 hover:scale-110"
                                }
    `}>
                                ★
                            </button>
                        </div>

                        <div className="mb-4 lg:col-span-2">
                            <label
                                htmlFor="notes"
                                className="font-semibold block m-1">
                                Notes
                            </label>
                            <textarea
                                type="text"
                                name="notes"
                                id="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full bg-gray-700 p-2 rounded-lg   "></textarea>

                            <button
                                type="submit"
                                className="border p-2 my-4 cursor-pointer rounded-lg ml-auto block bg-gray-700 font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 ">
                                {isEditMode
                                    ? "Save & Update"
                                    : "Create Contact"}
                            </button>

                            {isEditMode && (
                                <button
                                    onClick={handleCancel}
                                    className="border p-2 my-4 cursor-pointer rounded-lg ml-auto block bg-gray-700 font-bold transition-all duration-300 ease-in-out hover:bg-gray-900 ">
                                    Cancel Edit
                                </button>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
