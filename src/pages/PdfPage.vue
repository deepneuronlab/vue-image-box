<template>
    <div>
        <VueDragResize v-for="table in tables" :key="table.key"
            :isActive="false" 
            :w="table.w" 
            :h="table.h" 
            :x="table.x"
            :y="table.y"
            contentClass="box-shaddow"
            v-on:resizing="(r) => resize(table, r)" 
            v-on:dragging="(r) => resize(table, r)"
        >
        </VueDragResize>
		<img class="page-img" :src="`data/${PageId}.png`" alt="">
	</div>
</template>

<style scoped>
    .box-shaddow {
        background: rgb(100, 0, 100, 0.3);
    }
    .page-img {
        border: 1px solid #c3c3c3;
    }
</style>


<script>
import VueDragResize from 'vue-drag-resize';

export default {
	components: {
        VueDragResize
	},
	props: {
		PageId: {type: String, default: null},
    },
    created() {
        this.getData()
    },
    watch: {
		PageId() {
            this.getData()
        }
	},
    data() {
        return {
            tables: [],
        }
    },
    mounted(){
        },
    methods: {
        resize(table, newRect) {
            table.w = newRect.width
            table.h = newRect.height
            table.y = newRect.top
            table.x = newRect.left
            // sessionStorage.setItem(this.PageId, JSON.stringify(this.tables))
            this.$store.dispatch('addItem', JSON.stringify(this.tables))
        },
        getData() {
            let savedData = sessionStorage.getItem(this.PageId)
            if (savedData) {
                this.tables = JSON.parse(savedData)
                return
            }
            fetch(`data/${this.PageId}.xml`).then(res => res.text())
            .then(xml => {
                console.log(xml)
                var parseString = require('xml2js').parseString;
                parseString(xml, (err, result) => {
                    this.tables = result.annotation.object.map((i, k) => {
                        return {
                            'key': k,
                            'w': Math.ceil((i.bndbox[0].xmax[0] - i.bndbox[0].xmin[0]) / 3.78),
                            'h': Math.ceil((i.bndbox[0].ymax[0] - i.bndbox[0].ymin[0]) / 3.78),
                            'x': Math.ceil(i.bndbox[0].xmin[0] / 3.78),
                            'y': Math.ceil(i.bndbox[0].ymin[0] / 3.78),
                        }
                    })
                })
                this.$store.dispatch('addItem', JSON.stringify(this.tables))
                // sessionStorage.setItem(this.PageId, JSON.stringify(this.tables))
            })
        }
    }
}
</script>
