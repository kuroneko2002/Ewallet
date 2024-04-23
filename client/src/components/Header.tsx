import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full px-6 bg-secondary-purple">
      <Link to="/">
        <div className="flex items-center gap-5">
          <img className="w-[80px]" src="assets/logo.png" alt="logo" />
          <h1 className="text-xl font-bold text-primary-yellow">
            LotteryWin88
          </h1>
        </div>
      </Link>
    </div>
  );
};

export default Header;
