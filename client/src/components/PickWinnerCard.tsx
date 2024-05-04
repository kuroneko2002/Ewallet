import { useEthersStore } from "@/store/ethers.store";

interface PropType {
  balance: number;
  setDiceValue: React.Dispatch<React.SetStateAction<number>>;
}

const PickWinnerCard = (props: PropType) => {
  const { balance, setDiceValue } = props;

  const winner = useEthersStore((state: any) => state.winner);

  return (
    <div className="w-full bg-gradient-to-b from-primary-yellow to-secondary-yellow px-4 py-2 rounded-md flex gap-3 flex-col items-center">
      <h1 className="text-4xl font-bold text-center max-w-[90%] truncate">
        Address Winner: {winner}
      </h1>
      <h1 className="text-3xl text-primary-purple font-bold text-center">
        Rewards: {balance ? balance : 0} ETH
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
