<template>
    <div>
        <!-- <div id="scoreDisplay">Score: 0</div> -->
        <div id="unity-container" class="unity-desktop">
            <canvas id="unity-canvas" width="960" height="600" tabindex="-1"></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-warning"></div>
            <div id="unity-footer">
                <div id="unity-logo-title-footer"></div>
                <div id="unity-fullscreen-button"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { initializeUnity } from '@/helpers/UnityLogic';

export default {
    name: 'UnityGame',
    mounted() {
        initializeUnity('#unity-canvas');
    }
}
</script>

<style scoped>
#scoreDisplay {
    color: red;
    font-size: 50px;
    font-weight: bold;
    font-family: sans-serif;
}

#unity-container {
    position: relative;
}

#unity-loading-bar {
    display: none;
}

#unity-container.unity-mobile {
    position: fixed;
    width: 100%;
    height: 100%
}

#unity-canvas {
    background: #804446
}

.unity-mobile #unity-canvas {
    width: 100%;
    height: 100%
}

#unity-loading-bar {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: none
}

#unity-footer {
    position: relative
}

.unity-mobile #unity-footer {
    display: none
}

#unity-build-title {
    float: right;
    margin-right: 10px;
    line-height: 38px;
    font-family: arial;
    font-size: 18px
}

#unity-warning {
    position: absolute;
    left: 50%;
    top: 5%;
    transform: translate(-50%);
    background: white;
    padding: 10px;
    display: none
}
</style>