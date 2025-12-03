const SearchInput = ({ searchTerm, setSearchTerm }) => {
    return (
        <div className="my-7 mx-3">
            <input
                type="search"
                name="search"
                placeholder="Search by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 p-3 rounded-lg text-white"
                aria-label="Search contacts"
            />
        </div>
    );
};

export default SearchInput;
