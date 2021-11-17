import { useRouter } from "next/router";

const PortfolioOption = ({ portfolioName, portfolioId, ownerName }) => {
  const router = useRouter();

  const clickHandler = () => {
    router.push({
      pathname: "/site",
      query: { portfolio_id: portfolioId },
    });
  };

  return (
    <div
      onClick={clickHandler}
      className="w-full flex items-center cursor-pointer  border-2 border-gray-200 border-t-0 overflow-x-hidden text-center hover:bg-purple-400 hover:text-white"
    >
      <p className="w-full py-1">{portfolioName}</p>
      <p className="w-full border-l-2 py-1">{ownerName}</p>
    </div>
  );
};

export default PortfolioOption;
