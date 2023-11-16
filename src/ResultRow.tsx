interface ResultRowProps {
  btc: string;
  provider: string;
}

function ResultRow({ btc, provider }: ResultRowProps) {
  return (
    <div className="p-4 my-2 rounded bg-gray-200/10">
      <div className="text-lg font-semibold text-white">
        {provider} : {btc}
      </div>
    </div>
  );
}

export default ResultRow;
