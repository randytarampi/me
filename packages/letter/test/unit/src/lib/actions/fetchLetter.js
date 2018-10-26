import {SET_ERROR} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {Map, Set} from "immutable";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import testLetterJson from "../../../../../src/letters/letter.json";
import {
    FETCHING_LETTER,
    FETCHING_LETTER_CANCELLED,
    FETCHING_LETTER_FAILURE,
    FETCHING_LETTER_FAILURE_RECOVERY,
    FETCHING_LETTER_SUCCESS
} from "../../../../../src/lib/actions/fetchLetter";
import {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchLetter";

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
                letters: Set([])
            })
        });
        stubStore = mockStore(stubInitialState);
    });

    describe("FETCHING_LETTER", function () {
        it("isn't dispatched if already `isLoading`", function () {
            const stubVariant = "test";
            const stubLetterResponse = testLetterJson;

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": () => Promise.resolve(stubLetterResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: true
                    })
                }),
                letter: Map({letters: Set([])})
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(1);
                    expect(actions).to.eql([
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
        });

        it("is dispatched with the expected payload (first variant)", function () {
            const stubVariant = "test";
            const stubLetterResponse = testLetterJson;

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubLetterResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
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

        it("is dispatched with the expected payload (subsequent page)", function () {
            const stubVariant = "test";
            const stubLetterResponse = testLetterJson;
            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubLetterResponse);
                    }
                }
            });

            stubInitialState = Map({
                api: Map({
                    [`${__LETTER_SERVICE_URL__}/letter.json`]: Map({
                        isLoading: false
                    })
                }),
                letter: Map({
                    letters: Set([
                        Map({variant: "letter", letter: testLetterJson})
                    ])
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
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

    describe("FETCHING_LETTER_FAILURE", function () {
        it("is dispatched with the expected payload (no letter)", function () {
            const stubVariant = "test";
            const stubLetterResponse = null;

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": () => Promise.resolve(stubLetterResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();
                    const expectedActions = [
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
                    ];

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(expectedActions.length);
                    expect(actions).to.eql(expectedActions);
                });
        });

        it("is dispatched with the expected payload (fetch error)", function () {
            const stubVariant = "test";
            const stubLetterResponse = new Error("woof");

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": () => Promise.reject(stubLetterResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error).to.eql(stubLetterResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
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
                    ];

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(expectedActions.length);
                    expect(actions).to.eql(expectedActions);
                });
        });

        it("is dispatched with the expected payload (fetch error but already loaded the letter variant)", function () {
            const stubVariant = "test";
            const stubLetterResponse = testLetterJson;

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": () => Promise.reject(stubLetterResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: false,
                        variant: stubVariant
                    })
                }),
                letter: Map({
                    letters: Set([
                        Map({variant: stubVariant, letter: testLetterJson})
                    ])
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(3);
                    expect(actions).to.eql([
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
    });

    describe("FETCHING_LETTER_SUCCESS", function () {
        it("is dispatched with the expected payload", function () {
            const stubVariant = "test";
            const stubLetterResponse = testLetterJson;

            const proxyquiredFetchLetter = proxyquire("../../../../../src/lib/actions/fetchLetter", {
                "../api/fetchLetter": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubLetterResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchLetter.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions[1]).to.eql(
                        {
                            type: FETCHING_LETTER_SUCCESS,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                letter: stubLetterResponse
                            }
                        }
                    );
                });
        });
    });
});
