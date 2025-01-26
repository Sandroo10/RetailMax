import { useNavigate } from "react-router-dom";

interface Category {
  imageUrl: string;
  title: string;
  route: string;
}

interface DirectoryItemProps {
  category: Category;
}

const DirectoryItem = ({ category }: DirectoryItemProps) => {
  const { title, route, imageUrl } = category; // Add imageUrl here
  const navigate = useNavigate();

  const mainNavigateHandler = () => navigate(route);

  return (
    <div
      onClick={mainNavigateHandler}
      className="min-w-[30%] h-[240px] flex items-center justify-center border border-black m-0 mx-[7.5px] mb-4 overflow-hidden hover:cursor-pointer hover:scale-105 hover:transition-transform hover:duration-1000 hover:ease-[cubic-bezier(0.25,_0.45,_0.45,_0.95)] first:mr-[7.5px] last:ml-[7.5px] relative select-none"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute h-[90px] p-6 flex flex-col items-center justify-center border border-black bg-white opacity-70">
        <h2 className="font-bold text-[22px] text-[#4a4a4a] uppercase pointer-events-none">
          {title}
        </h2>
        <p className="font-light text-[16px] pointer-events-none">Shop Now</p>
      </div>
    </div>
  );
};

export default DirectoryItem;
