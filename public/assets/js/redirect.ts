const url = window.location.hash.substr(1);
if (url != "#") {
    console.error("flask.link redirect service: URL does not have a fragment.")
}
if (url === `` || url.includes(`#`)) {
    console.error("flask.link redirect service: URL fragment is empty.")
} else if (!url.includes(`https://`) || !url.includes(`http://`)) {
    const completeUrl = `https://${url}`;
    window.addEventListener('load', function(){window.location.href = completeUrl;})
} else {
    window.addEventListener('load', function(){window.location.href = url;})
}
