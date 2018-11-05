import {Person} from "@randy.tarampi/js";
import config from "config";

export const buildPugLocals = ({packageJson, helmetContent, ...passedLocals}) => {
    const mePerson = config.has("me.person") ? Person.fromJSON(config.get("me.person")) : null;
    const meProfiles = config.has("me.profiles") ? config.get("me.profiles") : null;
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

    if (meProfiles) {
        if (meProfiles.Twitter) {
            meLocals.twitterUsername = meProfiles.Twitter.username;
        }

        if (meProfiles.Facebook) {
            meLocals.facebookUsername = meProfiles.Facebook.username;
            meLocals.facebookUserId = meProfiles.Facebook.userId;
        }
    }

    const locals = {
        environment: process.env.NODE_ENV || "local",
        assetUrl,
        logger: config.has("logger") ? JSON.stringify(config.get("logger")) : JSON.stringify(null),
        sentryDsn: config.has("sentry.dsn") ? config.get("sentry.dsn") : null,
        gtmContainerId: config.has("gtm.container.id") ? config.get("gtm.container.id") : null,
        gaPropertyId: config.has("ga.property.id") ? config.get("ga.property.id") : null,
        mixpanelAppId: config.has("mixpanel.app.id") ? config.get("mixpanel.app.id") : null,
        facebookAppId: config.has("facebook.app.id") ? config.get("facebook.app.id") : null,
        locale: "en_CA",
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
