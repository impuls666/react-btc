import { useEffect, useState } from "react";
import Input from "./Input";
import ResultRow from "./ResultRow";
import axios from "axios";

interface results {
  btc: string;
  provider: string;
}

function App() {
  const [amount, setAmount] = useState("");
  const [results, setResults] = useState<results[]>([]);

  useEffect(() => {
    axios.get("https://pcxcnmh4dh.us.aircode.run/cachedValues").then((res) => {
      if (Array.isArray(res.data)) {
        setResults(res.data);
      } else {
        console.error("Invalid data format received from the API.");
        console.log(res);
      }
    });
  }, []);
  return (
    <main>
      <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <div className="mt-6">
        {results.map((result, index) => (
          <ResultRow provider={result.provider} key={index} btc={result.btc} />
        ))}
      </div>
    </main>
  );
}

export default App;
