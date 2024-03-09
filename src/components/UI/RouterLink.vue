<script setup>
    import  { RouterView} from 'vue-router'
    defineProps({
        to:{
            type:String
        }
    });
</script>
<template>
    <RouterLink :to="{name: to}"
        class="block md:inline-block rounded bg-blue-600 py-2 px-3 text-white text-sm shadow hover:bg-blue-500"
    >
        <slot>
            
        </slot>
    </RouterLink>
</template>



