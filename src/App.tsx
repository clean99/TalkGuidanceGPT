import * as React from 'react';
import './App.css';
import { getLang, getGPTApiKey, getRate, setGPTApiKey, setLang, setRate, getEnabled, setEnabled } from './storage';
import { Lang, langArray } from './types/interface';
import { getTabId } from './utils/utils';

const App: React.FC = () => {
  const [apiKey, setApiKeyLocal] = React.useState<string>('');
  const [lang, setLangLocal] = React.useState<Lang>(Lang.UnitedKingdom);
  const [rate, setRateLocal] = React.useState<number>(0);
  const [enabled, setEnabledLocal] = React.useState(false);

  const handleToggle = () => {
    const newState = !enabled;
    setEnabledLocal(newState);
    if (newState) {
      setEnabledLocal(true);
    } else {
      setEnabledLocal(false);
    }
  };

  React.useEffect(() => {
    async function fetchDefaults() {
      const fetchedLang = await getLang();
      const fetchedApiKey = await getGPTApiKey();
      const fetchedRate = await getRate();
      const fetchedEnabled = await getEnabled();

      setLangLocal(fetchedLang);
      setApiKeyLocal(fetchedApiKey);
      setRateLocal(fetchedRate);
      setEnabledLocal(fetchedEnabled);
    }

    fetchDefaults();
  }, [getLang, getGPTApiKey, getRate]);

  const handleClose = () => {
    window.close();
  };

  const handleSave = async () => {
    setLang(lang);
    setGPTApiKey(apiKey);
    setRate(rate);
    setEnabled(enabled);
    chrome.tabs.sendMessage(await getTabId(), { action: enabled ? 'enable' : 'disable' });
    handleClose();
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
          placeholder="Enter your openai API Key"
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
      <div className='toggle-item'>
      <label htmlFor="toggle">Status:</label>
      <div className="toggle-container">
        <input
          type="checkbox"
          id="toggle"
          checked={enabled}
          onChange={handleToggle}
        />
        <label htmlFor="toggle" className="toggle-switch"></label>
      </div>
      </div>
      <div className="buttons">
        <button className="button close-button" onClick={handleClose}>Close</button>
        <button className="button save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default App;
