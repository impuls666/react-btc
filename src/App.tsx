import { useEffect, useState } from "react";
import Input from "./Input";
import ResultRow from "./ResultRow";
import axios from "axios";
import useDebouncedEffect from "use-debounced-effect";

const CACHED_API_URL = "https://pcxcnmh4dh.us.aircode.run/cachedValues";
const NEW_API_URL = "https://pcxcnmh4dh.us.aircode.run/offers";

interface Result {
  btc: string;
  provider: string;
}

interface CachedResult {
  provider: string;
  btc: string;
}

const defaultAmount = "100";

function App() {
  const [prevAmount, setPrevAmount] = useState(defaultAmount);
  const [amount, setAmount] = useState("100");
  const [cachedResults, setCachedResults] = useState<CachedResult[]>([]);
  const [offerResults, setOfferResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(CACHED_API_URL).then((res) => {
      setCachedResults(res.data);
      setLoading(false);
    });
  }, []);

  useDebouncedEffect(
    () => {
      if (amount === defaultAmount) {
        return;
      }
      if (amount !== prevAmount) {
        setLoading(true);
        try {
          axios.get(`${NEW_API_URL}?amount=${amount}`).then((res) => {
            setLoading(false);
            const newResults = Object.keys(res.data).map((provider) => ({
              provider,
              btc: res.data[provider],
            }));
            setOfferResults(newResults);
            setPrevAmount(amount);
          });
        } catch (error) {
          console.error("Error fetching new data:", error);
        } finally {
          setLoading(false);
        }
      }
    },
    500,
    [amount]
  );

  const showCached = amount === defaultAmount;
  const rows = showCached ? cachedResults : offerResults;

  return (
    <main>
      <Input
        value={amount}
        onChange={({ target: { value } }) => setAmount(value)}
      />
      <div className="mt-6 text-center">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div>
              {!loading &&
                rows.map((result) => (
                  <ResultRow
                    key={result.provider}
                    provider={result.provider}
                    btc={result.btc}
                  />
                ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default App;
