import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import {DigitalRiverElement, ElementEventArgument, ElementOptions} from "../../types";

const PAYMENT_METHOD_TYPE = 'ideal';
let ideal: DigitalRiverElement | null;

/**
 * `IDEAL` is a component for rendering the iDEAL input field.
 * It uses the Digital River context to create and manage the iDEAL element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/ideal-element
 *
 * @param {IDEALProps} props - The properties that define the behavior of the iDEAL component.
 * @param {string} [props.elementId='dr-ideal'] - The ID of the HTML element where the iDEAL component will be mounted.
 * @param {IDEALElementOptions} [props.idealOptions] - The options for the iDEAL component.
 * @param {function} [props.onChange=()=>{}] - The function to be called when the iDEAL component changes. Defaults to an empty function.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the iDEAL component is ready. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID.
 */
export const IDEAL = ({
                          elementId = "dr-ideal",
                          idealOptions,
                          onChange = () => {
                          },
                          onReady = () => {
                          },
                      }: IDEALProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!ideal && drContext.digitalRiver && placeholder && idealOptions) {
            try {
                placeholder.replaceChildren();
                ideal = drContext.digitalRiver.createElement(PAYMENT_METHOD_TYPE, idealOptions);
                ideal.mount(elementId);
                ideal.on('change', onChange);
                ideal.on('ready', onReady);
                drContext.setElement(PAYMENT_METHOD_TYPE, ideal);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    const clear = () => {
        if (ideal) {
            ideal.destroy();
        }
        ideal = null;
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
 * @typedef IDEALProps
 * @property {string} elementId - The ID of the HTML element where the iDEAL component will be mounted.
 * @property {IDEALElementOptions} idealOptions - The options for the iDEAL component.
 * @property {function} onChange - The function to be called when the iDEAL component changes.
 * @property {function} onReady - The function to be called when the iDEAL component is ready.
 */
export interface IDEALElementOptions extends ElementOptions {
    ideal: {
        sessionId: string;
    }
}

/**
 * @typedef IDEALElementOptions
 * @property {ElementClasses} classes - The classes for the iDEAL component.
 * @property {Object} ideal - The iDEAL options for the iDEAL component.
 */
export interface IDEALProps {
    elementId?: string;
    idealOptions?: IDEALElementOptions | any;

    onChange?(data: IDEALOnChangeArgument): void;

    onReady?(data: ElementEventArgument): void;
}

/**
 * @typedef IDEALOnChangeArgument
 * @property {ElementEventArgument} iban - The iDEAL component's IBAN.
 */
export interface IDEALOnChangeArgument extends ElementEventArgument {
    iban: any;
}



