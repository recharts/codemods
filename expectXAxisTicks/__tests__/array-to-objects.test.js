const { defineTest } = require("jscodeshift/src/testUtils");

defineTest(
    __dirname,
    "array-to-objects",
    null,
    "default",
    { parser: "tsx" }
);

defineTest(
    __dirname,
    "array-to-objects",
    null,
    "idempotent",
    { parser: "tsx" }
);