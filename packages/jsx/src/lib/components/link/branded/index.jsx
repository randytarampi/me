import {AngelListLink} from "./angelList";
import {BrandedLink} from "./brandedLink";
import {F00pxLink} from "./f00px";
import {FacebookLink} from "./facebook";
import {FlickrLink} from "./flickr";
import {GitHubLink} from "./github";
import {InstagramLink} from "./instagram";
import {LinkedInLink} from "./linkedIn";
import {SoundCloudLink} from "./soundCloud";
import {StackOverflowLink} from "./stackOverflow";
import {TwitterLink} from "./twitter";
import {UnsplashLink} from "./unsplash";

export * from "./angelList";
export * from "./f00px";
export * from "./facebook";
export * from "./flickr";
export * from "./github";
export * from "./instagram";
export * from "./linkedIn";
export * from "./soundCloud";
export * from "./stackOverflow";
export * from "./twitter";
export * from "./unsplash";

export * from "./brandedLink";

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
    twitter: TwitterLink,
    unsplash: UnsplashLink
};

export const getBrandedLinkForNetwork = network => {
    return brandedLinkMap[network.toLowerCase()];
};

export default BrandedLink;
