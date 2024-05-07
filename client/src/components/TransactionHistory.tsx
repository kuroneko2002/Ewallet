interface PropType {
  transaction: any;
}

const TransactionHistory = (props: PropType) => {
  const { transaction } = props;

  return (
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
        {transaction?.map((trans: any, index: number) => {
          console.log(trans);

          return (
            <tr key={index}>
              <td className="max-w-[230px] truncate px-6 py-4 whitespace-nowrap">
                {trans?.sender}
              </td>
              <td className="max-w-[230px] truncate px-6 py-4 whitespace-nowrap">
                {trans?.receiver}
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
  );
};

export default TransactionHistory;
