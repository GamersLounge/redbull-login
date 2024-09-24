// unityLogic.js
export function initializeUnity(canvasId) {
    var canvas = document.querySelector(canvasId);

    function unityShowBanner(msg, type) {
        var warningBanner = document.querySelector("#unity-warning");
        function updateBannerVisibility() {
            warningBanner.style.display = warningBanner.children.length ? 'block' : 'none';
        }
        var div = document.createElement('div');
        div.innerHTML = msg;
        warningBanner.appendChild(div);
        if (type == 'error') div.style = 'background: red; padding: 10px;';
        else {
            if (type == 'warning') div.style = 'background: yellow; padding: 10px;';
            setTimeout(function () {
                warningBanner.removeChild(div);
                updateBannerVisibility();
            }, 5000);
        }
        updateBannerVisibility();
    }

    var buildUrl = "/Build";
    var loaderUrl = buildUrl + "/Game.loader.js";
    var config = {
        arguments: [],
        dataUrl: buildUrl + "/Game.data",
        frameworkUrl: buildUrl + "/Game.framework.js",
        codeUrl: buildUrl + "/Game.wasm",
        streamingAssetsUrl: "StreamingAssets",
        companyName: "EugenyN",
        productName: "AmazingTrack",
        productVersion: "0.4",
        showBanner: unityShowBanner,
    };

    if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
        var meta = document.createElement('meta');
        meta.name = 'viewport';
        meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
        document.getElementsByTagName('head')[0].appendChild(meta);
        document.querySelector("#unity-container").className = "unity-mobile";
        canvas.className = "unity-mobile";
    } else {
        canvas.style.width = "1920px";
        canvas.style.height = "1080px";
    }

    canvas.style.background = "url('" + buildUrl + "/Game.jpg') center / cover";
    document.querySelector("#unity-loading-bar").style.display = "block";

    var script = document.createElement("script");
    script.src = loaderUrl;
    script.onload = () => {
        createUnityInstance(canvas, config, (progress) => {
            document.querySelector("#unity-progress-bar-full").style.width = 100 * progress + "%";
        }).then((unityInstance) => {
            document.querySelector("#unity-loading-bar").style.display = "none";
            document.querySelector("#unity-fullscreen-button").onclick = () => {
                unityInstance.SetFullscreen(1);
            };
        }).catch((message) => {
            alert(message);
        });
    };
    document.body.appendChild(script);
}
