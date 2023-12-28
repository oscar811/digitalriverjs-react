/// <reference types="cypress-iframe" />
/// <reference types="../../cypress/cypress" />

import {mount} from "cypress/react18";
import {DigitalRiverContainer} from "./digitalRiverContainer";
import React from "react";
import demoConfigJson from "../../configuration/demo.config.json";
import {PaymentContext, usePaymentContext} from "./paymentComponent";
import {AddressEntry} from "../types";


describe('PaymentContext', () => {

    it('initializes PaymentContext', () => {
        let paymentComponent: any;
        const billingAddress = demoConfigJson.defaultAddress.billTo['us'] as AddressEntry;
        const PaymentContextTest = (): JSX.Element => {
            paymentComponent = usePaymentContext();
            return (<PaymentContext billingAddress={billingAddress}></PaymentContext>);
        }
        mount(
            <DigitalRiverContainer publicApiKey={demoConfigJson.publicApiKey} enableDigitalRiver={true}>
                <PaymentContextTest/>
            </DigitalRiverContainer>
        );
    })

})