import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../../digitalriver";
import type {DigitalRiverElement, ElementProps} from "../../../types";

let cardNumber: DigitalRiverElement | null;

/**
 * `CardNumber` is a component that renders the Card Number input field.
 * It uses the Digital River context to create and manage the Card Number element.
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/payments/payment-integrations-1/digitalriver.js/payment-methods/credit-cards
 *
 * @param {ElementProps} props - The properties that define the behavior of the Card Number component.
 * @param {string} [props.elementId='dr-card-number'] - The ID of the HTML element where the Card Number component will be mounted. Defaults to 'dr-card-number'.
 * @param {Function} [props.onChange=() => {}] - The function to be called when the Card Number component changes. Defaults to an empty function.
 * @param {Object} [props.options={}] - The options for the Card Number component. Defaults to an empty object.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Card Number component will be mounted.
 */
export const CardNumber = ({
                               elementId = "dr-card-number",
                               onChange = () => {
                               },
                               options = {}
                           }: ElementProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Card Number component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                cardNumber = drContext.digitalRiver.createElement('cardnumber', options);
                cardNumber.mount(elementId);
                cardNumber.on('change', onChange);
                drContext.setElement('cardnumber', cardNumber);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Card Number component.
     */
    const clear = () => {
        if (cardNumber) {
            cardNumber.destroy();
        }
        cardNumber = null;
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
//export default CardNumber;

