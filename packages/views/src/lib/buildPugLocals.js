import {Person} from "../../../js/src/index.js";
// NOTE-RT: `config@5.0.0-alpha.2` doesn't declare an `"exports"` map yet, so a bare
// `import config from "config"` would still resolve the package's CJS `"main"` field. This
// file runs directly under plain Node (server-side rendering, not webpack-bundled), so it
// uses the explicit ESM subpath to get config's real ESM entry point.
import config from "config/lib/config.mjs";

export const buildPugLocals = ({packageJson, helmetContent, ...passedLocals}) => {
    const mePerson = config.has("me.person") ? Person.fromJSON(config.get("me.person")) : null;
    const assetUrl = config.has("www.assetUrl") ? config.get("www.assetUrl") : null;

    let meLocals = {};

    if (mePerson) {
        meLocals = {
            pugTitle: `${mePerson.name} — ${mePerson.label}`,
            pugDescription: mePerson.description,
            pageUrl: mePerson.url,
            meJsonLd: JSON.stringify(mePerson.toSchema()),
            meImageUrl: mePerson.image ? mePerson.image : assetUrl + "ʕつ•ᴥ•ʔつ.svg"
        };
    }

    const locals = {
        environment: process.env.NODE_ENV || "local",
        assetUrl,
        feedUrl: config.has("posts.feedUrl") ? config.get("posts.feedUrl") : null,
        logger: config.has("logger") ? JSON.stringify(config.get("logger")) : JSON.stringify(null),
        sentryDsn: config.has("sentry.dsn") ? config.get("sentry.dsn") : null,
        gtmContainerId: config.has("gtm.container.id") ? config.get("gtm.container.id") : null,
        mixpanelAppId: config.has("mixpanel.app.id") ? config.get("mixpanel.app.id") : null,
        locale: "en_CA",
        stylesheetName: "styles.css",
        ...meLocals,
        ...passedLocals
    };

    if (packageJson) {
        locals.version = packageJson.version;
        locals.name = packageJson.name;
    }

    if (helmetContent) {
        locals.injectedBase = helmetContent.base.toString();
        locals.injectedTitle = helmetContent.title.toString();
        locals.injectedLink = helmetContent.link.toString();
        locals.injectedMeta = helmetContent.meta.toString();
        locals.injectedStyle = helmetContent.style.toString();
        locals.injectedScript = helmetContent.script.toString();
        locals.injectedNoScript = helmetContent.noscript.toString();
    }

    return locals;
};

export default buildPugLocals;
