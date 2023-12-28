import {useDigitalRiverContext} from "../../../digitalriver";
import * as React from "react";
import {useEffect} from "react";
import type {DigitalRiverElement, ElementProps} from "../../../types";

let cardExpiration: DigitalRiverElement | null;

/**
 * `CardExpiration` is a component that renders the Card Expiration input field.
 * It uses the Digital River context to create and manage the Card Expiration element.
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/payments/payment-integrations-1/digitalriver.js/payment-methods/credit-cards
 *
 * @param {ElementProps} props - The properties that define the behavior of the Card Expiration component.
 * @param {string} [props.elementId='dr-card-expiration'] - The ID of the HTML element where the Card Expiration component will be mounted. Defaults to 'dr-card-expiration'.
 * @param {Function} [props.onChange=() => {}] - The function to be called when the Card Expiration component changes. Defaults to an empty function.
 * @param {Object} [props.options={}] - The options for the Card Expiration component. Defaults to an empty object.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Card Expiration component will be mounted.
 */
export const CardExpiration = ({
                                   elementId = "dr-card-expiration",
                                   onChange = () => {
                                   }, options = {}
                               }: ElementProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Card Expiration component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                cardExpiration = drContext.digitalRiver.createElement('cardexpiration', options);
                cardExpiration.mount(elementId);
                cardExpiration.on('change', onChange);
                drContext.setElement('cardexpiration', cardExpiration);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Card Expiration component.
     */
    const clear = () => {
        if (cardExpiration) {
            cardExpiration.destroy();
            cardExpiration = null;
        }
    }

    useEffect(() => {
        if (drContext.digitalRiver) {
            render();
        }
    }, [drContext.digitalRiver, options]);

    useEffect(() => {
        return () => {
            clear();
        }
    }, []);

    return (
        <span id={elementId}/>
    );
}