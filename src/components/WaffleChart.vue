<template>
  <div class="container">
    <div v-for="(product, productIndex) in products" :key="productIndex" class="rectangle" :id="'div_' + product.name">
    </div>
    <div class="graph">
      <div v-for="(value, index) in z" :key="index" class="graph-item">
        <div :style="{ backgroundColor: getColor(index) }" class="graph-color"></div>
        <div class="graph-label">{{ value }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      x: ['Serie1', 'Serie2', 'Serie3', 'Serie4'],
      y: [[2, 3, 4], [11, 34, 40], [5, 5, 15], [6, 9, 14]],
      z: ['A', 'B', 'C'],
      colors: ['#2f4077', '#447049', '#6e445a', '#FF33F6', '#F633FF']
    }
  },
  computed: {
    products () {
      return this.x.map((name, index) => ({
        name,
        quantity: this.y[index]
      }))
    }
  },
  methods: {
    adddiv () {
      for (let i = 0; i < this.x.length; i++) {
        const parentElement = document.getElementById('div_' + this.x[i])
        for (let j = 0; j < this.y[i].length; j++) {
          for (let k = 0; k < this.y[i][j]; k++) {
            const div = document.createElement('div')
            div.id = 'square_' + this.x[i] + '_' + j + '_' + k
            div.className = 'square'
            div.style.backgroundColor = this.getColor(j)
            div.style.width = '15px'
            div.style.height = '15px'
            div.style.display = 'inline-grid'
            div.style.margin = '2px'
            div.style.borderRadius = '15px'
            div.style.verticalAlign = 'top'
            div.style.direction = 'ltr'
            parentElement.appendChild(div)
          }
        }
        // const xLabel = document.createElement('span')
        // xLabel.className = 'x-label'
        // xLabel.textContent = this.x[i]
        // xLabel.style.marginTop = '15px'
        // parentElement.appendChild(xLabel)
        // xLabel.style.transform = 'rotate(180deg)'
      }
    },
    getColor (index) {
      return this.colors[index % this.colors.length]
    }
  },
  mounted () {
    this.adddiv()
  }
}
</script>

<style scoped>

.rectangle {
  display: inline-block;
  max-width: 100px;
  margin: 15px;
  transform: rotate(180deg);
}

.square {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  display: inline-block;
  margin: 2px;
}
.x-axis {
  border-top: 2px solid black;
  max-width: 100px;
  margin: 10px 0;
}

.x-label {
  font-size: 18px;
  display: flex;
  max-width: 100px;
  margin: 40px;
}

.graph {
  display: flex;
  align-items: center;
  margin-top: 20px;
}

.graph-item {
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.graph-color {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  margin-right: 5px;
}

.graph-label {
  font-size: 16px;
}

</style>
