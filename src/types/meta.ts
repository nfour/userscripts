export type INonEmptyString = string;
export type IMultiString = INonEmptyString | INonEmptyString[];

export interface IMetaSchema {
  name: INonEmptyString;
  description?: string;
  namespace: INonEmptyString;
  version: INonEmptyString;
  downloadURL?: INonEmptyString;
  updateURL?: INonEmptyString;
  icon?: INonEmptyString;
  include?: IMultiString;
  exclude?: IMultiString;
  match?: IMultiString;
  require?: IMultiString;
  resource?: IMultiString;
  grant?: (
    Array<
      | 'unsafeWindow'
      | 'GM_getValue'
      | 'GM_setValue'
      | 'GM_listValues'
      | 'GM_deleteValue'
      | 'GM_getResourceText'
      | 'GM_getResourceURL'
      | 'GM_addStyle'
      | 'GM_log'
      | 'GM_openInTab'
      | 'GM_registerMenuCommand'
      | 'GM_setClipboard'
      | 'GM_xmlhttpRequest'
    >
    | 'none'
  );
  'run-at'?: 'document-end' | 'document-start' | 'document-idle';
  noframes?: boolean;
  [k: string]: IMultiString | boolean | undefined;
}
