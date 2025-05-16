// directive pour detecter les clicks ailleurs d'un element
export const clickOutside = {
    // methode appele avant insertion de l'element dans le dom
    beforeMount(el, binding) {
        // on definit une fonction
        el.clickOutsideEvent = function(event) {
            if (!((el === event.target) || (el.contains(event.target)))) {
                // si le click ne se trouve pas dans lelement alors on execute la fonction passe en parametres
                binding.value(event)
            }
        };
        // j'ecoute ls clicks dans le dom et je les gere par la fonction au dessus
        document.addEventListener('click', el.clickOutsideEvent)
    },
    // methode appele apres desinsertion de l'element dans le dom
    unmounted(el) {
        document.removeEventListener('click', el.clickOutsideEvent)
    }
}