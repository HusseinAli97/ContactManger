const TextAreaInput = ({ children,name, label, value, onChange }) => {
    return (
        <div className="mb-4 lg:col-span-2">
            <label
                htmlFor={name}
                className="font-semibold block m-1">
                {label}
            </label>
            <textarea
                name="notes"
                id="notes"
                value={value}
                onChange={onChange}
                className="w-full bg-gray-700 p-2 rounded-lg"
            />
            {children}
        </div>
    );
};

export default TextAreaInput;
