import {SET_ERROR} from "@randy.tarampi/jsx/src/lib/index.jsx";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";

import {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchLetter.js";
import testLetterJson from "../../../../../src/letters/letter.json";

const FETCHING_LETTER = "FETCHING_LETTER";
const FETCHING_LETTER_CANCELLED = "FETCHING_LETTER_CANCELLED";
const FETCHING_LETTER_FAILURE = "FETCHING_LETTER_FAILURE";
const FETCHING_LETTER_FAILURE_RECOVERY = "FETCHING_LETTER_FAILURE_RECOVERY";
const FETCHING_LETTER_SUCCESS = "FETCHING_LETTER_SUCCESS";

const actionPath = require.resolve("../../../../../src/lib/actions/fetchLetter.js");
const apiPath = require.resolve("../../../../../src/lib/api/fetchLetter.js");

const loadFetchLetterAction = fetchLetterImpl => {
    delete require.cache[actionPath];
    delete require.cache[apiPath];

    require.cache[apiPath] = {
        id: apiPath,
        filename: apiPath,
        loaded: true,
        exports: {
            __esModule: true,
            default: fetchLetterImpl,
            buildFetchUrlForVariant
        }
    };

    return require(actionPath);
};

describe("fetchLetter", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map(),
            letter: Map({
                letters: Map()
            })
        });
        stubStore = mockStore(stubInitialState);
    });

    afterEach(function () {
        delete require.cache[actionPath];
        delete require.cache[apiPath];
    });

    describe("FETCHING_LETTER", function () {
        it("isn't dispatched if already `isLoading`", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(() => Promise.resolve(testLetterJson));

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: true
                    })
                }),
                letter: Map({ letter: Map() })
            });
            stubStore = mockStore(stubInitialState);

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER_CANCELLED,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        isLoading: true
                    }
                }
            ]);
        });

        it("is dispatched with the expected payload (first variant)", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(variant => {
                expect(variant).to.eql(stubVariant);
                return Promise.resolve(testLetterJson);
            });

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant
                    }
                },
                {
                    type: FETCHING_LETTER_SUCCESS,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        letter: testLetterJson
                    }
                }
            ]);
        });

        it("is dispatched with the expected payload (subsequent page)", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(variant => {
                expect(variant).to.eql(stubVariant);
                return Promise.resolve(testLetterJson);
            });

            stubInitialState = Map({
                api: Map({
                    [`${__LETTER_SERVICE_URL__}/letter.json`]: Map({
                        isLoading: false
                    })
                }),
                letter: Map({
                    letters: Map({ letter: testLetterJson })
                })
            });
            stubStore = mockStore(stubInitialState);

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant
                    }
                },
                {
                    type: FETCHING_LETTER_SUCCESS,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        letter: testLetterJson
                    }
                }
            ]);
        });
    });

    describe("FETCHING_LETTER_FAILURE", function () {
        it("is dispatched with the expected payload (no letter)", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(() => Promise.resolve(null));

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant
                    }
                },
                {
                    type: FETCHING_LETTER_SUCCESS,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        letter: null
                    }
                },
                {
                    type: SET_ERROR,
                    payload: {
                        error: undefined,
                        errorCode: "ENOLETTER",
                        errorMessage: undefined
                    }
                }
            ]);
        });

        it("is dispatched with the expected payload (fetch error)", async function () {
            const stubVariant = "test";
            const stubLetterResponse = new Error("woof");
            const proxyquiredFetchLetter = loadFetchLetterAction(() => Promise.reject(stubLetterResponse));

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    throw new Error("Expected fetchLetter to reject");
                })
                .catch(error => {
                    expect(error).to.eql(stubLetterResponse);

                    expect(stubStore.getActions()).to.eql([
                        {
                            type: FETCHING_LETTER,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_LETTER_FAILURE,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                error: stubLetterResponse
                            }
                        },
                        {
                            type: SET_ERROR,
                            payload: {
                                error: stubLetterResponse,
                                errorCode: "EFETCH",
                                errorMessage: undefined
                            }
                        }
                    ]);
                });
        });

        it("is dispatched with the expected payload (fetch error but already loaded the letter variant)", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(() => Promise.reject(testLetterJson));

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: false,
                        variant: stubVariant
                    })
                }),
                letter: Map({
                    letters: Map({ [stubVariant]: testLetterJson })
                })
            });
            stubStore = mockStore(stubInitialState);

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant
                    }
                },
                {
                    type: FETCHING_LETTER_FAILURE,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        error: testLetterJson
                    }
                },
                {
                    type: FETCHING_LETTER_FAILURE_RECOVERY,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        letter: testLetterJson
                    }
                }
            ]);
        });
    });

    describe("FETCHING_LETTER_SUCCESS", function () {
        it("is dispatched with the expected payload", async function () {
            const stubVariant = "test";
            const proxyquiredFetchLetter = loadFetchLetterAction(variant => {
                expect(variant).to.eql(stubVariant);
                return Promise.resolve(testLetterJson);
            });

            await stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant));

            expect(stubStore.getActions()).to.eql([
                {
                    type: FETCHING_LETTER,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant
                    }
                },
                {
                    type: FETCHING_LETTER_SUCCESS,
                    payload: {
                        fetchUrl: buildFetchUrlForVariant(stubVariant),
                        variant: stubVariant,
                        letter: testLetterJson
                    }
                }
            ]);
        });
    });
});
