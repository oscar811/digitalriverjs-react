import * as React from 'react';
import type {
    DigitalRiver,
    DigitalRiverCheckout,
    DigitalRiverCheckoutObject,
    DigitalRiverContext,
    DigitalRiverElement,
    DigitalRiverObject,
    DigitalRiverProps,
    DynamicPricingObject
} from "../types";
import {ElementsMap} from "../types";

// URLs for Digital River JS and CSS files
const DRJS_JS_URL = "https://js.digitalriverws.com/v1/DigitalRiver.js";
const DRJS_CSS_URL = "https://js.digitalriverws.com/v1/css/DigitalRiver.css";
const PREBUILT_CHECKOUT_JS_URL = "https://checkout.digitalriverws.com/v1/DigitalRiverCheckout.js";
const DYNAMIC_PRICING_JS_URL = "https://js.digitalriverws.com/v1/DynamicPricing.js";
const DYNAMIC_PRICING_CSS_URL = "https://js.digitalriverws.com/v1/css/DynamicPricing.css";

// Global instances of Digital River objects
let digitalRiverInstance: DigitalRiverObject | null = null;
let drjs_script: HTMLScriptElement | null = null;
let drjs_link: HTMLLinkElement | null = null;

let digitalRiverCheckoutInstance: DigitalRiverCheckoutObject | null = null;
let pbc_script: HTMLScriptElement | null = null;
let dp_script: HTMLScriptElement | null = null;
let dp_link: HTMLLinkElement | null = null;

// Create a new context for Digital River
const DigitalRiverInnerContext = React.createContext({});

/**
 * `DigitalRiverContainer` is a context provider for the Digital River API.
 * It initializes the Digital River API, Digital River Checkout, and Dynamic Pricing based on the provided public API key and other props.
 * It also manages the lifecycle of Digital River elements and components.
 *
 * @param {DigitalRiverProps} props - The properties that define the behavior of the Digital River Container.
 * @param {string} props.publicApiKey - The public API key for the Digital River API.
 * @param {string} [props.locale='en-us'] - The locale to be used by the Digital River API. Defaults to 'en-us'.
 * @param {string|null} [props.defaultCountry=null] - The default country to be used by the Digital River API.
 * @param {boolean} [props.enableDigitalRiver=true] - A flag to enable or disable the Digital River API. Defaults to true.
 * @param {boolean} [props.enableDigitalRiverCheckout=false] - A flag to enable or disable the Digital River Checkout. Defaults to false.
 * @param {boolean} [props.enableDynamicPricing=false] - A flag to enable or disable Dynamic Pricing. Defaults to false.
 * @param {string} [props.currencySelectorElementId='DR-currencySelector'] - The ID of the HTML element where the currency selector will be mounted. Defaults to 'DR-currencySelector'.
 * @param {React.ReactElement | React.ReactElement[]} [props.children] - The child components to be rendered within this context.
 *
 * @returns {JSX.Element} A context provider wrapping the children components.
 */
