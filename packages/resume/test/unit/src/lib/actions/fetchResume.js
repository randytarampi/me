import {SET_ERROR} from "@randy.tarampi/jsx/src/lib/index.jsx";
import {expect} from "chai";
import {Map} from "immutable";
import configureStore from "redux-mock-store";
import {thunk} from "redux-thunk";

import Resume from "../../../../../src/lib/resume.js";
import {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchResume.js";
import testResumeJson from "../../../../../src/resumes/some-awesome-company.json";

const FETCHING_RESUME = "FETCHING_RESUME";
const FETCHING_RESUME_CANCELLED = "FETCHING_RESUME_CANCELLED";
const FETCHING_RESUME_FAILURE = "FETCHING_RESUME_FAILURE";
const FETCHING_RESUME_FAILURE_RECOVERY = "FETCHING_RESUME_FAILURE_RECOVERY";
const FETCHING_RESUME_SUCCESS = "FETCHING_RESUME_SUCCESS";

const actionPath = require.resolve("../../../../../src/lib/actions/fetchResume.js");
const apiPath = require.resolve("../../../../../src/lib/api/fetchResume.js");

const loadFetchResumeAction = fetchResumeImpl => {
  delete require.cache[actionPath];
  delete require.cache[apiPath];

  require.cache[apiPath] = {
    id: apiPath,
    filename: apiPath,
    loaded: true,
    exports: {
      __esModule: true,
      default: fetchResumeImpl,
      buildFetchUrlForVariant
    }
  };

  return require(actionPath);
};

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
        resumes: Map()
      })
    });
    stubStore = mockStore(stubInitialState);
  });

  afterEach(function () {
    delete require.cache[actionPath];
    delete require.cache[apiPath];
  });

  describe("FETCHING_RESUME", function () {
    it("isn't dispatched if already `isLoading`", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(() => Promise.resolve(testResumeJson));

      stubInitialState = Map({
        api: Map({
          [buildFetchUrlForVariant(stubVariant)]: Map({
            isLoading: true
          })
        }),
        resume: Map({ resumes: Map() })
      });
      stubStore = mockStore(stubInitialState);

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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

    it("is dispatched with the expected payload (first variant)", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(variant => {
        expect(variant).to.eql(stubVariant);
        return Promise.resolve(testResumeJson);
      });

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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

    it("is dispatched with the expected payload (subsequent page)", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(variant => {
        expect(variant).to.eql(stubVariant);
        return Promise.resolve(testResumeJson);
      });

      stubInitialState = Map({
        api: Map({
          [buildFetchUrlForVariant(stubVariant)]: Map({
            isLoading: false
          })
        }),
        resume: Map({
          resumes: Map({ resume: testResumeJson })
        })
      });
      stubStore = mockStore(stubInitialState);

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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

  describe("FETCHING_RESUME_FAILURE", function () {
    it("is dispatched with the expected payload (no resume)", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(() => Promise.resolve(null));

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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
      ]);
    });

    it("is dispatched with the expected payload (fetch error)", async function () {
      const stubVariant = "test";
      const stubResumeResponse = new Error("woof");
      const proxyquiredFetchResume = loadFetchResumeAction(() => Promise.reject(stubResumeResponse));

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant))
        .then(() => {
          throw new Error("Expected fetchResume to reject");
        })
        .catch(error => {
          expect(error).to.eql(stubResumeResponse);

          expect(stubStore.getActions()).to.eql([
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
          ]);
        });
    });

    it("is dispatched with the expected payload (fetch error but already loaded the resume variant)", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(() => Promise.reject(testResumeJson));

      stubInitialState = Map({
        api: Map({
          [buildFetchUrlForVariant(stubVariant)]: Map({
            isLoading: false,
            variant: stubVariant
          })
        }),
        resume: Map({
          resumes: Map({ [stubVariant]: testResumeJson })
        })
      });
      stubStore = mockStore(stubInitialState);

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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
            error: testResumeJson
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

  describe("FETCHING_RESUME_SUCCESS", function () {
    it("is dispatched with the expected payload", async function () {
      const stubVariant = "test";
      const proxyquiredFetchResume = loadFetchResumeAction(variant => {
        expect(variant).to.eql(stubVariant);
        return Promise.resolve(testResumeJson);
      });

      await stubStore.dispatch(proxyquiredFetchResume.default(stubVariant));

      expect(stubStore.getActions()).to.eql([
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
