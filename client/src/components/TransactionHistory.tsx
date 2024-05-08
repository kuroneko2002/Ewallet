interface PropType {
  transaction: any;
  account: string;
}

const TransactionHistory = (props: PropType) => {
  const { transaction, account } = props;
  const reversedTransactions = [...transaction].reverse();
  return (
    <div>
      <div className="my-10 flex items-center gap-5">
        <h1 className="text-3xl font-bold">Transaction History</h1>
      </div>
      <div className="overflow-y-auto h-[400px]">
        <table className="w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sender
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Receiver
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Time
              </th>
            </tr>
          </thead>
          <tbody className="bg-primary-purple divide-y divide-gray-200">
            {reversedTransactions?.map((trans: any, index: number) => {
              console.log(trans);

              return (
                <tr key={index}>
                  <td className="max-w-[230px] truncate px-6 py-4 whitespace-nowrap">
                    {trans?.sender?.toLowerCase() === account ? "You" : trans?.sender}
                  </td>
                  <td className="max-w-[230px] truncate px-6 py-4 whitespace-nowrap">
                    {trans?.receiver?.toLowerCase() === account ? "You" : trans?.receiver}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{trans?.amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {trans?.timestamp}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TransactionHistory;
