<template>
    <div>
        <button id="closeGameButton" @click="goBack">
            <svg fill="#ffffff" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 476.213 476.213" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <polygon
                        points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107 ">
                    </polygon>
                </g>
            </svg>
        </button>
        <div id="scoreDisplay">Score: 0</div>
        <div id="unity-container" class="unity-desktop">
            <canvas id="unity-canvas" width=960 height=600 tabindex="-1"
                style="background: url('/secondGame/secondGame.jpg') center / cover"></canvas>
        </div>
    </div>
</template>

<script>
import { initializeUnity } from '@/helpers/UnityLogic';

export default {
    name: 'UnityGame',
    mounted() {
        initializeUnity('#unity-canvas', 'secondGame');
    },
    methods: {
        goBack() {
            this.$emit('go-back');
        }
    }
}
</script>

<style scoped>
button {
    position: absolute;
    z-index: 99;
    margin-top: 4vh;
    margin-left: 1vw;
}

#scoreDisplay {
    color: red;
    font-size: 50px;
    font-weight: bold;
    font-family: sans-serif;
    display: none;
}

#unity-container {
    position: relative;
}

#unity-container.unity-mobile {
    position: fixed;
    width: 100%;
    height: 100%
}

.unity-mobile #unity-canvas {
    width: 100%;
    height: 100%
}
</style>