import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import {DigitalRiverElement, ElementEventArgument, ElementOnChangeArgument, ElementOptions} from "../../types";

let konbini: DigitalRiverElement | null;

/**
 * `Konbini` is a component for rendering the Konbini selector.
 * It uses the Digital River context to create and manage the Konbini element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/general-resources/reference/elements/konbini-elements
 *
 * @param {KonbiniProps} props - The properties that define the behavior of the Konbini component.
 * @param {string} [props.elementId='dr-konbini'] - The ID of the HTML element where the Konbini component will be mounted.
 * @param {ElementOptions} [props.konbiniOptions] - The options for the Konbini component.
 * @param {function} [props.onChange=()=>{}] - The function to be called when the Konbini component changes. Defaults to an empty function.
 * @param {function} [props.onReady=()=>{}] - The function to be called when the Konbini component is ready. Defaults to an empty function.
 * @param {function} [props.onFocus=()=>{}] - The function to be called when the Konbini component gains focus. Defaults to an empty function.
 * @param {function} [props.onBlur=()=>{}] - The function to be called when the Konbini component loses focus. Defaults to an empty function.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Konbini component will be mounted.
 */
export const Konbini = ({
                            elementId = "dr-konbini",
                            konbiniOptions,
                            onChange = () => {
                            },
                            onReady = () => {
                            },
                            onFocus = () => {
                            },
                            onBlur = () => {
                            },
                        }: KonbiniProps): JSX.Element => {
    const drContext = useDigitalRiverContext();

    /**
     * Function to render the Konbini component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!konbini && drContext.digitalRiver && placeholder) {
            try {
                placeholder.replaceChildren();
                konbini = drContext.digitalRiver.createElement('konbini', konbiniOptions);
                konbini.mount(elementId);
                konbini.on('change', onChange);
                konbini.on('ready', onReady);
                konbini.on('focus', onFocus);
                konbini.on('blur', onBlur);
            } catch (e) {
                console.error(e);
                drContext.clear();
                clear();
            }
        }
    }

    /**
     * Function to clear the Konbini component.
     */
    const clear = () => {
        if (konbini) {
            konbini.destroy();
        }
        konbini = null;
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

export interface KonbiniProps {
    elementId?: string;
    konbiniOptions?: ElementOptions | any;

    onChange?(data: ElementOnChangeArgument): void;

    onReady?(data: ElementEventArgument): void;

    onFocus?(data: ElementEventArgument): void;

    onBlur?(data: ElementEventArgument): void;
}



