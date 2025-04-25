# celeris-cli
Celeris delivers real-time visibility into build pipelines, CI/CD health, and key development metrics — built for speed, designed for devs.

# Installation
```bash
npm i celeris-cli // pnpm i celeris-cli
```

# Usage
## Code Test
```js
const { testAndPush } = require('celeris-cli');

testAndPush(() => {
    // your code
}, {
    project: "celeris-cli", // your project name
});
```

## CLI
```bash
celeris push --build-status success --project celeris-cli
```

# License
```
This Project under MIT License
© 2019 - 2025 Strivo. All Rights Reserved
```