<template>
<div class="container">
    <!-- Sidebar -->
    <aside class="container__sidebar">
        ...
    </aside>

    <!-- Main -->
    <main class="container__main">
        ...
    </main>
</div>
</template>
<script>
export default {
    setup() {
        
    },
}
</script>
<style lang="scss" scoped>
container {
                        display: flex;
                    }

                    .container__sidebar {
                        width: 30%;
                    }

                    .container__main {
                        /* Take the remaining width */
                        flex: 1;

                        /* Make it scrollable */
                        overflow: auto;
                    }
</style>