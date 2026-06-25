import {AngelListLink} from "./angelList.jsx";
import {BrandedLink} from "./brandedLink.jsx";
import {F00pxLink} from "./f00px.jsx";
import {FacebookLink} from "./facebook.jsx";
import {FlickrLink} from "./flickr.jsx";
import {GitHubLink} from "./github.jsx";
import {InstagramLink} from "./instagram.jsx";
import {LinkedInLink} from "./linkedIn.jsx";
import {SoundCloudLink} from "./soundCloud.jsx";
import {StackOverflowLink} from "./stackOverflow.jsx";
import {TumblrLink} from "./tumblr.jsx";
import {TwitterLink} from "./twitter.jsx";
import {UnsplashLink} from "./unsplash.jsx";

export * from "./angelList.jsx";
export * from "./f00px.jsx";
export * from "./facebook.jsx";
export * from "./flickr.jsx";
export * from "./github.jsx";
export * from "./instagram.jsx";
export * from "./linkedIn.jsx";
export * from "./soundCloud.jsx";
export * from "./stackOverflow.jsx";
export * from "./tumblr.jsx";
export * from "./twitter.jsx";
export * from "./unsplash.jsx";

export * from "./brandedLink.jsx";

export const brandedLinkMap = {
    angellist: AngelListLink,
    f00px: F00pxLink,
    facebook: FacebookLink,
    flickr: FlickrLink,
    github: GitHubLink,
    instagram: InstagramLink,
    linkedin: LinkedInLink,
    soundcloud: SoundCloudLink,
    stackoverflow: StackOverflowLink,
    tumblr: TumblrLink,
    twitter: TwitterLink,
    unsplash: UnsplashLink
};

export const getBrandedLinkForNetwork = network => {
    return brandedLinkMap[network.toLowerCase()];
};

export default BrandedLink;
