import {
    buildReduxOfflineConfig,
    ClientSwipeableReduxRouterRoot,
    configureStore,
    createImmutableBlacklistFilter,
    initializeCrispCreator,
    LoadingSpinner,
    logger,
    reduxOfflineImmutableTransformRecords,
    Route,
    setRoutesCreator
} from "@randy.tarampi/jsx";
import {Letter} from "@randy.tarampi/letter";
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
import React, {Component} from "react";
import {hot} from "react-hot-loader";
import {combinedReducers} from "../data/reducers";
import routes from "../routes";

export class App extends Component {
    constructor() {
        super();

        const history = createBrowserHistory();
        const store = configureStore(
            undefined,
            history,
            combinedReducers,
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
                            Route,
                            Letter,
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
                    }
                },
                [
                    createImmutableBlacklistFilter("ui", ["routes"]), // FIXME-RT: Need to not rely on reducing `Component`s and `RegExp`s
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
        />;
    }
}

export default hot(module)(App);
