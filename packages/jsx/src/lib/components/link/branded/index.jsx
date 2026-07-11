import {AngelListLink} from "./angelList.jsx";
import {BrandedLink} from "./brandedLink.jsx";
import {F00pxLink} from "./f00px.jsx";
import {FlickrLink} from "./flickr.jsx";
import {GitHubLink} from "./github.jsx";
import {LinkedInLink} from "./linkedIn.jsx";
import {SoundCloudLink} from "./soundCloud.jsx";
import {StackOverflowLink} from "./stackOverflow.jsx";
import {TumblrLink} from "./tumblr.jsx";
import {UnsplashLink} from "./unsplash.jsx";

export * from "./angelList.jsx";
export * from "./f00px.jsx";
export * from "./flickr.jsx";
export * from "./github.jsx";
export * from "./linkedIn.jsx";
export * from "./soundCloud.jsx";
export * from "./stackOverflow.jsx";
export * from "./tumblr.jsx";
export * from "./unsplash.jsx";

export * from "./brandedLink.jsx";

export const brandedLinkMap = {
    angellist: AngelListLink,
    f00px: F00pxLink,
    flickr: FlickrLink,
    github: GitHubLink,
    linkedin: LinkedInLink,
    soundcloud: SoundCloudLink,
    stackoverflow: StackOverflowLink,
    tumblr: TumblrLink,
    unsplash: UnsplashLink
};

export const getBrandedLinkForNetwork = network => {
    return brandedLinkMap[network.toLowerCase()];
};

export default BrandedLink;
