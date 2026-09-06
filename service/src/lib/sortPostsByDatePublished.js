const sortPostsByDatePublished = (leftPost, rightPost) => {
    const dateDifference = rightPost.datePublished.valueOf() - leftPost.datePublished.valueOf();

    return dateDifference || String(rightPost.uid).localeCompare(String(leftPost.uid));
};

export default sortPostsByDatePublished;

export {sortPostsByDatePublished};
