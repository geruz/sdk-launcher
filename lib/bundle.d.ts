type GetIdWebSdkComponent = {
  unmount: () => void;
  changeThemeMode: (theme: 'dark' | 'light') => void;
  sdkVersion?: string
}
declare const init: (config: PageSideConfig) => Promise<GetIdWebSdkComponent>;

type Category = 'First name' | 'Last name' | 'Date of birth' | 'Address' | 'Date of expiry' | 'Date of issue' | 'Document number' | 'Gender' | 'Nationality' | 'Personal number'

interface ProfileFormCustom {
  category: Category,
  value: string
  contentType: 'string' | 'country' | 'date' | 'boolean'
}

interface ProfileForm {
  category: Category,
  value: string
}

interface Metadata {
  externalId: string,
  labels?: {
    [labelName: string]: string
  }
}
interface JwtAuthorization extends MainPageSideConfig{
  jwt: string,
}

interface SdkKyeAuthorization extends MainPageSideConfig{
  sdkKey: string,
}

type PageSideConfig = JwtAuthorization | SdkKyeAuthorization;

type OnVerificationComplete = ((x: {[key: string]: any}) => void) | null

type AcceptableDocuments = ((x: CountryDocumentTypes[]) => CountryDocumentTypes[]) | null

type CountryDocumentTypes = {
  country: string,
  documentTypes: SupportedDocumentType[]
}

type SupportedDocumentType = 'passport' | 'id-card, driving-licence' | 'residence-permit' | 'voter-card' | 'tax-card' | 'address-card'

type PoaParsedAddress = {
  /**
   * Alpha3 code format is acceptable
   */
  country: string;
  city?: string;
  postcode: string;
  addressLine: string;
};

type FatalErrorCode =
  | 'fail_to_load_translations'
  | 'apiurl_mismatch'
  | 'token_mismatch'
  | 'browser_not_supported'
  | 'no_camera'
  | 'token_expired'

type ErrorCode =
  | 'internal'
  | 'sdkkey_invalid'
  | 'configuration_not_found'
  | 'token_malformed'
  | 'schema_mismatch'
  | 'api_version_mismatch'
  | 'token_invalid'
  | 'token_expired'
  | 'customerid_exists'
  | 'camera_not_allowed'
  | 'camera_generic'
  | 'file_type'
  | 'verification_fail'
  | 'bad_request'
  | 'server_unavailable'
  | FatalErrorCode

type FlowEvent = 'verificationFlowStart';
type FlowEventType = {
  name: FlowEvent;
  payload?: string | number | boolean;
}

interface MainPageSideConfig {
  apiUrl: string,
  containerId: string,
  flowName: string,
  metadata?: Metadata,
  mode?: 'popup' | 'inline',
  onBack?: () => void,
  onFail?: (err: {code: ErrorCode | string, message: string}) => void,
  onComplete?: (result: {applicationId: string, responseCode: number}) => void,
  onVerificationComplete?: OnVerificationComplete,
  acceptableDocuments?: AcceptableDocuments,
  onFatalError?: (code: FatalErrorCode) => void
  onFlowEvent?: (event: FlowEventType) => void,
  profile?: Array<ProfileForm | ProfileFormCustom>
  locale?: string,
  customerId?: string,
  injectCSS?: string,
  dictionary?: string,
  htmlProperties?: {
    disableSwitchDevice: boolean,
  },
  styles?: {
    [variableName: string]: string
  }
  themeMode?: 'dark' | 'light'
  address?: PoaParsedAddress,
  experimentalKey?: string
}

interface getLinkScriptResponse {
  responseCode: 400 | 200
  message?: string,
  scriptLink?: string,
}

interface GetidWebSdk {
  init: (config: PageSideConfig) => Promise<GetIdWebSdkComponent>
}

declare global {
  interface Window {
    getidWebSdk: GetidWebSdk
  }
}

export { FlowEvent, FlowEventType, GetIdWebSdkComponent, PageSideConfig, PoaParsedAddress, getLinkScriptResponse, init };
