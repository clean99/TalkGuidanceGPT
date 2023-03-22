import { Lang } from '../../types/interface';
import { chineseTranslations, englishTranslations, spanishTranslations } from '../translation';
import { I18NMap, i18n, install } from '../i18n';

describe('i18n', () => {
  describe('Chinese', () => {
    beforeEach(() => {
      I18NMap.clear();
      install(Lang.English, englishTranslations, I18NMap);
      install(Lang.Chinese, chineseTranslations, I18NMap);
    });
  
    it('should return fallback when key is not found', () => {
      expect(i18n('nonexistent_key', Lang.Chinese)).toEqual('nonexistent_key');
    });
  
  
    it('should return fallback when value is not found', () => {
      const map = new Map<Lang, string>();
      I18NMap.set('no_value', map);
      expect(i18n('no_value', Lang.Chinese)).toEqual('no_value');
    });
  
    it('should return value when key is found', () => {
      expect(i18n('ui_apikey_label', Lang.Chinese)).toEqual('API 密钥：');
    });
  })

  describe('Spain', () => {
    beforeEach(() => {
      I18NMap.clear();
      install(Lang.Spain, spanishTranslations, I18NMap);
    });

    it('should return key when lang is wrong', () => {
      expect(i18n('ui_apikey_label', Lang.Chinese)).toEqual('ui_apikey_label');
    });

    it('should return value when key is found', () => {
      expect(i18n('ui_apikey_label', Lang.Spain)).toEqual('Clave API:');
    });
  });
});
