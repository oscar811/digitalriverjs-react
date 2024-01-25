# Components Checkout

This code snippet represents a React component that utilizes the Digital River SDK for implementing a prebuilt checkout flow. It includes various sub-components such as Wallet, OrderSummary, Address, Shipping, TaxIdentifier, TaxExemption, InvoiceAttribute, Payment, ThankYou, and Compliance.

The component is wrapped within a `DigitalRiverContainer` component, which takes in props like `publicApiKey`, `locale`, and `enableDigitalRiverCheckout` to configure the Digital River integration. It also includes a button that triggers the creation of a modal for the pre-built checkout flow when clicked.

For more information on Components Checkout, please refer to the Digital River documentation:
[Components Checkout Documentation](https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/implementing-a-components-checkout)

### React component
```javascript
<DigitalRiverContainer publicApiKey={publicApiKey}
                       locale={locale}
                       enableDigitalRiverCheckout={true}
                       enableDigitalRiver={true}>
    <Components checkoutSessionLink={checkoutSessionLink}
                onReady={onReady}
                onChange={onChange}
                onSuccess={onSuccess}>
        
        <Wallet/>
        <OrderSummary/>
        <Address/>
        <Shipping/>
        <TaxIdentifier/>
        <TaxExemption/>
        <InvoiceAttribute/>
        <Payment/>
        <ThankYou/>
        
        <Compliance/>
    </Components>
</DigitalRiverContainer>
<DigitalRiverContainer publicApiKey={publicApiKey} locale={locale} enableDigitalRiverCheckout={true}>
    <button onClick={async () => {
        const checkoutSession = await fetch('/api/checkout-session');
        const checkoutSessionJson = await checkoutSession.json();
        const modal = await drContext.digitalRiverCheckout.createModal(checkoutSessionJson.id, configuration);
    }}>
        Pre-Built Checkout
    </button>
</DigitalRiverContainer>
```