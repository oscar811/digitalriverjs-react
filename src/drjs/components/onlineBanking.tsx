import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import {DigitalRiverElement, ElementEventArgument, ElementOnChangeArgument, ElementOptions} from "../../types";

let onlinebanking: DigitalRiverElement | null;

/**
 * `OnlineBanking` is a component for rendering the OnlineBanking input field.
 * It uses the Digital River context to create and manage the OnlineBanking element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/online-banking-elements
 *
 * @param {OnlineBankingProps} props - The properties that define the behavior of the OnlineBanking component.
 * @param {string} [props.elementId='dr-onlinebanking'] - The ID of the HTML element where the OnlineBanking component will be mounted. Defaults to 'dr-onlinebanking'.
 * @param {ElementOptions} [props.onlineBankingOptions] - The options for the OnlineBanking component.
 * @param {function} [props.onChange=()=>{}] - The function to be called when the OnlineBanking component changes. Defaults to an empty function.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the OnlineBanking component is ready. Defaults to an empty function.
 * @param {function} [props.onFocus=()=>{}] - The function to be called when the OnlineBanking component gains focus. Defaults to an empty function.
 * @param {function} [props.onBlur=()=>{}] - The function to be called when the OnlineBanking component loses focus. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID where the OnlineBanking component will be mounted.
 */
export const OnlineBanking = ({
                                  elementId = "dr-onlinebanking",
                                  onlineBankingOptions,
                                  onChange = () => {
                                  },
                                  onReady = () => {
                                  },
                                  onFocus = () => {
                                  },
                                  onBlur = () => {
                                  },
                              }: OnlineBankingProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the OnlineBanking component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!onlinebanking && drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                onlinebanking = drContext.digitalRiver.createElement('onlinebanking', onlineBankingOptions);
                onlinebanking.mount(elementId);
                onlinebanking.on('change', onChange);
                onlinebanking.on('ready', onReady);
                onlinebanking.on('focus', onFocus);
                onlinebanking.on('blur', onBlur);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the OnlineBanking component.
     */
    const clear = () => {
        if (onlinebanking) {
            onlinebanking.destroy();
        }
        onlinebanking = null;
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
 * @typedef OnlineBankingProps
 * @property {string} elementId - The ID of the HTML element where the OnlineBanking component will be mounted.
 * @property {ElementOptions} onlineBankingOptions - The options for the OnlineBanking component.
 * @property {function} onChange - The function to be called when the OnlineBanking component changes.
 * @property {function} onReady - The function to be called when the OnlineBanking component is ready.
 * @property {function} onFocus - The function to be called when the OnlineBanking component gains focus.
 * @property {function} onBlur - The function to be called when the OnlineBanking component loses focus.
 */
export interface OnlineBankingProps {
    elementId?: string;
    onlineBankingOptions: OnlineBankingOptions | any;

    onChange?(data: ElementOnChangeArgument): void;

    onReady?(data: ElementEventArgument): void;

    onFocus?(data: ElementEventArgument): void;

    onBlur?(data: ElementEventArgument): void;
}

export interface OnlineBankingOptions extends ElementOptions {
    onlineBanking: {
        currency: string;
        country: string;
    }
}


