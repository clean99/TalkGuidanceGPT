import * as React from 'react';
import './App.css';
import { i18n, I18NMap, install } from './i18n/i18n';
import { chineseTranslations, englishTranslations, japaneseTranslations, spanishTranslations } from './i18n/translation';
import { getLang, getGPTApiKey, getRate, setGPTApiKey, setLang, setRate, getEnabled, setEnabled } from './storage';
import { Lang, langArray } from './types/interface';
import { getTabId } from './utils/utils';

const App: React.FC = () => {
  const [apiKey, setApiKeyLocal] = React.useState<string>('');
  const [lang, setLangLocal] = React.useState<Lang>(Lang.English);
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
    install(Lang.English, englishTranslations, I18NMap);
    install(Lang.Chinese, chineseTranslations, I18NMap);
    install(Lang.Japan, japaneseTranslations, I18NMap);
    install(Lang.Spain, spanishTranslations, I18NMap);
    install(Lang.Cantonese, chineseTranslations, I18NMap);
  }, [])

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
      <h1>{i18n('ui_title', lang)}</h1>
      <div className='link'>
        {i18n('ui_link_label', lang)} <a href="https://github.com/clean99/TalkGuidanceGPT" target="_blank" rel="noopener noreferrer">{i18n('ui_link_title', lang)}</a>
      </div>
      <div className="input-group">
        <label htmlFor="api-key">{i18n('ui_apikey_label', lang)}</label>
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
        <label htmlFor="lang">{i18n('ui_lang_label', lang)}</label>
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
        <label htmlFor="rate">{i18n('ui_rate_label', lang)}</label>
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
      <label htmlFor="toggle">{i18n('ui_status', lang)}</label>
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
        <button className="button close-button" onClick={handleClose}>{i18n('ui_close', lang)}</button>
        <button className="button save-button" onClick={handleSave}>{i18n('ui_save', lang)}</button>
      </div>
    </div>
  );
};

export default App;
