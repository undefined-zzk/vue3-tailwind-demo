<template>
    <div class="min-h-screen w-full p-5 gap-5 grid grid-cols-auto">
        <div v-for="item in demoList" :key="item.id"
            class="group flex border rounded overflow-hidden  border-purple-100 size-[150px] flex-col items-center justify-center cursor-pointer select-none hover:border-2 hover:border-purple-300 transition-all hover:shadow hover:text-purple-400 hover:font-bold"
            @click="toOppositePage(item)">
            <SvgIcon :name="item.icon" />
            <span class="transition-all group-hover:scale-110 group-hover:skew-y-1 group-hover:underline">{{
                item.name }}</span>
        </div>
    </div>
</template>
<script setup>
import { nanoid } from 'nanoid'
const router = useRouter()
const demoList = router.getRoutes().map(item => ({ id: nanoid(), name: item.meta.title, path: item.path, icon: item.meta.icon, hidden: item.meta.hidden })).filter(item => (item.path != '/' && !item.hidden))

// 跳转到对应的单独页面
const toOppositePage = (item) => {
    router.push(item.path)
}

</script>
<style lang="scss" scoped></style>