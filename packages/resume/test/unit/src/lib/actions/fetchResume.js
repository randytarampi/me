import {SET_ERROR} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {Map, Set} from "immutable";
import proxyquire from "proxyquire";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    FETCHING_RESUME,
    FETCHING_RESUME_CANCELLED,
    FETCHING_RESUME_FAILURE,
    FETCHING_RESUME_FAILURE_RECOVERY,
    FETCHING_RESUME_SUCCESS
} from "../../../../../src/lib/actions/fetchResume";
import {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchResume";
import testResumeJson from "../../../../../src/resumes/test";

describe("fetchResume", function () {
    let mockStore;
    let stubMiddleware;
    let stubInitialState;
    let stubStore;

    beforeEach(function () {
        stubMiddleware = [thunk];
        mockStore = configureStore(stubMiddleware);
        stubInitialState = Map({
            api: Map(),
            resume: Map({
                resumes: Set([])
            })
        });
        stubStore = mockStore(stubInitialState);
    });

    describe("FETCHING_RESUME", function () {
        it("isn't dispatched if already `isLoading`", function () {
            const stubVariant = "test";
            const stubResumeResponse = testResumeJson;

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": () => Promise.resolve(stubResumeResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: true
                    })
                }),
                resume: Map({resumes: Set([])})
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(1);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_RESUME_CANCELLED,
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
            const stubResumeResponse = testResumeJson;

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubResumeResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_RESUME,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_RESUME_SUCCESS,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                resume: testResumeJson
                            }
                        }
                    ]);
                });
        });

        it("is dispatched with the expected payload (subsequent page)", function () {
            const stubVariant = "test";
            const stubResumeResponse = testResumeJson;
            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubResumeResponse);
                    }
                }
            });

            stubInitialState = Map({
                api: Map({
                    [`${__RESUME_SERVICE_URL__}/resume.json`]: Map({
                        isLoading: false
                    })
                }),
                resume: Map({
                    resumes: Set([
                        Map({variant: "resume", resume: testResumeJson})
                    ])
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_RESUME,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_RESUME_SUCCESS,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                resume: testResumeJson
                            }
                        }
                    ]);
                });
        });
    });

    describe("FETCHING_RESUME_FAILURE", function () {
        it("is dispatched with the expected payload (no resume)", function () {
            const stubVariant = "test";
            const stubResumeResponse = null;

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": () => Promise.resolve(stubResumeResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_RESUME,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_RESUME_SUCCESS,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                resume: null
                            }
                        },
                        {
                            type: SET_ERROR,
                            payload: {
                                error: undefined,
                                errorCode: "ENORESUME",
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
            const stubResumeResponse = new Error("woof");

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": () => Promise.reject(stubResumeResponse)
                }
            });

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error).to.eql(stubResumeResponse);

                    const actions = stubStore.getActions();
                    const expectedActions = [
                        {
                            type: FETCHING_RESUME,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_RESUME_FAILURE,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                error: stubResumeResponse
                            }
                        },
                        {
                            type: SET_ERROR,
                            payload: {
                                error: stubResumeResponse,
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

        it("is dispatched with the expected payload (fetch error but already loaded the resume variant)", function () {
            const stubVariant = "test";
            const stubResumeResponse = testResumeJson;

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": () => Promise.reject(stubResumeResponse)
                }
            });

            stubInitialState = Map({
                api: Map({
                    [buildFetchUrlForVariant(stubVariant)]: Map({
                        isLoading: false,
                        variant: stubVariant
                    })
                }),
                resume: Map({
                    resumes: Set([
                        Map({variant: stubVariant, resume: testResumeJson})
                    ])
                })
            });
            stubStore = mockStore(stubInitialState);

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(3);
                    expect(actions).to.eql([
                        {
                            type: FETCHING_RESUME,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant
                            }
                        },
                        {
                            type: FETCHING_RESUME_FAILURE,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                error: stubResumeResponse
                            }
                        },
                        {
                            type: FETCHING_RESUME_FAILURE_RECOVERY,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                resume: testResumeJson
                            }
                        }
                    ]);
                });
        });
    });

    describe("FETCHING_RESUME_SUCCESS", function () {
        it("is dispatched with the expected payload", function () {
            const stubVariant = "test";
            const stubResumeResponse = testResumeJson;

            const proxyquiredFetchResume = proxyquire("../../../../../src/lib/actions/fetchResume", {
                "../api/fetchResume": {
                    "default": variant => {
                        expect(variant).to.be.ok;
                        expect(variant).to.eql(stubVariant);

                        return Promise.resolve(stubResumeResponse);
                    }
                }
            });

            return stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
                .then(() => {
                    const actions = stubStore.getActions();

                    expect(actions).to.be.ok;
                    expect(actions).to.have.length(2);
                    expect(actions[1]).to.eql(
                        {
                            type: FETCHING_RESUME_SUCCESS,
                            payload: {
                                fetchUrl: buildFetchUrlForVariant(stubVariant),
                                variant: stubVariant,
                                resume: stubResumeResponse
                            }
                        }
                    );
                });
        });
    });
});
