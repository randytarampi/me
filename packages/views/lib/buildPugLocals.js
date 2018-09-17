import {Person} from "@randy.tarampi/js";
import config from "config";

export const buildPugLocals = ({packageJson, helmetContent, ...passedLocals}) => {
    const mePerson = Person.fromJSON(config.get("me.person"));
    const meProfiles = config.get("me.profiles");

    const meLocals = {
        pugTitle: `${mePerson.name} — ${mePerson.label}`,
        pugDescription: mePerson.description,
        pugUrl: mePerson.url,
        meJsonLd: JSON.stringify(mePerson.toSchema())
    };

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
        assetUrl: config.get("www.assetUrl"),
        sentryDsn: config.get("sentryDsn"),
        gtm: config.get("gtm"),
        logger: JSON.stringify(config.get("logger")),
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
