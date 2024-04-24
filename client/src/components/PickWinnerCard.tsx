interface PropType {
  diceValue: number;
  setDiceValue: React.Dispatch<React.SetStateAction<number>>;
}

const PickWinnerCard = (props: PropType) => {
  const { diceValue, setDiceValue } = props;

  return (
    <div className="w-full bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md flex gap-3 flex-col items-center">
      <h1 className="text-4xl font-bold text-center max-w-[500px] truncate">
        Address Winner: {diceValue}
      </h1>
      <h1 className="text-3xl text-primary-purple font-bold text-center">
        Rewards: 5 ETH
      </h1>
      <button
        className="mt-5 text-xl text-primary-purple font-bold"
        onClick={() => {
          setDiceValue(0);
        }}
      >
        Click to start new turn
      </button>
    </div>
  );
};

export default PickWinnerCard;
