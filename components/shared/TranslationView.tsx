export function TranslationView({ english, kannadaMeaning, wordByWord }: { english: string, kannadaMeaning: string, wordByWord: string }) {
  return (
    <div className="space-y-4 p-4 border rounded-lg shadow-sm">
      <h3 className="s font-bold">Understanding</h3>
      <div>
        <h4 className="font-semibold">English Translation</h4>
        <p>{english}</p>
      </div>
      <div>
        <h4 className="font-semibold">Kannada Meaning</h4>
        <p>{kannadaMeaning}</p>
      </div>
      <div>
        <h4 className="font-semibold">Word-by-Word</h4>
        <pre className="s bg-gray-100 p-2 rounded">{wordByWord}</pre>
      </div>
    </div>
  );
}
