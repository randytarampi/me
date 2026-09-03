// NOTE-RT: pre-require built ESM artifact — see docs/CONVENTIONS.md#testing
require("../dist/index.server.js");

// NOTE-RT: pre-require to avoid ERR_REQUIRE_ESM_RACE_CONDITION — see docs/CONVENTIONS.md#testing
require("chai");
