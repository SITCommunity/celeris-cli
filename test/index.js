const { testAndPush } = require('celeris-cli');

testAndPush(() => {
    if (Math.random() > 0.7) throw new Error("Unlucky");
}, {
    project: "celeris-cli",
});