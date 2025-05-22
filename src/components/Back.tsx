const Back = ({
    handleClick
}: {
    handleClick: () => void
}) => {

    return (
        <button
            onClick={handleClick}
            className="fixed bottom-4 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-700 cursor-pointer rounded z-[1000] text-white"
        >
            назад
        </button>
    );
};

export default Back;