import * as React from "react";
import {useEffect} from "react";
import {useDigitalRiverContext} from "../../digitalriver";
import type {DigitalRiverComponent} from "../../types";
import type {ComponentProps} from "./";
import {useComponentsContext} from "./";

const ELEMENT_TYPE = 'wallet';
let wallet: DigitalRiverComponent | null;

/**
 * `Wallet` is a component for rendering the Wallet component.
 * It uses the Digital River context to create and manage the Wallet element.
 *
 * @component
 * @see https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout
 *
 * @param {ComponentProps} props - The properties that define the behavior of the Wallet component.
 * @param {string} [props.elementId='dr-wallet'] - The ID of the HTML element where the Wallet component will be mounted. Defaults to 'dr-wallet'.
 *
 * @returns {JSX.Element} A span element with the specified ID where the Wallet component will be mounted.
 */
export const Wallet = ({
                           elementId = "dr-wallet",
                       }: ComponentProps): JSX.Element => {
    const drContext = useDigitalRiverContext();
    const componentsContext = useComponentsContext();

    /**
     * Function to render the Wallet component.
     */
    const render = () => {
        const placeholder = document.getElementById(elementId);
        if (!wallet && componentsContext.components) {
            wallet = componentsContext.components.createComponent(ELEMENT_TYPE);
        }
        try {
            if (placeholder && wallet) {
                placeholder.replaceChildren();
                wallet.mount(elementId);
                drContext.setElement(ELEMENT_TYPE, wallet);
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
     * Function to clear the Wallet component.
     */
    const clear = () => {
        if (wallet) {
            const placeholder = document.getElementById(elementId);
            if (placeholder) {
                placeholder.replaceChildren();
            }
            wallet = null;
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


