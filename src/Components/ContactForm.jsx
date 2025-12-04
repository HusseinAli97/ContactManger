import {useState } from "react";
import { toast } from "react-toastify";
import Buttons from "./Controls/Buttons";
import Inputs from "./Controls/Inputs";
import SelectInput from "./Controls/SelectInput";
import TextAreaInput from "./Controls/TextAreaInput";

const ContactForm = ({
    addContact,
    editingContact,
    updateContactsList,
    setEditingContact,

}) => {
    const mapContact = (c) => ({
        name: c.name || "",
        phone: c.phone || "",
        email: c.email || "",
        category: c.category || "👪Family",
        notes: c.notes || "",
        isFavorite: !!c.isFavorite,
    });
    // defaults
    const defaultForm = {
        name: "",
        phone: "",
        email: "",
        category: "👪Family",
        notes: "",
        isFavorite: false,
    };
    // state
    const [isExpanded, setIsExpanded] = useState(editingContact);
    const [formData, setFormData] = useState(() =>
        editingContact ? mapContact(editingContact) : defaultForm
    );

    // pre-fill when editingContact changes
    // useEffect(() => {
    //     if (editingContact) {
    //         setFormData({
    //             name: editingContact.name || "",
    //             phone: editingContact.phone || "",
    //             email: editingContact.email || "",
    //             category: editingContact.category || "👪Family",
    //             notes: editingContact.notes || "",
    //             isFavorite: !!editingContact.isFavorite,
    //         });
    //         setIsExpanded(true);
    //     } else {
    //         setFormData(defaultForm);
    //         setIsExpanded(false);
    //     }
    // }, [editingContact]);

    const isEditMode = Boolean(editingContact);

    // -----------------------
    // Handlers
    // -----------------------
    const resetForm = () => {
        setFormData(defaultForm);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

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
            return;
        }

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
    };

    const handleCancel = () => {
        setEditingContact(null);
        resetForm();
        setIsExpanded(false);
    };

    // -----------------------
    // Render
    // -----------------------
    return (
        <div className="border p-4 mx-3 rounded-lg bg-black mt-3 relative">
            <button
                type="button"
                className="text-gray-300 cursor-pointer hover:text-gray-800 duration-300 hover:scale-125"
                onClick={() => setIsExpanded((p) => !p)}>
                {isExpanded ? "Hide ⮞" : "Show ⮟"}
            </button>

            <div className="overflow-hidden transition-all duration-300 ease-in-out">
                <div
                    className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
                        isExpanded
                            ? "max-h-300 lg:max-h-300 opacity-100 pointer-events-auto"
                            : "max-h-0 opacity-0 pointer-events-none"
                    }`}>
                    <form
                        onSubmit={handleSubmit}
                        className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-3 p-3">
                        {/* name */}
                        <Inputs
                            name={"name"}
                            label={"Name"}
                            type={"text"}
                            value={formData.name}
                            onChange={handleChange}
                        />
                        {/* phone */}
                        <Inputs
                            name={"phone"}
                            label={"Phone"}
                            type={"text"}
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {/* email */}
                        <Inputs
                            name={"email"}
                            label={"E-mail"}
                            type={"text"}
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {/* category */}
                        <SelectInput
                            name={"category"}
                            label={"Category"}
                            value={formData.category}
                            onChange={handleChange}
                            opts={[
                                "👪Family",
                                "🧑‍💼Work",
                                "👫Friend",
                                "🫂Acquaintance",
                                "⛑️Emergency",
                            ]}
                        />

                        {/* favorite toggle */}
                        <div className="mb-4 absolute top-0 right-0 m-3">
                            <button
                                type="button"
                                title="Favorite"
                                onClick={() =>
                                    setFormData((prev) => ({
                                        ...prev,
                                        isFavorite: !prev.isFavorite,
                                    }))
                                }
                                className={`text-3xl transition-all duration-300 cursor-pointer ${
                                    formData.isFavorite
                                        ? "text-yellow-400 hover:text-gray-400 scale-110"
                                        : "text-gray-400 hover:text-yellow-300 hover:scale-110"
                                }`}>
                                ★
                            </button>
                        </div>

                        {/* notes */}
                        <TextAreaInput
                            name={"notes"}
                            label={"Notes"}
                            value={formData.notes}
                            onChange={handleChange}>
                            <div className="grid grid-cols-2 gap-4 ">
                                <Buttons
                                    type="submit"
                                    className=" p-2 my-4 hover:bg-gray-900">
                                    {isEditMode
                                        ? "Save & Update"
                                        : "Create Contact"}
                                </Buttons>
                                {isEditMode ? (
                                    <Buttons
                                        type="button"
                                        onClick={handleCancel}
                                        className="  p-2 my-4   hover:bg-gray-900 ">
                                        Cancel Edit
                                    </Buttons>
                                ) : (
                                    ""
                                )}
                            </div>
                        </TextAreaInput>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ContactForm;
