<template>
    <ul class="flex">
        <li v-for="(element, index) in elements" :key="index" class="flex items-center">
            <RouterLink
            :to="element.fullPath"
            class="hover:underline"
            :class="index < elements.length - 1 ? 'text-blue-500' : 'text-gray-500'"
            >
                {{ element.meta.breadcrumb }}
            </RouterLink>
            <span v-if="index < elements.length - 1" class="mx-2">/</span>
        </li>
    </ul>
</template>
  
<script>
  export default {
    data() {
      return {
        currentPath: this.$route.path,
        breadArray: []
      };
    },
    computed: {
      currentRoute() {
        return this.$route;
      },
      elements() {
        let paths = this.generatePaths(this.$route.path)
        return paths.reduce((acc, path) => {
            const resolved = this.routeExists(path)
            if (resolved.matched.length > 0) {
                acc.push(resolved);
            }
            return acc
        }, [])
      }
    },
    methods: {
        routeExists(path) {
            const resolved = this.$router.resolve(path);
            return resolved
        },

        generatePaths(path) {
            const parts = path.replace(/^\/|\/$/g, '').split('/');

            const paths = [];
            for (let i = 1; i <= parts.length; i++) {
                paths.push('/' + parts.slice(0, i).join('/'));
            }

            return paths;
        }
    }
  }
</script>