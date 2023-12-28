import {useEffect} from 'react';
import {useDigitalRiverContext} from "../digitalriver";
import {AddressEntry, DigitalRiverElement, ErrorResponse, PaymentSourceData, StyleOption} from "../types";

const PAYMENT_METHOD_TYPE = 'dropin';
let dropin: DigitalRiverElement | null = null;

/**
 * `DropIn` is a component for rendering the Drop-in component.
 * It provides a method to create a source for the payment.
 *
 * @component
 * @see https://docs.digitalriver.com/commerce-api/payment-integrations-1/drop-in/drop-in-integration-guide
 *
 * @param {DropInProps} props - The properties that define the behavior of the DropIn component.
 * @param {string} [props.elementId='dr-dropin'] - The ID of the HTML element where the DropIn component will be mounted.
 * @param {DropInOptions} props.dropInConfiguration - The configuration options for the DropIn component.
 *
 * @returns {JSX.Element} A span element with the specified ID.
 */
export const DropIn = ({
                           elementId = "dr-dropin",
                           dropInConfiguration
                       }: DropInProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Drop-in component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!dropin && drContext.digitalRiver && placeholder && !drContext.elements[PAYMENT_METHOD_TYPE]) {
            try {
                dropin = drContext.digitalRiver.createDropin(dropInConfiguration);
                dropin.mount(elementId);
                drContext.setElement(PAYMENT_METHOD_TYPE, dropin);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Drop-in component.
     */
    const clear = () => {
        const placeholder = document.getElementById(elementId);
        if (placeholder) {
            placeholder.replaceChildren();
        }
        drContext.removeElement(PAYMENT_METHOD_TYPE);
        dropin = null;
    }

    useEffect(() => {
        if (drContext.digitalRiver) {
            render();
        }
    }, [drContext.digitalRiver]);


    useEffect(() => {
        return () => {
            clear();
        }
    }, []);


    return (
        <span id={elementId}/>
    );
}


/**
 * The flow using Drop-in.
 * @type {Object}
 * @property {Object} DropInFlow
 * @property {string} DropInFlow.Checkout - Use this option if you are using Drop-in within a standard checkout flow.
 * @property {string} DropInFlow.ManagePaymentMethods - Use this option to specify a different Drop-in mode of operation. Enable this flow if you are using Drop-in as part of a My Account page where your customer is managing their stored payment methods.
 * @see https://docs.digitalriver.com/commerce-api/payment-integrations-1/drop-in/drop-in-integration-guide#drop-in-options
 */
export enum DropInFlow {
    Checkout = 'checkout',
    ManagePaymentMethods = 'managePaymentMethods'
}

/**
 * Specifying a source's future use.
 * @type {Object}
 * @property {Object} DropInUsage
 * @property {string} DropInUsage.Subscription
 * @property {string} DropInUsage.Convenience
 * @property {string} DropInUsage.Unscheduled
 * @see https://docs.digitalriver.com/commerce-api/payment-integrations-1/drop-in/drop-in-integration-guide#specifying-a-sources-future-use
 */
export enum DropInUsage {
    Default = '',
    Subscription = 'subscription',
    Convenience = 'convenience',
    Unscheduled = 'unscheduled',
}


/**
 * Customizing the Drop-in button text
 * @type {Object}
 * @property {Object} DropInButtonType
 * @property {string} DropInButtonType.PayNow
 * @property {string} DropInButtonType.BuyNow
 * @property {string} DropInButtonType.CompleteOrder
 * @property {string} DropInButtonType.SubmitOrder
 * @property {string} DropInButtonType.Custom
 * @see https://docs.digitalriver.com/commerce-api/payment-integrations-1/drop-in/drop-in-integration-guide#customizing-the-drop-in-button-text
 */
export enum DropInButtonType {
    PayNow = 'payNow',
    BuyNow = 'buyNow',
    CompleteOrder = 'completeOrder',
    SubmitOrder = 'submitOrder',
    Custom = 'custom',
}


export interface DropInProps {
    elementId?: string;
    dropInConfiguration: DropInOptions
}

export interface DropInOptions {
    sessionId: string;
    options: {
        button?: {
            type?: DropInButtonType;
            buttonText?: string;
        }
        flow?: DropInFlow;
        usage?: DropInUsage;
        showComplianceSection?: boolean;
        showSavePaymentAgreement?: boolean;
        showTermsOfSaleDisclosure?: boolean;
        redirect: {
            disableAutomaticRedirects?: boolean;
            returnUrl: string;
            cancelUrl: string;
        }
        showConsents?: boolean;
        consents?: {
            companyName?: string;
            eula?: {
                url: string;
            }
            termsOfUse?: {
                url: string;
            }
        }
    },
    paymentMethodConfiguration?: {
        enabledPaymentMethods?: string[];
        disabledPaymentMethods?: string[];
        style?: StyleOption;
    },
    billingAddress?: AddressEntry;

    onSuccess?(source: PaymentSourceData): void;

    onError?(error: DropInOnErrorArgument): void;

    onReady?(data: DropInOnReadyArgument): void;

    onCancel?(data: DropInOnCancelArgument): void;
}

export interface DropInOnErrorArgument {
    errors: ErrorResponse;
}

export interface DropInOnReadyArgument {
    paymentMethodTypes?: [string];
}

export interface DropInOnCancelArgument {
    paymentMethod: string;
}
