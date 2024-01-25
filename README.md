# Digital River React component

This is a React library for integrating Digital River payment solution, including DR.js, Drop-in, Prebuilt Checkout, Components Checkout and Dynamic Pricing.

### Prerequisites

This library requires React version 17 or 18. Make sure to have one of these versions installed in your project:

### Installing

NPM:
```bash
npm install digitalriverjs-react
```

Yarn:
```bash
yarn add digitalriverjs-react
```

## How to use

Import the necessary components from the library:

```javascript
import {DigitalRiverContainer, PaymentContext} from 'digitalriverjs-react';
```

Wrap the components you want to use with the `PaymentContext` and `DigitalRiverContainer` components:

```javascript
<DigitalRiverContainer publicApiKey="your-public-api-key" locale="en-US">
    <PaymentContext billingAddress={billingAddress} amount={amount} currency={currency} sessionId={sessionId}>
        {/* Digital River components here */}
    </PaymentContext>
</DigitalRiverContainer>
```
> [!NOTE]
In this example, replace `"your-public-api-key"` with your actual public API key from Digital River.
The `billingAddress` object should contain the billing address details, and the `amount` and `currency` props should
reflect the total amount and currency of the transaction. Remember to wrap your components with the `PaymentContext`
and `DigitalRiverContainer` components to ensure they have access to the necessary context and functionality provided by
the Digital River API.

#### Examples of element usages

- [DigitalRiver.js with Elements](src/drjs/README.md)
  - [Credit Card](src/drjs/README.md#credit-card-elements) 
  - [GooglePay](src/drjs/README.md#google-pay-element)
  - [ApplePay](src/drjs/README.md#apple-pay-element)
  - [PayPal](src/drjs/README.md#paypal-element)
- [Dop-In Payment](src/dropin/README.md)
- [Dynamic Pricing](src/dynamic-pricing/README.md)
- [Prebuilt Checkout](src/prebuilt-checkout/README.md)
- [Components Checkout](src/prebuilt-checkout/components/README.md)


## Running the tests

To run the automated tests for this system, use the command `npm run test`.
To run the demo, use the command `npm run start`.

## References
https://docs.digitalriver.com/
