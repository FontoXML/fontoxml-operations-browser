---
category: add-on/fontoxml-operations-browser
---

# Operations browser library

This add-on exposes the {@link operation/open-operations-browser-modal} operation for opening an operation browser. This browser allows the user to browse through different operations and select one operation to be executed. This, for example, this can be used to let the user choose between different question types (as can be found in the DITA learing module) to be inserted, each having its own unique insert operation.

## Getting started

This add-on can be added to an editor by selecting the checkbox for this add-on in the [SDK portal](http://sdk.fontoxml.com/). Then install this add-on [as usual](https://developers.fontoxml.com/install-add-on).

## Usage

This browser can be used by adding the following operation step to your operation:

```
{
    "type": "operation/open-operations-browser-modal"
}
```

The selectable operations are determined by the `operations` property. This property consists of an array of objects, each containing an `operationName` property, a `data` property, a `label` property, a description property, and an `image` property. The `operationName` should be a registered operation name, the data property is optional and can contain data to be passed to the operation. The `label` and the `image` properties will be used to represent the operation as an item in the modal. The `label` propery is optional and defaults to the `operationName` when not set.

The icon, primary button label and title for this modal can be set with the `modalIcon`, `modalPrimaryButtonLabel`, and `modalTitle` properties.

For more information, see {@link operation/open-operations-browser-modal}.

# Contributing

This package can serve as a base for custom versions of the operations browser. It can be forked by
checking it out directly in the `packages` folder of an editor. When making a fork, consider keeping
it up-to-date with new Fonto Editor versions when they release.

We highly appreciate pull requests if you find a bug. For more general improvements or new features,
please file a [support.fontoxml.com](support request). That way, we can think along and make sure an
improvement is made in a way that benefits all users of this package.
