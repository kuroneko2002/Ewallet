interface PropType {
  reward: string | number;
}

const WinnerCard = (props: PropType) => {
  const { reward } = props;

  return (
    <div className="bg-gradient-to-b from-primary-yellow to-secondary-yellow rounded-md p-6 flex flex-col items-center gap-3">
      <h1 className="text-3xl font-bold text-center">CONGRATULATION!!!</h1>
      <h1 className="text-3xl font-bold text-center">
        You are the last turn winner
      </h1>
      <h2 className="text-2xl text-primary-purple font-bold text-center">
        Your rewards: {reward} ETH
      </h2>
      {/* <p className="text-xl text-primary-purple font-bold text-center hover:cursor-pointer hover:underline">
        Click to accept
      </p> */}
    </div>
  );
};

export default WinnerCard;
