const Buttons = ({ children, title, onClick, className }) => {
    return (
        <button
            onClick={onClick}
            title={title}
            className={`mb-3 border w-full bg-gray-700 rounded-lg p-2 text-white font-semibold cursor-pointer duration-300 text-start ${className} `}>
            {children}
        </button>
    );
};

export default Buttons;


