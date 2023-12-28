/// <reference types="cypress-iframe" />

import {mount} from 'cypress/react18';
import {OnlineBanking, OnlineBankingOptions} from './onlineBanking.tsx';
import demoConfigJson from "../../../configuration/demo.config.json";
import {DigitalRiverContainer, PaymentContext} from "../../digitalriver";
import {AddressEntry} from "../../types";

const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;

describe('OnlineBanking Component', () => {
    it('renders OnlineBanking with default props', () => {
        const onlineBankingOptions: OnlineBankingOptions = {
            onlineBanking: {
                currency: "USD",
                country: "US"
            }
        };

        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OnlineBanking onlineBankingOptions={onlineBankingOptions}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#dr-onlinebanking').should('exist');
    });

    it('renders OnlineBanking with custom elementId', () => {
        const onlineBankingOptions: OnlineBankingOptions = {
            onlineBanking: {
                currency: "USD",
                country: "US"
            }
        };
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OnlineBanking elementId="custom-id" onlineBankingOptions={onlineBankingOptions}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );
        cy.get('#custom-id').should('exist');
    });

    it('triggers onChange event when input changes', () => {
        const onlineBankingOptions: OnlineBankingOptions = {
            onlineBanking: {
                currency: "USD",
                country: "US"
            }
        };
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OnlineBanking onChange={onChange} onlineBankingOptions={onlineBankingOptions}/>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="onlinebanking-"]');
        cy.iframe('iframe[id^="onlinebanking-"]').find('.custom-select-opener').click();
        cy.iframe('iframe[id^="onlinebanking-"]').find('[role=listbox]>[role=option]').eq(1).click({force: true});
        cy.wrap(onChange).should('be.called');
    });
    /*
    it('handles invalid input correctly', () => {
        const onlineBankingOptions: OnlineBankingOptions = {
            onlineBanking: {
                currency: "USD",
                country: "US"
            }
        };
        const onChange = cy.stub();
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} locale={"en-US"}>
                <PaymentContext billingAddress={billingAddress} amount={100} currency={"USD"}>
                    <OnlineBanking elementId="error" onChange={onChange} onlineBankingOptions={onlineBankingOptions}/>
                    <button id="btn">test</button>
                </PaymentContext>
            </DigitalRiverContainer>
        );

        cy.frameLoaded('iframe[id^="onlinebanking-"]');
        cy.iframe('iframe[id^="onlinebanking-"]').find('input').type('0');
        cy.get('#btn').focus();
        cy.get('#error').should('have.class','DRElement--invalid');
    });
    */
});