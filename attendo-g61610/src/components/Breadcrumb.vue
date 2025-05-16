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
        // je regarde si les routes existent, si cest le cas je les mets dans l'array
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
        // regarde si une route existe, desavantage cest que ca mets un warning dans la console
        routeExists(path) {
            const resolved = this.$router.resolve(path);
            return resolved
        },

        // retoure un array avec les paths, si on recoit /session/23 il retourne ['/session', '/session/23']
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