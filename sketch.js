/// <reference path="types/p5.global-mode.d.ts" />

let tiles;
let w = 80;
let h = 55;
let num;
let tentativas = 0;
let count;
let win = false;
let resetBtn;

function make2DArray(cols, rows) {
    let arr = new Array(cols);
    for (let i = 0; i < arr.length; i++) {
        arr[i] = new Array(rows);
    }

    return arr;
}

function setup() {
    resetBtn = createButton("R");
    resetBtn.addClass("reset");
    createCanvas(w * 10 + 1, h * 10 + 1).center("horizontal");
    count = createP(tentativas.toString());
    count.addClass("counter");
    resetBtn.mouseClicked(() => {
        win = false;
        tentativas = 0;
        count.html(tentativas);

        for (let x = 0; x < 10; x++) {
            for (let y = 0; y < 10; y++) {
                tiles[x][y] = new Tile(x, y, w, h);
            }
        }   
    });

    tiles = make2DArray(10, 10);

    for (let x = 0; x < 10; x++) {
        for (let y = 0; y < 10; y++) {
            tiles[x][y] = new Tile(x, y, w, h);
        }
    }

    num = floor(random(1, 100));
}

function draw() {
    background(240);

    for (let i = 0; i < tiles.length; i++) {
        for (let j = 0; j < tiles[i].length; j++) {
            tiles[i][j].show();
        }
    }
}

function validateTilePos(x, y) {
    const x_v = x >= 0 && x <= 9;
    const y_v = y >= 0 && y <= 9;
    return x_v && y_v; 
}

function mousePressed() {
    if (!win) {
        let x = floor(mouseX * 10 / width);
        let y = floor(mouseY * 10 / height);
        
        if (validateTilePos(x, y)) {
            let tile = tiles[x][y];

            tiles[x][y].onClick(num)
                .then(res => {
                    tentativas++;
                    count.html(tentativas);
                    win = res;
                });
        }
    }
}
