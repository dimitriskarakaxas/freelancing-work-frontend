const Site = ({ ownerName, siteName, siteId, setFetchedInput }) => {
  const clickHandler = () => {
    fetch(`http://localhost:8080/sites/${siteId}`, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setFetchedInput(data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      onClick={clickHandler}
      className="w-full flex items-center cursor-pointer  border-2 border-gray-200 border-t-0 overflow-x-hidden text-center hover:bg-purple-400 hover:text-white"
    >
      <p className="w-full py-1">{siteName}</p>
      <p className="w-full border-l-2 py-1">{ownerName}</p>
    </div>
  );
};

export default Site;
