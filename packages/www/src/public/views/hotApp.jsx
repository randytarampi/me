import {
    buildReduxOfflineConfig,
    ClientSwipeableReduxRouterRoot,
    configureOfflineStore,
    createImmutableFilter,
    initializeCrispCreator,
    LoadingSpinner,
    logger,
    reduxOfflineImmutableTransformRecords,
    setRoutesCreator
} from "@randy.tarampi/jsx";
import {Letter, LetterSection} from "@randy.tarampi/letter";
import {
    Award,
    Education,
    Interest,
    Language,
    Project,
    Publication,
    Reference,
    Resume,
    ResumeCustomContent,
    ResumeCustomPrintableFooterContent,
    ResumeCustomPrintableSectionContent,
    Skill,
    Volunteer,
    Work
} from "@randy.tarampi/resume";
import {createBrowserHistory} from "history";
import {Map} from "immutable";
import React, {PureComponent} from "react";
import {reducers} from "../data/reducers.js";
import routes from "../routes/index.jsx";

export class App extends PureComponent {
    constructor() {
        super();

        const history = createBrowserHistory();
        const store = configureOfflineStore(
            undefined,
            history,
            reducers,
            undefined,
            buildReduxOfflineConfig(
                {
                    persistCallback: () => {
                        logger.debug("Rehydrated state!");

                        if (window.$crisp) {
                            store.dispatch(initializeCrispCreator(window.$crisp));
                        }

                        store.dispatch(setRoutesCreator(routes));

                        this.setState({rehydrated: true});
                    },
                    persistOptions: {
                        records: reduxOfflineImmutableTransformRecords.concat([
                            Letter,
                            LetterSection,
                            Award,
                            Education,
                            Interest,
                            Language,
                            Project,
                            Publication,
                            Reference,
                            Resume,
                            ResumeCustomContent,
                            ResumeCustomPrintableFooterContent,
                            ResumeCustomPrintableSectionContent,
                            Skill,
                            Volunteer,
                            Work
                        ])
                    },
                },
                [
                    createImmutableFilter("resume", null, [
                        {
                            // NOTE-RT: must be an array (an actual Immutable `getIn` key-path), not a bare
                            // NOTE-RT: string - `redux-persist-transform-filter-immutable`'s `filterObject`
                            // NOTE-RT: helper calls `state.getIn(path)` with this value as-is, and Immutable's
                            // NOTE-RT: `getIn` throws "Invalid keyPath: expected Ordered Collection or Array"
                            // NOTE-RT: for anything else.
                            path: ["resumes"],
                            filterFunction: resumes => resumes instanceof Map
                        }
                    ]),
                    createImmutableFilter("letter", null, [
                        {
                            path: ["letters"],
                            filterFunction: letters => letters instanceof Map
                        }
                    ])
                ]
            )
        );

        this.state = {
            store,
            history,
            rehydrated: false
        };
    }

    render() {
        if (!this.state.rehydrated) {
            return <LoadingSpinner/>;
        }

        return <ClientSwipeableReduxRouterRoot
            history={this.state.history}
            routes={routes}
            store={this.state.store}
            swipeableRoutesProps={{
                disabled: true
            }}
        />;
    }
}

export default App;
