# Local V5 feed loop

Use Node 24 and Docker with the existing LocalStack image. No command in this
workflow contacts AWS or an external source.

```sh
yarn feed:v5:test
```

For a fully working local site after installing dependencies, use the single
interactive entry point:

```sh
yarn local:env
```

It builds the runtime workspaces, starts LocalStack with DynamoDB and SSM,
migrates and seeds the V5 fixture, then starts Serverless Offline on `:3006`
and webpack on `:8080`. It verifies fixture post `s3--@me/sep!-s3-1200` through the API,
pagination, RSS and the rendered browser DOM. Press Ctrl-C to stop everything.
CI uses the same lifecycle with `yarn local:env:check`.

The aggregate test runner resets only `local-posts`, seeds the versioned
fixture, starts Serverless Offline and webpack, waits for both readiness URLs,
runs unit/DB/HTTP/browser lanes sequentially, and cleans up all child process
groups on success, failure or Ctrl-C. `yarn feed:v5:dev` remains available for
an interactive loop.
It refuses non-loopback DynamoDB endpoints. Ports are LocalStack `4566`,
Offline `3006`, and webpack `8080`.

Focused commands are `feed:v5:test:unit`, `feed:v5:test:db`,
`feed:v5:test:http`, `feed:v5:test:browser`, and the sequential aggregate.
The browser command uses a fresh Puppeteer profile and proves the clean-profile
request and hydration contract. It does not persist or rehydrate a browser
profile; `FEED_V5_BROWSER_URL` only changes the page URL.

The local loop proves merge/cursor/hydration logic, real Dynamoose schema and
indexes against LocalStack, Offline HTTP contracts, and browser V5 request and
scroll behaviour. It does not prove Lambda memory/CPU, API Gateway behaviour,
real DynamoDB latency/capacity/throttling, cold starts, or production IAM;
those remain explicit dev-AWS checks before deployment.
