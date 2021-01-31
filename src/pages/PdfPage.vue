<template lang="pug">
    div(class="pdfPage container")
        Modal(
            :dialogVisibleSync="createLabelModalVisible"
            title="Create your Modal"
            primaryButtonLabel= "Save"
            secondaryButtonLabel= "Cancel"
            @secondaryButtonClicked= "closeModal"
        )
            p.subtitle Please enter your label in both languages
        div(class="pdfPage__options is-flex")
            select(name="labels" id="labels" :disabled="existingCovers.length>5" v-model="labelValue" class="select is-info")
                option(value="" selected disabled hidden) Select Label
                option(v-for="label in labels" :key='label.id' :value="label[selectedUserLanguage]") {{label[selectedUserLanguage]}}
                option(value="costum") Costum...
            select(name="userLanguage" id="userLanguage" @change="setLanguage" class="select is-info")
                option(v-for="language in userLanguages" :selected="language=== selectedUserLanguage " :key='language' :value="language") {{language}}
            div(class="pdfPage__labels is-flex" v-for="(cover, index) in existingCovers" :style="{backgroundColor: colors[index]}" :key="cover.key") 
                span(class="pdfPage__labels-close" @click="removeCover(cover.key)") X
                p {{cover.label}}
        div(class="pdfPage__cover conrainer" ref="parent")
            VueDragResize(
                v-for="(table, index) in existingCovers" :key="`${table.key}-${index}`"
                :w="table.w" 
                :h="table.h" 
                :x="table.x"
                :y="table.y"
                :parentW="parentWidth"
                :parentH="parentHeight"
                :parentLimitation="true"
                :aspectRatio="true"
                :stickSize="10"
                :data-label="table.label"
                :style="{backgroundColor: colors[index]}"
                contentClass="pdfPage__cover-shaddow"
                @resizestop="(r) => resize(table, r)" 
                @dragstop="(r) => resize(table, r)"
            )
            img(class="pdfPage__img" :src="`data/${PageId}.png`" :alt="PageId")
</template>

<script>
import VueDragResize from 'vue-drag-resize';
import { commonData, commonMethods } from '@/lib/mixins'
import Modal from '@/components/Modal'

export default {
    components: {
        VueDragResize,
        Modal
	},
	props: {
        PageId: {type: String, default: null},
    },
    data(){
        return{
            createLabelModalVisible: false,
            labelValue: '',
            parentHeight: 0,
            parentWidth: 0
        }
    },
    created() {
        this.getData() 
        if(!this.labels.length){
            fetch(`data/labels.json`).then(res => res.json()).then(data=>{
                this.$store.dispatch('addLabels', data.labels)
            }).catch(e=>console.log(e))
        } 
    },
    watch: {
		PageId() {
            this.getData()
        },
        labelValue(value) {
            if(value === 'costum'){
                this.createLabelModalVisible = true
            } else if(value!== '') {
                this.$store.dispatch('addBoxCover', {id: this.PageId, label: value })
                this.labelValue = ''
            }
        }
    },
    mounted(){
        setTimeout(()=>{
            this.parentHeight = this.$refs.parent.clientHeight
            this.parentWidth = this.$refs.parent.clientWidth
        },100)
    },
    updated(){
        setTimeout(()=>{
            this.parentHeight = this.$refs.parent.clientHeight
            this.parentWidth = this.$refs.parent.clientWidth
        },100)
    },
    mixins: [commonData, commonMethods],
    methods: {
        resize(table, newRect) {
            table.w = newRect.width
            table.h = newRect.height
            table.y = newRect.top
            table.x = newRect.left
            const key = table.key
            const coords = {
                x: newRect.left,
                y: newRect.top,
                h: newRect.height,
                w: newRect.width
            }
            this.$store.dispatch('modifyBoxCover', {id: this.PageId, cover:{key, ...coords}})
        },
        getData() {
            if (this.existingImage) return
            fetch(`data/${this.PageId}.xml`).then(res => res.text())
            .then(xml => {
                var parseString = require('xml2js').parseString;
                let covers = null
                parseString(xml, (err, result) => {
                    covers = result.annotation.object.map((i, index) => {
                        return {
                            'key': `${i.name[0]}${-index}`,
                            'label': i.name[0],
                            'w': Math.ceil((i.bndbox[0].xmax[0] - i.bndbox[0].xmin[0]) / 3.78),
                            'h': Math.ceil((i.bndbox[0].ymax[0] - i.bndbox[0].ymin[0]) / 3.78),
                            'x': Math.ceil(i.bndbox[0].xmin[0] / 3.78),
                            'y': Math.ceil(i.bndbox[0].ymin[0] / 3.78),
                        }
                    })
                })
                return covers
            }).then((covers)=>{
                this.$store.dispatch('addBoxCover', {id: this.PageId, covers})
            }).catch(e=> console.log(e))
        },
        closeModal() {
            this.createLabelModalVisible = false
            this.labelValue = ""
        },
        removeCover(key) {
            this.$store.dispatch('removeBoxCover', {id: this.PageId, coverKey: key})
        },
        openLabelModel() {
            this.createLabelModalVisible = true
        }
    }
}
</script>

<style scoped lang="sass">
.pdfPage
    margin: 1rem auto

    &__options
        align-items: center
        height: 4rem
        margin-bottom: 1rem
        border: 1px solid grey
        background-color: #fcf2f2
        border-radius: .2rem

        & > *
            margin-left: 1rem

    &__labels
        border: 1px solid black
        padding: 0 .5rem
        border-radius: .5rem

        &-close
            margin: 0 .5rem 0 0
            border-radius: .5rem
            cursor: pointer

    &__cover
        position: relative

        &-shaddow
            &::before
                font-size: 2rem
                color: green
                height: 100%
                width: 100%
                display: flex
                justify-content: center
                align-items: center
                content: attr(data-label)

    &__img 
        border: 1px solid #c3c3c3
</style>