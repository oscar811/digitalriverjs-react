/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {CardExpiration} from './cardExpiration.tsx';
import demoConfigJson from "../../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../../digitalriver";
import {AddressEntry} from "../../../types";
import {getContainerEl} from "cypress/react";
import ReactDom from "react-dom";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('CardExpiration Component', () => {
    it('renders without crashing', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardExpiration/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-card-expiration').should('exist');
    });

    it('renders CardExpiration with custom elementId', () => {
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardExpiration elementId="custom-id"/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onChange event when input changes', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardExpiration onChange={onChange}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="cardexpiration-"]');
        cy.iframe('iframe[id^="cardexpiration-"]').find('input[type=text]').click({force: true});
        cy.iframe('iframe[id^="cardexpiration-"]').find('input[type=text]').focus().type('12/30');
        cy.wrap(onChange).should('be.called');
        cy.then(() => ReactDom.unmountComponentAtNode(getContainerEl()));
    });

    it('handles invalid input correctly', () => {
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <CardExpiration elementId="error" onChange={onChange}/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="cardexpiration-"]');
        cy.iframe('iframe[id^="cardexpiration-"]').find('input[type=text]').click({force: true});
        cy.iframe('iframe[id^="cardexpiration-"]').find('input[type=text]').focus().type('0000');
        cy.get('#btn').focus();
        cy.get('#error').should('have.class', 'DRElement--invalid');
    });
});