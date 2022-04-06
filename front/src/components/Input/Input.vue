<template>
    <span class="super-input">
        <label><slot /></label>
        <input :value="value" @input="$emit('input', $event)" :type="type" class="input" :placeholder="placeholder">
    </span>
</template>

<script src="./Input.js"></script>
<style src="./Input.css" scoped></style>