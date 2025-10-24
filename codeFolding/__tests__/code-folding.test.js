const { defineTest } = require("jscodeshift/src/testUtils");

defineTest(
    __dirname,
    "code-folding",
    null,
    "default",
    { parser: "tsx" }
);

defineTest(
    __dirname,
    "code-folding",
    null,
    "idempotent",
    { parser: "tsx" }
);

defineTest(
    __dirname,
    "code-folding",
    null,
    "twoarrays",
    { parser: "tsx" }
);
