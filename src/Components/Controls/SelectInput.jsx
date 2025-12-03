const SelectInput = ({ name, label, value, onChange, opts = [] }) => {
    return (
        <>
            <div className={"mb-4"}>
                <label
                    htmlFor={name}
                    className="font-semibold block m-1">
                    {label}
                </label>
                <select
                    name={name}
                    id={name}
                    value={value}
                    onChange={onChange}
                    className="w-full bg-gray-700 p-2 rounded-lg text-white">
                    {opts.map((opt) => (
                        <option
                            value={opt}
                            key={opt}>
                            {opt}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
};

export default SelectInput;
