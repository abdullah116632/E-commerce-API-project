const publicIdWithoutExtensionFrmUrl = async (imageUrl) => {
    const pathSegment = imageUrl.split("/");

    const lastSegment = pathSegment[pathSegment.length - 1]
    const idSegment = lastSegment.split(".");
    const publicId = idSegment[0];

    return publicId;
}

module.exports  = publicIdWithoutExtensionFrmUrl;