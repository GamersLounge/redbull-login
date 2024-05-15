<template>

  <!--Shape-->
  <svg class="logo" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">

    <g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2">

      <path class="outer-path"
            d="M19.875 6.27A2.225 2.225 0 0 1 21 8.218v7.284c0 .809-.443 1.555-1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1-2.184 0l-6.75-4.27A2.225 2.225 0 0 1 3 15.502V8.217c0-.809.443-1.554 1.158-1.947l6.75-3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z" />

      <path class="inner-path" d="M9 16V8l3 5l3-5v8" />

    </g>

  </svg>

</template>

<script>

export default {
  name: "AppLogo"
};

</script>

<style scoped>

.logo {
  width: 40px;
  stroke: #f2f2f2;
}

.logo .outer-path {
  stroke-dashoffset: 0;
  stroke-dasharray: 60;
  transform-origin: center;
}

.logo .inner-path {
  stroke-dashoffset: 0;
  stroke-dasharray: 28;
  transform-origin: center;
}

.outer-path {
  /* @apply group-hover:animate-[outer-animation_2s_ease-in-out_forwards]; */
}


.logo:hover .inner-path {

  animation: inner-animation .5s ease-in-out;
}

@keyframes outer-animation {

  0% {
    stroke-dashoffset: 0;
  }

  30% {
    stroke-dashoffset: 60;
  }

  60% {
    stroke-dashoffset: 120;
    transform: scale(1);
  }

  70% {
    stroke-dashoffset: 120;
  }

  80% {
    transform: scale(1.1);
  }

  90% {
    transform: scale(1);
  }

  100% {
    stroke-dashoffset: 120;
  }
}

@keyframes inner-animation {

  0% {
    stroke-dashoffset: -28;
  }

  100% {
    stroke-dashoffset: 0;
  }
}

@keyframes inner-animation-old {


  0% {
    stroke-dashoffset: -28;
  }

  30% {
    stroke-dashoffset: -28;
  }

  60% {
    stroke-dashoffset: 0;
    transform: scale(1);
  }

  70% {
    stroke-dashoffset: 0;
  }

  80% {
    transform: scale(1.1);
  }

  90% {
    transform: scale(1);
  }

  100% {
    stroke-dashoffset: 0;
  }
}

</style>
