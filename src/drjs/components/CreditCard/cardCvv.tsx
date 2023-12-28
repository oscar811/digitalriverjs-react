import {useDigitalRiverContext} from "../../../digitalriver";
import * as React from "react";
import {useEffect} from "react";
import type {DigitalRiverElement, ElementProps} from "../../../types";

let cardCvv: DigitalRiverElement | null;

/**
 * `CardCvv` is a component that renders the Card CVV input field.
 * It uses the Digital River context to create and manage the Card CVV element.
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/payments/payment-integrations-1/digitalriver.js/payment-methods/credit-cards
 *
 * @param {ElementProps} props - The properties that define the behavior of the Card CVV component.
 * @param {string} [props.elementId='dr-card-cvv'] - The ID of the HTML element where the Card CVV component will be mounted. Defaults to 'dr-card-cvv'.
 * @param {Function} [props.onChange=() => {}] - The function to be called when the Card CVV component changes. Defaults to an empty function.
 * @param {Object} [props.options={}] - The options for the Card CVV component. Defaults to an empty object.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Card CVV component will be mounted.
 */
export const CardCvv = ({
                            elementId = "dr-card-cvv",
                            onChange = () => {
                            }, options = {}
                        }: ElementProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Card CVV component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                cardCvv = drContext.digitalRiver.createElement('cardcvv', options);
                cardCvv.mount(elementId);
                cardCvv.on('change', onChange);
                drContext.setElement('cardcvv', cardCvv);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Card CVV component.
     */
    const clear = () => {
        if (cardCvv) {
            cardCvv.destroy();
        }
        cardCvv = null;
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