import {CheckoutSession, CheckoutSessionLink, DigitalRiverComponent, DigitalRiverComponentObject,} from "../../types";
import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";


const ComponentsInnerContext = React.createContext({});


export const Components = ({
                               checkoutSessionLink,
                               redirectUrl,
                               onReady = () => {
                               },
                               onChange = () => {
                               },
                               onSuccess = () => {
                               },
                               options,
                               children
                           }: ComponentProp) => {
    const drContext = useDigitalRiverContext();
    const [components, setComponents] = React.useState<DigitalRiverComponentObject | null>();

    useEffect(() => {
        //Clear DRFID/DRSID cookie
        document.cookie = getCookie('DRSID', '', '/', 'Thu, 01 Jan 1970 00:00:01 GMT', 'None', true); //`DRSID=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure`;
        document.cookie = getCookie('DRFID', '', '/', 'Thu, 01 Jan 1970 00:00:01 GMT', 'None', true); //`DRFID=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure`;
        document.cookie = getCookie('DRSID', '', undefined, 'Thu, 01 Jan 1970 00:00:01 GMT', undefined, false);//`DRSID=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;
        document.cookie = getCookie('DRFID', '', undefined, 'Thu, 01 Jan 1970 00:00:01 GMT', undefined, false);//`DRFID=; expires=Thu, 01 Jan 1970 00:00:01 GMT`;


    }, []);

    useEffect(() => {
        if (drContext.digitalRiver && checkoutSessionLink) {
            const initComponents = async () => {
                if (checkoutSessionLink) {
                    //document.cookie = `DRSID=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure`;
                    if (checkoutSessionLink.id) {
                        document.cookie = getCookie('DRSID', checkoutSessionLink.id, '/', '0', 'None', true); //`DRSID=${checkoutSessionLink.id}; path=/; expires=0; SameSite=None; Secure`;
                    } else {
                        return;
                    }

                    if (localStorage.getItem(`DRCSL-${checkoutSessionLink.id}`)) {
                        const fingerprint = localStorage.getItem(`DRCSL-${checkoutSessionLink.id}`);
                        if (fingerprint) {
                            document.cookie = getCookie('DRFID', fingerprint, '/', '0', 'None', true);
                        }
                    }
                    //document.cookie = `DRFID=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=None; Secure`;
                    if (checkoutSessionLink.fingerprint) {
                        document.cookie = getCookie('DRFID', checkoutSessionLink.fingerprint, '/', '0', 'None', true); //`DRFID=${checkoutSessionLink.fingerprint}; path=/; expires=0; SameSite=None; Secure`;
                        //localStorage.setItem(`DRCSL-${checkoutSessionLink.id}`, checkoutSessionLink.fingerprint);
                    } else {
                        const response = await fetch(`https://api.digitalriver.com/drop-in/checkout-sessions/${checkoutSessionLink.id}`, {
                            headers: {Authorization: `Bearer ${drContext.publicApiKey}`},
                            method: "GET"
                        });
                        const checkoutSession: CheckoutSession = await response.json();
                        if (checkoutSession.fingerprint) {
                            document.cookie = getCookie('DRFID', checkoutSession.fingerprint, '/', '0', 'None', true);//`DRFID=${checkoutSession.fingerprint}; path=/; expires=0; SameSite=None; Secure`;
                            //localStorage.setItem(`DRCSL-${checkoutSessionLink.id}`, checkoutSession.fingerprint);
                            checkoutSessionLink.fingerprint = checkoutSession.fingerprint;
                        }
                    }
                    localStorage.setItem('DRCSL', JSON.stringify(checkoutSessionLink));
                } else {
                    try {
                        const DRCSL = localStorage.getItem('DRCSL');
                        if (DRCSL) {
                            checkoutSessionLink = JSON.parse(DRCSL);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                }
                if (checkoutSessionLink) {
                    const _components = drContext.digitalRiver.components({
                        checkoutSessionId: checkoutSessionLink.id,
                        redirectUrl: redirectUrl,
                        options: options,
                        onReady: onReady,
                        onChange: onChange,
                        onSuccess: onSuccess
                    });
                    setComponents(_components);
                }
            }
            initComponents();
        }
    }, [drContext.digitalRiver, checkoutSessionLink]);

    const getCookie = (name: string, value: string | undefined | null = undefined, path: string | undefined | null = undefined, expires: string | undefined | null = undefined, sameSite: string | undefined | null = undefined, secure: boolean = true) => {
        return `${name}=${value ? value : ''}; ${path ? `path=${path}; ` : ''}${expires ? `expires=${expires}; ` : ''}${sameSite ? `SameSite=${sameSite}; ` : ''}${secure ? `Secure; ` : ''}`;
    }

    const done = async (type: ComponentTypeSupportedDone) => {
        const component = drContext.elements[type] as DigitalRiverComponent;
        if (component) {
            return component.done();
        }
    }

    const sharedState = {
        components,
        done
    };
    return (
        <ComponentsInnerContext.Provider value={sharedState}>
            {children}
        </ComponentsInnerContext.Provider>
    )
}

export enum ComponentTypeSupportedDone {
    Address = 'address',
    TaxIdentifier = 'taxidentifier',
    Shipping = 'shipping',
    InvoiceAttribute = 'invoiceattribute',
}

export const useComponentsContext = () => {
    return React.useContext(ComponentsInnerContext) as ComponentsContext;
}

export type ComponentsContext = {
    components: DigitalRiverComponentObject;
    done(type: ComponentTypeSupportedDone): Promise<boolean>;
}

export interface ComponentProp {
    checkoutSessionLink: CheckoutSessionLink | undefined | null;
    redirectUrl?: string | undefined | null;
    options?: {
        button?: {
            type?: string;
        }
    };
    children?: React.ReactElement | React.ReactElement[];

    onReady?(data: CheckoutSession): void;

    onChange?(data: CheckoutSession): void;

    onSuccess?(data: ComponentSuccessResponse): void;
}

export interface ComponentConfiguration {
    checkoutSessionId: string;
    redirectUrl?: string | null | undefined;
    options?: {
        button?: {
            type?: string;
        }
    };

    onReady?(data: CheckoutSession): void;

    onChange?(data: CheckoutSession): void;

    onSuccess?(data: ComponentSuccessResponse): void;


    onError?(data: any): void;
}

export interface ComponentProps {
    elementId?: string;
    //checkoutSession?: CheckoutSession;
}

export interface ComponentSuccessResponse {
    delayedPaymentInstructions?: {
        sourceClientSecret: string;
        sourceId: string;
    }
    order?: any;
}

