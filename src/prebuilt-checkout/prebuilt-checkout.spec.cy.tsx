/// <reference types="cypress-iframe" />
/// <reference types="../../cypress/cypress" />

import {mount} from 'cypress/react18';
import demoConfigJson from "../../configuration/demo.config.json";
import {DigitalRiverContainer, useDigitalRiverContext} from "../digitalriver";
import React from "react";

const ButtonTest = ({checkoutSessionLink}: any): JSX.Element => {
    const drContext = useDigitalRiverContext();
    if (!checkoutSessionLink) return <></>;
    return (<button id="checkout" onClick={async () => {
        const modal = await drContext.digitalRiverCheckout.createModal(checkoutSessionLink.id);
    }}>
        Pre-Built Checkout
    </button>);
}

describe('Prebuilt Checkout Component', () => {
    let checkoutSessionLink: any = null;
    before(() => {
        cy.wrap(null).then(async () => {
            return cy.getCheckoutSession(demoConfigJson.publicApiKey, demoConfigJson.secretApiKey).then((response) => {
                checkoutSessionLink = response.body;
                expect(checkoutSessionLink).to.exist;
            });
        });
    });

    it('renders Prebuilt-Checkout with default props', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDigitalRiverCheckout={true}>
                <ButtonTest checkoutSessionLink={checkoutSessionLink}/>
            </DigitalRiverContainer>
        );
        cy.window().should('have.property', 'DigitalRiverCheckout');
        cy.get('#checkout').click();
        cy.frameLoaded('iframe[id^="DRCheckoutIframe-"]');
    });
})