import {
    buildReduxOfflineConfig,
    ClientSwipeableReduxRouterRoot,
    configureOfflineStore,
    createImmutableBlacklistFilter,
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
import React, {PureComponent} from "react";
import {hot} from "react-hot-loader";
import {reducers} from "../data/reducers";
import routes from "../routes";

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
                    }
                },
                [
                    createImmutableBlacklistFilter("ui", ["routes"]) // FIXME-RT: Need to not rely on reducing `PureComponent`s and `RegExp`s
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
