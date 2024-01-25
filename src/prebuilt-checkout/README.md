# Prebuilt Checkout

This project provides a prebuilt checkout solution that can be easily configured to match your website's style and support various express checkout options.

For more information on Prebuilt Checkout, please refer to the Digital River documentation:
[Prebuilt Checkout Documentation](https://docs.digitalriver.com/digital-river-api/integration-options/low-code-checkouts/drop-in-checkout)

### Configuration

You can configure the prebuilt checkout by creating a `PrebuiltCheckoutConfiguration` object. Here's an example:


```javascript
const configuration: PrebuiltCheckoutConfiguration = {
    "options": {
        "expressCheckout": ["payPal"],// array for listing express checkout. Values: "applePay","payPal","googlePay"
        "language": "en-US",
        "style": {
            "modal": {
                "themeColor": {
                    "primary": "#00a7e1",
                    "highlight": "#002f57",
                    "headerBackground": "#fff",
                    "mainBackground": "#fff",
                    "orderSummaryBackground": "#eee",
                    "linkTextColor": "#003058",
                    "stepperBorder": "#00a7e1",
                    "footer": {
                        "background": "#001c33",
                        "linkText": "#fff"
                    }
                },
                "borderRadius": "8px",
                "fontFamily": "Montserrat, sans-serif",
                "fontVariant": "normal",
                "letterSpacing": "1px"
            },
            "textField": {
                "base": {
                    "color": "#000",
                    "fontFamily": "Arial, Helvetica, sans-serif",
                    "fontSize": "20px",
                    "fontVariant": "normal",
                    "letterSpacing": "1px"
                },
                "borderRadius": '4px'
            }
        }
    }
};
```

This is a React component that uses the `DigitalRiverContainer` component. The `publicApiKey` and `locale` props are passed to the `DigitalRiverContainer` component. The `enableDigitalRiverCheckout` prop is set to `true` to enable the Digital River checkout.

When the button is clicked, it fetches a checkout session from the /api/checkout-session endpoint and parses the response as JSON. This checkout session can then be used to initiate the checkout process.

### React component
```javascript
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