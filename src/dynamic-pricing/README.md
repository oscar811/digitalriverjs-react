# Dynamic Pricing

### Configuration

In order to use the Dynamic Pricing feature, you need to configure the `DigitalRiverContainer` component. Here's an example of how to configure selector in a React component:

For more information on Dynamic Pricing, please refer to the Digital River documentation:
[DynamicPricing.js Documentation](https://docs.digitalriver.com/digital-river-api/general-resources/dynamicpricing.js-reference)


### React component
```javascript
<DigitalRiverContainer 
    publicApiKey={defaultKey}
    enableDynamicPricing={true}
    locale={locale}
    defaultCountry="US"
    currencySelectorElementId="DR-currencySelector">
    <span id="DR-currencySelector"/>
</DigitalRiverContainer>
```