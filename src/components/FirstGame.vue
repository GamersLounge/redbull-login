<template>
    <div>
        <button id="closeGameButton" @click="goBack">
            <svg fill="#000000" height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 476.213 476.213" xml:space="preserve">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                <g id="SVGRepo_iconCarrier">
                    <polygon
                        points="476.213,223.107 57.427,223.107 151.82,128.713 130.607,107.5 0,238.106 130.607,368.714 151.82,347.5 57.427,253.107 476.213,253.107">
                    </polygon>
                </g>
            </svg>
        </button>
        <div id="scoreDisplay">0</div>
        <div id="unity-container" class="unity-desktop">
            <canvas id="unity-canvas" width="960" height="600" tabindex="-1"></canvas>
            <div id="unity-loading-bar">
                <div id="unity-logo"></div>
                <div id="unity-progress-bar-empty">
                    <div id="unity-progress-bar-full"></div>
                </div>
            </div>
            <div id="unity-warning"></div>
        </div>
    </div>
</template>

<script>
import { initializeUnity } from '@/helpers/UnityLogic';
import { useProfileStore, useScoreStore } from '@/stores';
import { mapActions } from 'pinia';

export default {
    name: 'UnityGame',

    data() {
        return {
            userData: null,
            score: 0,
        };
    },

    mounted() {
        initializeUnity('#unity-canvas', 'firstGame');
        this.getData();

        setInterval(() => {
            this.score = Number(document.getElementById('scoreDisplay').innerText);
        }, 1000);
    },

    computed: {
        // Computed property to display the formatted score
        formattedScore() {
            return this.score
        }
    },

    watch: {
        // Watcher for score changes
        score(newScore) {
            if(newScore > 0) {
                this.setGameWinScore(this.userData.id, 1, this.score)
            }
        }
    },

    methods: {
        ...mapActions(useProfileStore, ['getProfile']),
        ...mapActions(useScoreStore, ['setGameWinScore']),

        goBack() {
            this.$emit('go-back');
        },

        async getData() {
            this.userData = await this.getProfile();
        }
    },
};
</script>

<style scoped>
button {
    position: absolute;
    z-index: 99;
    right: 5vw;
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

#unity-loading-bar {
    display: none;
}

#unity-container.unity-mobile {
    position: fixed;
    width: 100%;
    height: 95%
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