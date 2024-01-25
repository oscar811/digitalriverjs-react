import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import {DigitalRiverElement, ElementEventArgument, ElementOnChangeArgument, ElementOptions} from "../../types";

const PAYMENT_METHOD_TYPE = 'iban';
let iban: DigitalRiverElement | null;

/**
 * `IBAN` is a component for rendering the IBAN input field.
 * It uses the Digital River context to create and manage the IBAN element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/iban-element
 *
 * @param {IBANProps} props - The properties that define the behavior of the IBAN component.
 * @param {string} [props.elementId='dr-iban'] - The ID of the HTML element where the IBAN component will be mounted. Defaults to 'dr-iban'.
 * @param {ElementOptions} [props.ibanOptions] - The options for the IBAN component.
 * @param {function} [props.onChange=()=>{}] - The function to be called when the IBAN component changes. Defaults to an empty function.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the IBAN component is ready. Defaults to an empty function.
 * @param {function} [props.onFocus=()=>{}] - The function to be called when the IBAN component gains focus. Defaults to an empty function.
 * @param {function} [props.onBlur=()=>{}] - The function to be called when the IBAN component loses focus. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID where the IBAN component will be mounted.
 */
export const IBAN = ({
                         elementId = "dr-iban",
                         ibanOptions,
                         onChange = () => {
                         },
                         onReady = () => {
                         },
                         onFocus = () => {
                         },
                         onBlur = () => {
                         },
                     }: IBANProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the IBAN component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!iban && drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                iban = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, ibanOptions);
                iban.mount(elementId);
                iban.on('change', onChange);
                iban.on('ready', onReady);
                iban.on('focus', onFocus);
                iban.on('blur', onBlur);
                drContext.setElement(PAYMENT_METHOD_TYPE, iban);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the IBAN component.
     */
    const clear = () => {
        if (iban) {
            iban.destroy();
        }
        iban = null;
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
 * @typedef IBANProps
 * @property {string} elementId - The ID of the HTML element where the IBAN component will be mounted.
 * @property {ElementOptions} ibanOptions - The options for the IBAN component.
 * @property {function} onChange - The function to be called when the IBAN component changes.
 * @property {function} onReady - The function to be called when the IBAN component is ready.
 * @property {function} onFocus - The function to be called when the IBAN component gains focus.
 * @property {function} onBlur - The function to be called when the IBAN component loses focus.
 */
export interface IBANProps {
    elementId?: string;
    ibanOptions?: ElementOptions | any;

    onChange?(data: ElementOnChangeArgument): void;

    onReady?(data: ElementEventArgument): void;

    onFocus?(data: ElementEventArgument): void;

    onBlur?(data: ElementEventArgument): void;
}



