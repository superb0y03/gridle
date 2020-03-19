/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function clear() {
    this.div = document.getElementById("main");
    div.innerHTML = "";
}
var num = 0;
var grid = [];
const adjNum = 1;
const adjMult = 0.1;
function gridBlock() {
    this.cost = 0;
    this.level = 0;
    this.adjacencyBonus = 0;  
};
var gridPhyses = [];
function MainGrid() {
    this.numCount = document.createElement("TEXT");
    this.numCount.id = "numCount";
    this.div = document.getElementById("main");
    this.div.appendChild(this.numCount);
    saveB = generateOtherButton(0, 10, function(){save()}, "save", "Save");
    loadB = generateOtherButton(1, 10, function(){clear()}, "clear", "Clear");
    for(var i = 0; i < 9; i++) {
        grid[i] = [];
        gridPhyses[i] = [];
        for(var j = 0; j < 9; j++) {
            grid[i][j] = new gridBlock();
            grid[i][j].cost = ((i + 1) * (j + 1)) * 5;
            grid[i][j].cost *= ((i + 1) * (j + 1) + 1);
            gridPhyses[i][j] = generateButton(i , j);
        }
    }
    grid[0][0].level = 1;
    checkLoad();
    this.rightAdjacencyCheck = function(x, y) {
        if(x < 8) {
            return (adjNum * grid[x + 1][y].level) * (1 + adjNum * grid[x + 1][y].adjacencyBonus);
        }
        else {
            return 0;
        }
    };
    this.downAdjacencyCheck = function(x, y) {
        if(y < 8) {
            return (adjNum * grid[x][y + 1].level) * (1 + adjNum * grid[x][y + 1].adjacencyBonus);
        }
        else {
            return 0;
        }
    };
    this.adjacencyCheck = function(x,y) {
        grid[x][y].adjacencyBonus = this.downAdjacencyCheck(x,y) + this.rightAdjacencyCheck(x,y);
    };
    this.second = function() {
        this.rightAdjacencyCheck(0, 0);
        this.downAdjacencyCheck(0, 0);
        for(var i = 0; i < 9; i++) {
            for(var j = 0; j < 9; j++) {
                this.adjacencyCheck(i, j);
                gridPhyses[i][j].innerHTML = "Level: " + grid[i][j].level + " Adjacency Bonus: " + Math.round(grid[i][j].adjacencyBonus * adjMult * 100) / 100 + " " + "Cost: " +  Math.round(grid[i][j].cost * 100) / 100;        
            }
        }
        num += (grid[0][0].level * (grid[0][0].adjacencyBonus * adjMult + 1));
        this.numCount.innerHTML = "Your number is: " + Math.round(num * 100) / 100;
    };
    
    this.sec = setInterval(() => this.second(), 1000);
    this.min = setInterval(() => save(), 60000);
    
}
function checkLoad() {
    if(localStorage.num !== undefined) {
        load();
    }
}
function save() {
    localStorage.setItem("num", num);
    localStorage.setItem("grid", JSON.stringify(grid));
    console.log(localStorage.grid);
}
function clear() {
    localStorage.clear();
    location.reload();
}
function load() {
    grid = JSON.parse(localStorage.grid);
    num = Number(localStorage.num);
    console.log(grid);
    console.log(num);
}
function generateOtherButton(x, y, onclick, id, innerHTML) {
    this.div = document.getElementById("main");
        this.gridPhys = document.createElement("BUTTON");
        this.gridPhys.id = id;
        this.gridPhys.innerHTML = innerHTML;
        this.gridPhys.style.position = "absolute";
        this.gridPhys.style.left = x * 100 + "px";
        this.gridPhys.style.top = y * 100 + 100 + "px";
        this.gridPhys.style.width = "100px";
        this.gridPhys.style.height = "100px";
        this.gridPhys.onclick = onclick;
        this.div.appendChild(this.gridPhys);
        return this.gridPhys;
}
function generateButton(x, y) {   
        this.div = document.getElementById("main");
        this.gridPhys = document.createElement("BUTTON");
        this.gridPhys.id = "Button " + x + "," + y;
        this.gridPhys.style.position = "absolute";
        this.gridPhys.style.left = x * 100 + "px";
        this.gridPhys.style.top = y * 100 + 100 + "px";
        this.gridPhys.style.width = "100px";
        this.gridPhys.style.height = "100px";
        this.gridPhys.onclick = function() {levelTile(x, y);};
        this.div.appendChild(this.gridPhys);
        return this.gridPhys;
    };
    function levelTile(x, y) {
        this.cost = grid[x][y].cost;
        if(num >= cost) {
            num -= cost;
            grid[x][y].cost *= ((x + 1) * (y + 1) + 1);
            grid[x][y].level++;
        }
    }