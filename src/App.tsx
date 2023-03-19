import * as React from 'react';
import './App.css';
import { getLang, getGPTApiKey, getRate, setGPTApiKey, setLang, setRate } from './storage';
import { Lang, langArray } from './types/interface';

const App: React.FC = () => {
  const [apiKey, setApiKeyLocal] = React.useState<string>('');
  const [lang, setLangLocal] = React.useState<Lang>(Lang.UnitedStates);
  const [rate, setRateLocal] = React.useState<number>(0);

  React.useEffect(() => {
    async function fetchDefaults() {
      const fetchedLang = await getLang();
      const fetchedApiKey = await getGPTApiKey();
      const fetchedRate = await getRate();

      setLangLocal(fetchedLang);
      setApiKeyLocal(fetchedApiKey);
      setRateLocal(fetchedRate);
    }

    fetchDefaults();
  }, [getLang, getGPTApiKey, getRate]);

  const handleSave = () => {
    setLang(lang);
    setGPTApiKey(apiKey);
    setRate(rate);
  };
  const handleClose = () => {
    window.close();
  };

  return (
    <div className="talk-guidance-gpt">
      <h1>TalkGuidanceGPT</h1>
      <div className="input-group">
        <label htmlFor="api-key">API Key:</label>
        <input
          type="text"
          id="api-key"
          value={apiKey}
          // @ts-ignore
          onChange={(e) => setApiKeyLocal(e.target.value)}
        />
      </div>
      <div className="input-group">
        <label htmlFor="lang">Language:</label>
        <select
          id="lang"
          value={lang}
          // @ts-ignore
          onChange={(e) => setLangLocal(e.target.value)}
        >
          {
            langArray.map(({label, value}) => (
              <option key={value} value={value}>{label}</option>
            ))
          }
        </select>
      </div>
      <div className="input-group">
        <label htmlFor="rate">Rate:</label>
        <input
          type="number"
          id="rate"
          min={0}
          max={3}
          value={rate}
          // @ts-ignore
          onChange={(e) => setRateLocal(parseFloat(e.target.value))}
        />
      </div>
      <div className="buttons">
        <button className="button save-button" onClick={handleSave}>Save</button>
        <button className="button close-button" onClick={handleClose}>Close</button>
      </div>
    </div>
  );
};

export default App;
