<template>
  <div>
    <canvas ref="myCanvas" width="600px" height="600px" style="border: solid 1px;">
    </canvas>
    <div class="max-auto file-control">
      <span>Choose Your Input File: </span><input type="file" ref="file" @change="validateFile" />
      <span class='text-danger'>{{this.error}}</span>
    </div>
    <div class="mx-auto notes mt-3">
      <nav><span class='text-success'>Green dot:</span> Starting point (0,0) - always at the centre</nav>
      <nav><span class='text-danger'>Red dot:</span> This is the End point</nav>
      <nav><span class='text-secondary'>Gray dots:</span> Ponts turtle has traveled to once</nav>
      <nav><span class='text-warning'>Orange dots:</span> Points turtle has traveled to more than once unless it's end point</nav>
    </div>
  </div>
</template>

<script>
  import BackendService from "../services/BackendService";
  export default {
    name: "PathDisplayer",

    data() {
      return {
        inputData: "",
        error: "",
        path: {}
      };
    },

    methods: {

      validateFile() {
        this.error = null;
        BackendService.validateFile(this.$refs.file.files[0])
          .then(response => {
            this.inputData = response.data;
          })
          .catch(() => {
            this.error = "Invalid File Type or Content"
          });
        this.$refs.file.type = "text";
        this.$refs.file.type = "file"; 
      },

      getPath() {
        BackendService.getPath({
          input: this.inputData
        }).then(res => {
          this.path = res.data.path;
          this.largestCoord = res.data.largest_coord;
        })
        .catch(e => {
          console.log(e);
        });
      },

      drawPath() {
        const rowCount = this.largestCoord * 2 + 6;
        const canvas = this.$refs.myCanvas;
        const context = canvas.getContext('2d');
        context.clearRect(0, 0, canvas.width, canvas.height);
        const sizeX = canvas.width / rowCount;
        const sizeY = canvas.height / rowCount;
        const radius = sizeX / 2 - 1;

        const draw_dot = (x, y, colour) => {
            context.arc(sizeX * (x+.5), sizeY * (rowCount-(y+.5)), radius, 0, 2 * Math.PI);
            context.fillStyle = colour;
            context.fill();
        } 

        for (let x = 0; x < rowCount; x++) {
          for (let y = 0; y < rowCount ; y++) {

            const x_u = y - rowCount / 2;
            const y_u = x - rowCount / 2;
            context.beginPath();

            const markCode = this.path[`${y_u},${x_u}`];
            if(markCode) {
              let colour = "gray";
              if (markCode === "D") {
                colour = "orange";
              } else if (markCode === "E") {
                colour = "red";
              }
              draw_dot (x, y, colour);
            }
          } 
        }

        draw_dot(rowCount / 2, rowCount / 2, 'green');
      }
    },

    watch: {
      path: function() {
        this.drawPath();
      },
      inputData: function() {
        this.getPath();
      }
    }
  };
</script>

<style>
  #myCanvas {
    border: solid 1px;
  }

  .file-control {
    font-size: 13px;
  }

  .notes {
    width: 460px;
    text-align: left;
    font-size: 13px;
  }
</style>