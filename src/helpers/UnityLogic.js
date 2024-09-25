// unityLogic.js
export function initializeUnity(canvasId, gameName) {
    // Move the function declaration to the root of the initializeUnity function
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

    // Check if gameName is "Build" before executing the rest of the code
    if (gameName === "firstGame") {
        let unityInstance;

        window.addEventListener("load", function () {
            if ("serviceWorker" in navigator) {
                navigator.serviceWorker.register("/ServiceWorker.js");
            }
        });

        // Close Game button functionality
        document.getElementById("closeGameButton").addEventListener("click", function () {
            // Stop the Unity instance
            if (unityInstance) {
                unityInstance.Quit(); // Call the Unity function to quit
            }
            // Optionally, remove the canvas and other elements
            const container = document.getElementById("unity-container");
            container.style.display = "none"; // Hide the game container
        });


        const canvas = document.querySelector(canvasId);

        const buildUrl = `/${gameName}`;
        const loaderUrl = buildUrl + "/Game.loader.js";
        const config = {
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
            const meta = document.createElement('meta');
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

        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(canvas, config, (progress) => {
                document.querySelector("#unity-progress-bar-full").style.width = 100 * progress + "%";
            }).then((instance) => {
                unityInstance = instance; // Store the instance to stop it later
                document.querySelector("#unity-loading-bar").style.display = "none";
            }).catch((message) => {
                alert(message);
            });
        };
        document.body.appendChild(script);
    }
    else if (gameName == "secondGame") {
        let unityInstance;
        // Close Game button functionality
        document.getElementById("closeGameButton").addEventListener("click", function () {
            // Stop the Unity instance
            if (unityInstance) {
                unityInstance.Quit(); // Call the Unity function to quit
            }
            // Optionally, remove the canvas and other elements
            const container = document.getElementById("unity-container");
            container.style.display = "none"; // Hide the game container
        });
        const canvas = document.querySelector("#unity-canvas");
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            // Mobile device style: fill the whole browser client area with the game canvas:
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
            document.getElementsByTagName('head')[0].appendChild(meta);
            document.querySelector("#unity-container").className = "unity-mobile";
            canvas.className = "unity-mobile";
        } else {
            canvas.style.width = "1920px";
            canvas.style.height = "1080px";
            // canvas.style.position = "fixed";

            // document.body.style.textAlign = "left";
        }

        const buildUrl = `/${gameName}`;
        const loaderUrl = buildUrl + "/secondGame.loader.js";
        const script = document.createElement("script");
        script.src = loaderUrl;
        script.onload = () => {
            createUnityInstance(document.querySelector("#unity-canvas"), {
                arguments: [],
                dataUrl: buildUrl + "/secondGame.data",
                frameworkUrl: buildUrl + "/secondGame.framework.js",
                codeUrl: buildUrl + "/secondGame.wasm",
                streamingAssetsUrl: "StreamingAssets",
                companyName: "Hyperparticle",
                productName: "Nodulus",
                productVersion: "1.1.1",
                // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
                // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
            }).catch((message) => {
                alert(message);
            });
        };
        document.body.appendChild(script);
    }
}