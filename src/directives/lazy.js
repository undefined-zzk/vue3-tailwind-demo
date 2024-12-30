import { gsap } from "gsap-trial";
// 图片懒加载
export const lazy = {
    mounted(el, binding) {
        const observe= new IntersectionObserver(entries => {
            entries.forEach(ob => {
                if (ob.isIntersecting) {
                    el.src = binding.value
                    observe.disconnect(el)
               }
           })
        })
        observe.observe(el)
        el.addEventListener('error', () => { 
            setTimeout(() => {
                   el.src = `https://picsum.photos/id/${Math.floor(gsap.utils.random(800, 2000))}/400/300`
              },2000)
        })
    }
}

