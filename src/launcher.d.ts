declare module "getid-launcher" {
    declare const init: (
        containerId: string,
        skdKey: string,
        originCfg: PageSideConfig,
        ...args: any
    ) => void

    interface Profile {
        category: string
        value: string
    }

    interface Metadata {
        externalId: string
        labels: object
    }

    interface PageSideConfig {
        apiUrl: string
        sdkKey?: string
        apiKey?: string
        jwt?: string
        containerId?: string
        flow?: any
        flowName?: string
        metadata?: Metadata
        mode?: "popup" | "inline"
        onFail?: (code: string) => void
        onComplete?: (result: { id: string; responseCode: number }) => void
        profile?: Profile[]
        locale?: string
        customerId?: string
        injectCSS?: string
        htmlProperties?: {
            disableSwitchDevice: bool
            disableSwitchLocales: bool
            isPopUp: bool
        }
    }

    interface getLinkScriptResponse {
        responseCode: 400 | 200
        message?: string
        scriptLink?: string
    }

    interface GetidWebSdk {
        init: (config: object) => void
    }

    declare global {
        interface Window {
            getidWebSdk: GetidWebSdk
        }
    }

    export { PageSideConfig, getLinkScriptResponse, init }
}
