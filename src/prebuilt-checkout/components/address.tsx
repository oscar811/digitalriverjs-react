import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'address';
let address: DigitalRiverComponent | null;

/**
 * `Address` is a component for rendering the Address component.
 * It uses the Digital River context to create and manage the Address element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the Address component.
 * @param {string} [props.elementId='dr-address'] - The ID of the HTML element where the Address component will be mounted. Defaults to 'dr-address'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Address component will be mounted.
 */
export const Address = ({
                            elementId = "dr-address",
                        }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the Address component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!address && componentsContext.components) {
            address = componentsContext.components.createComponent(ELEMENT_TYPE);
        }

        try {
            if (placeholder && address) {
                placeholder.replaceChildren();
                address.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, address);
            }
        } catch (e) {
            console.error(e);
            drContext.clear();
        }
    }

    useEffect(() => {
        if (drContext.digitalRiver && componentsContext.components) {
            render();
        }
    }, [drContext.digitalRiver, componentsContext.components]);

    /**
     * Function to clear the Address component.
     */
    const clear = () => {
        if (address) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
        }
    }

    useEffect(() => {
        return () => {
            clear();
        }
    }, []);

    return (
        <span id={elementId}/>
    );
}

