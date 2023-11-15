interface ResultRowProps {
  btc: string;
  provider: string;
}

function ResultRow({ btc, provider }: ResultRowProps) {
  return (
    <div>
      <div>
        {provider} : {btc}
      </div>
    </div>
  );
}

export default ResultRow;
