const Inputs = ({
    divClass,
    inputClass,
    labelClass,
    name,
    label,
    type,
    value,
    onChange,
}) => {
    return (
        <div className={`mb-4 ${divClass}`}>
            <label
                htmlFor={name}
                className={`font-semibold block m-1 ${labelClass}`}>
                {label}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                id={name}
                className={`w-full bg-gray-700 p-2 rounded-lg text-white ${inputClass}`}
            />
        </div>
    );
};

export default Inputs;
