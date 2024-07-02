import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="w-full px-6 bg-secondary-purple flex items-center gap-5">
      <Link to="/">
        <div className="flex items-center gap-5">
          <img className="w-[80px]" src="assets/logo.png" alt="logo" />
          <h1 className="text-xl font-bold text-primary-yellow">
            LotteryWin88
          </h1>
        </div>
      </Link>
      {/* <div className="flex items-center gap-5">
        <Link to="/player">
          <h1 className="font-bold text-xl text-primary-yellow">Player</h1>
        </Link>
        <Link to="/owner">
          <h1 className="font-bold text-xl text-primary-yellow">Owner</h1>
        </Link>
      </div> */}
    </div>
  );
};

export default Header;