export const DigitalRiverContainer = ({
                                          publicApiKey,
                                          locale = 'en-us',
                                          defaultCountry = null,
                                          enableDigitalRiver = true,
                                          enableDigitalRiverCheckout = false,
                                          enableDynamicPricing = false,
                                          currencySelectorElementId = 'DR-currencySelector',
                                          children
                                      }: DigitalRiverProps): JSX.Element => {
    // State hooks for Digital River objects
    const [digitalRiver, setDigitalRiver] = React.useState<DigitalRiverObject | null>();
    const [digitalRiverCheckout, setDigitalRiverCheckout] = React.useState<DigitalRiverCheckoutObject | null>();
    const [dynamicPricing, setDynamicPricing] = React.useState<DynamicPricingObject | null>();
    const [elements, setElements] = React.useState<ElementsMap>({});

    const [guid, setGuid] = React.useState('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8;
        return v.toString(16);
    }))

    React.useEffect(() => {
        return () => {
            if (drjs_script) {
                document.head.removeChild(drjs_script);
                drjs_script = null;
            }
            if (drjs_link) {
                document.head.removeChild(drjs_link);
                drjs_link = null;
            }
            if (pbc_script) {
                document.head.removeChild(pbc_script);
                pbc_script = null;
            }
            if (dp_script) {
                document.head.removeChild(dp_script);
                dp_script = null;
            }
            if (dp_link) {
                document.head.removeChild(dp_link);
                dp_link = null;
            }

        }
    }, []);

    // React.useEffect(() => {
    //     if(digitalRiverInstance) {
    //         setDigitalRiver(digitalRiverInstance);
    //     }
    //     if(digitalRiverCheckoutInstance) {
    //         setDigitalRiverCheckout(digitalRiverCheckoutInstance);
    //     }
    // },[digitalRiverInstance, digitalRiverCheckoutInstance]);

    // Clear all instances when props change
    React.useEffect(() => {
        clear();
    }, [publicApiKey, locale, defaultCountry, enableDigitalRiver, enableDigitalRiverCheckout, enableDynamicPricing]);

    // Initialize Digital River when enabled and public API key is provided
    React.useEffect(() => {
        if (enableDigitalRiver && !digitalRiver && publicApiKey) {
            if (!drjs_link) {
                drjs_link = document.createElement('link');
                drjs_link.rel = "stylesheet";
                drjs_link.type = "text/css";
                drjs_link.href = DRJS_CSS_URL;
                document.head.appendChild(drjs_link);
            }
            if (!drjs_script) {
                drjs_script = document.createElement('script');
                drjs_script.src = DRJS_JS_URL;
                drjs_script.async = true;
                drjs_script.onload = initDigitalRiver;
                document.head.appendChild(drjs_script);

                return;
            } else {
                initDigitalRiver();
            }
        }
        return;
    }, [enableDigitalRiver, publicApiKey]);

    // Initialize Digital River Checkout when enabled and public API key is provided
    React.useEffect(() => {
        if (enableDigitalRiverCheckout && !digitalRiverCheckout && publicApiKey) {
            if (!drjs_link) {
                drjs_link = document.createElement('link');
                drjs_link.rel = "stylesheet";
                drjs_link.type = "text/css";
                drjs_link.href = DRJS_CSS_URL;
                document.head.appendChild(drjs_link);
            }
            if (!pbc_script) {
                pbc_script = document.createElement('script');
                pbc_script.src = PREBUILT_CHECKOUT_JS_URL;
                pbc_script.async = true;
                pbc_script.onload = initDigitalRiverCheckout;
                document.head.appendChild(pbc_script);

                return;
            } else {
                initDigitalRiverCheckout();
            }
        }
        return;
    }, [enableDigitalRiverCheckout, publicApiKey]);

    // Initialize Dynamic Pricing when enabled and public API key is provided
    React.useEffect(() => {
        if (enableDynamicPricing && !dynamicPricing && publicApiKey) {
            if (!dp_link) {
                dp_link = document.createElement('link');
                dp_link.rel = "stylesheet";
                dp_link.type = "text/css";
                dp_link.href = DYNAMIC_PRICING_CSS_URL;
                document.head.appendChild(dp_link);
            }
            if (!dp_script) {
                dp_script = document.createElement('script');
                dp_script.src = DYNAMIC_PRICING_JS_URL;
                dp_script.async = true;
                dp_script.setAttribute('data-dr-apiKey', publicApiKey);
                dp_script.setAttribute('data-dr-currency-selector', currencySelectorElementId);
                dp_script.onload = initDynamicPricing;
                if (defaultCountry) {
                    dp_script.setAttribute('data-dr-default-country', defaultCountry);
                }
                document.head.appendChild(dp_script);
                return;
            }
        }
        return;
    }, [enableDynamicPricing, publicApiKey]);

    // Function to initialize Digital River
    const initDigitalRiver = () => {
        const DigitalRiverConstructor = (window as any).DigitalRiver as DigitalRiver;
        if (publicApiKey && DigitalRiverConstructor) {
            digitalRiverInstance = new DigitalRiverConstructor(publicApiKey, {locale: locale});
            setDigitalRiver(digitalRiverInstance);
        } else {
            const timeId = setInterval(() => {
                if (digitalRiverInstance) {
                    if (!digitalRiver) {
                        setDigitalRiver(digitalRiverInstance);
                    }
                    clearInterval(timeId);
                }
            }, 50);
        }
    }

    // Function to initialize Digital River Checkout
    const initDigitalRiverCheckout = () => {
        const DigitalRiverCheckoutConstructor = (window as any).DigitalRiverCheckout as DigitalRiverCheckout;
        if (publicApiKey && DigitalRiverCheckoutConstructor) {
            digitalRiverCheckoutInstance = new DigitalRiverCheckoutConstructor(publicApiKey);
            setDigitalRiverCheckout(digitalRiverCheckoutInstance);
        } else {
            const timeId = setInterval(() => {
                if (digitalRiverCheckoutInstance) {
                    if (!digitalRiverCheckout) {
                        setDigitalRiverCheckout(digitalRiverCheckoutInstance);
                    }
                    clearInterval(timeId);
                }
            }, 50);
        }
    }

    const initDynamicPricing = () => {

        const DynamicPricingContstructor = (window as any).DynamicPricing;
        if (DynamicPricingContstructor) {
            setDynamicPricing(DynamicPricingContstructor);
        }
    }

    // Function to clear all instances
    const clear = () => {
        if (enableDigitalRiver) {
            setDigitalRiver(null);
        }
        if (enableDigitalRiverCheckout) {
            setDigitalRiverCheckout(null);
        }
        if (enableDynamicPricing) {
            setDynamicPricing(null);
        }
    }

    // Function to remove an element from the elements map
    const removeElement = (name: string) => {
        delete elements[name];
        setElements(elements);
    }
    // Function to add an element to the elements map
    const setElement = (name: string, element: DigitalRiverElement) => {
        elements[name] = element;
        setElements(elements);
    }

    // Shared state for the context
    const sharedState = {
        publicApiKey,
        digitalRiver,
        digitalRiverCheckout,
        dynamicPricing,
        elements,
        setElement,
        removeElement,
        clear,
        guid
    };
    // Return the context provider with the shared state
    return (
        <DigitalRiverInnerContext.Provider value={sharedState}>
            {children}
        </DigitalRiverInnerContext.Provider>
    )
}
// Hook to use the Digital River context
export const useDigitalRiverContext = () => {
    return React.useContext(DigitalRiverInnerContext) as DigitalRiverContext;
}
