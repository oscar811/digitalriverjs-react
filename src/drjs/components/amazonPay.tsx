import {useEffect} from 'react';
import {useDigitalRiverContext, usePaymentContext} from "../../digitalriver";
import {
    DigitalRiverButtonElement,
    ElementClasses,
    ElementEventArgument,
    ElementSourceEventArgument,
} from "../../types";

const PAYMENT_METHOD_TYPE = 'amazonpay';
let amazonpay: DigitalRiverButtonElement | null = null;

/**
 * `AmazonPay` is a component for rendering the AmazonPay component.
 * It provides a method to create a source for the payment.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/amazon-pay-element
 *
 * @param {AmazonPayProps} props - The properties that define the behavior of the AmazonPay component.
 * @param {string} props.elementId - The ID of the HTML element where the AmazonPay component will be mounted.
 * @param {string} props.resultReturnUrl - The return URL for the payment result.
 * @param {string} [props.sessionId] - The session ID for the payment.
 * @param {string} [props.country] - The country for the payment.
 * @param {string} [props.returnUrl] - The return URL for the payment.
 * @param {string} [props.cancelUrl] - The cancel URL for the payment.
 * @param {AmazonPayPlacement} [props.placement=AmazonPayPlacement.Cart] - The placement for the AmazonPay component.
 * @param {string} [props.checkoutLanguage] - The language for the checkout.
 * @param {AmazonPayOptions} [props.amazonPayConfiguration] - The configuration options for the AmazonPay component.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the AmazonPay component is ready.
 * @param {function} [props.onSuccess=()=>{}] - The function to be called when the payment is successful.
 * @param {function} [props.onError=()=>{}] - The function to be called when there is an error.
 *
 * @returns {JSX.Element} A span element with the specified ID.
 */
export const AmazonPay = ({
                              elementId = "dr-amazon-pay",
                              resultReturnUrl,
                              sessionId,
                              country,
                              currency,
                              returnUrl,
                              cancelUrl,
                              placement = AmazonPayPlacement.Cart,
                              checkoutLanguage,
                              amazonPayConfiguration,
                              onReady = () => {
                              },
                              onError = () => {
                              },
                              onSuccess = () => {
                              },
                          }: AmazonPayProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const paymentComponent = usePaymentContext();

    /**
     * Function to render the AmazonPay component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);

        if (!amazonpay && drContext.digitalRiver && placeholder && !drContext.elements[PAYMENT_METHOD_TYPE]) {
            try {
                let amazonPayOption = {
                    sourceData: {
                        type: 'amazonPay',
                        sessionId: sessionId,
                        country: country,
                        currency: currency,
                        amazonPay: {
                            returnUrl: returnUrl,
                            cancelUrl: cancelUrl,
                            resultReturnUrl: resultReturnUrl,
                            placement: placement,
                            checkoutLanguage: checkoutLanguage,
                        }
                    }
                };

                if (paymentComponent) {
                    if (paymentComponent.sessionId) {
                        amazonPayOption.sourceData.sessionId = paymentComponent.sessionId;
                    }
                    if (paymentComponent.country) {
                        amazonPayOption.sourceData.country = paymentComponent.country;
                    }
                    if (paymentComponent.returnUrl) {
                        amazonPayOption.sourceData.amazonPay.returnUrl = paymentComponent.returnUrl;
                    }
                    if (paymentComponent.cancelUrl) {
                        amazonPayOption.sourceData.amazonPay.cancelUrl = paymentComponent.cancelUrl;
                    }
                    if (!amazonPayOption.sourceData.country) {
                        amazonPayOption.sourceData.country = paymentComponent.country;
                    }
                    if (!amazonPayOption.sourceData.currency) {
                        amazonPayOption.sourceData.currency = paymentComponent.currency;
                    }
                }

                amazonPayOption = Object.assign(amazonPayOption, amazonPayConfiguration);

                amazonpay = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, amazonPayOption) as DigitalRiverButtonElement;

                amazonpay.mount(elementId);
                amazonpay.on('ready', onReady);
                amazonpay.on('source', onSuccess);
                drContext.setElement(PAYMENT_METHOD_TYPE, amazonpay);

            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
                onError(e);
            }
        }
    }

    /**
     * Function to clear the AmazonPay component.
     */
    const clear = () => {
        const placeholder = document.getElementById(elementId);
        if (amazonpay) {
            amazonpay.destroy();
        }
        if (placeholder) {
            placeholder.replaceChildren();
        }
        drContext.removeElement(PAYMENT_METHOD_TYPE);
        amazonpay = null;
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
 * @typedef AmazonPayProps
 * @property {string} elementId - The ID of the HTML element where the AmazonPay component will be mounted.
 * @property {string} resultReturnUrl - The return URL for the payment result.
 * @property {string} sessionId - The session ID for the payment.
 * @property {string} country - The country for the payment.
 * @property {string} returnUrl - The return URL for the payment.
 * @property {string} cancelUrl - The cancel URL for the payment.
 * @property {AmazonPayPlacement} placement - The placement for the AmazonPay component.
 * @property {string} checkoutLanguage - The language for the checkout.
 * @property {AmazonPayOptions} amazonPayConfiguration - The configuration options for the AmazonPay component.
 * @property {function} onReady - The function to be called when the AmazonPay component is ready.
 * @property {function} onSuccess - The function to be called when the payment is successful.
 * @property {function} onError - The function to be called when there is an error.
 */
export interface AmazonPayProps {
    elementId?: string | undefined;
    resultReturnUrl: string;
    sessionId?: string;
    country?: string;
    currency?: string;
    returnUrl?: string;
    cancelUrl?: string;
    placement?: AmazonPayPlacement | string;
    checkoutLanguage?: string;
    amazonPayConfiguration?: AmazonPayOptions;

    onReady?(data: ElementEventArgument): void;

    onSuccess?(source: ElementSourceEventArgument): void;

    onError?(error: Error | any): void;
}

/**
 * @typedef AmazonPayOptions
 * @property {Object} style - The style options for the AmazonPay component.
 * @property {ElementClasses} classes - The classes for the AmazonPay component.
 * @property {Object} sourceData - The source data for the AmazonPay component.
 */
export interface AmazonPayOptions {
    style?: {
        color?: string;
        height?: string;
    };
    classes?: ElementClasses | any;
    sourceData?: {
        type: string;
        sessionId: string;
        country: string;
        amazonPay: {
            returnUrl: string;
            resultReturnUrl: string;
            cancelUrl: string;
            placement: AmazonPayPlacement;
            checkoutLanguage?: string;
        }
    }
}

/**
 * @enum {string}
 * @readonly
 */
export enum AmazonPayPlacement {
    Home = 'Home',
    Cart = 'Cart',
    Product = 'Product',
    Checkout = 'Checkout',
    Other = 'Other',
}
