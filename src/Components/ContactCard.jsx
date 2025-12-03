import { useState } from "react";
import { toast } from "react-toastify";
import Buttons from "./Controls/Buttons";

const ContactCard = ({
    contact,
    setEditingContact,
    favContact,
    delContact,
}) => {
    const {
        id,
        name,
        email,
        phone,
        category,
        notes,
        isFavorite,
        createdAt,
    } = contact;
    const [isExpanded, setIsExpanded] = useState(false);

    // color mapping for categories (supports emoji keys)
    const borderClassMap = {
        "👪Family": "border-l-4 border-blue-500",
        "🧑‍💼Work": "border-l-4 border-green-600",
        "👫Friend": "border-l-4 border-purple-500",
        "🫂Acquaintance": "border-l-4 border-yellow-400",
        "⛑️Emergency": "border-l-4 border-red-700",
    };

    const sideClass = isExpanded
        ? (
              borderClassMap[category] || "border-r-4 border-gray-500"
          ).replace("border-l-4", "border-r-4")
        : borderClassMap[category] || "border-l-4 border-gray-500";

    // -----------------------
    // Handlers
    // -----------------------
    const handleDelete = () => {
        delContact(id);
    };

    const handleEdit = () => {
        setEditingContact(contact);
        setIsExpanded(true);
    };

    const handleFav = () => {
        favContact(id);
        if (!isFavorite) {
            toast.success("You Have Add This Contact To Favorite ", {
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
            toast.error("You Have Remove This Contact To Favorite ", {
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

    // format date
    const formatDate = (ts) => {
        try {
            return new Date(ts).toLocaleDateString();
        } catch {
            return "-";
        }
    };

    return (
        <div
            className={`w-full p-4 rounded-2xl bg-gray-900 ${sideClass} shadow-sm hover:shadow-md transition duration-300 mb-4 hover:scale-102`}>
            <div className="flex items-start justify-between gap-4">
                <div className="text-left">
                    <h3 className="text-xl font-bold">{name}</h3>
                    <p className="text-sm text-gray-300">{email}</p>
                    <p className="text-sm text-gray-300">{phone}</p>
                    <p className="text-xs text-gray-400 mt-1">
                        Added: {formatDate(createdAt)}
                    </p>
                </div>

                <div className="flex flex-col items-end gap-2">
                    <button
                        title="Toggle Favorite"
                        onClick={handleFav}
                        className="hover:scale-125 duration-300 text-shadow-gray-700 text-2xl text-shadow-2xs cursor-pointer ">
                        {isFavorite ? (
                            <span className="text-yellow-400 hover:text-gray-300">
                                ★
                            </span>
                        ) : (
                            <span className="text-gray-400 hover:text-yellow-400">
                                ☆
                            </span>
                        )}
                    </button>

                    {/* Edit */}
                    <Buttons
                        title={"edit"}
                        onClick={handleEdit}
                        className="sm:w-27 text-start   hover:bg-gray-500">
                        📝 Edit
                    </Buttons>

                    <Buttons
                        title={"Delete"}
                        onClick={handleDelete}
                        className="sm:w-27 text-start flex   hover:bg-red-500 ">
                        💥 Delete
                    </Buttons>

                    <Buttons
                        onClick={() => setIsExpanded((p) => !p)}
                        className="  hover:text-gray-800 duration-300 hover:scale-125 border-none bg-transparent text-xs text-gray-300 ">
                        {isExpanded
                            ? "Hide details ⮜ "
                            : "Show details ⮟"}
                    </Buttons>
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 text-left text-sm text-gray-200">
                    <p>
                        <span className="font-semibold">
                            Category:
                        </span>{" "}
                        {category}
                    </p>
                    <p className="mt-2">
                        <span className="font-semibold">Notes:</span>{" "}
                        {notes}
                    </p>
                </div>
            )}
        </div>
    );
};

export default ContactCard;
