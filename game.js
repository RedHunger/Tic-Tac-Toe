(function() {
	function Game() {
		var vm = this;

		function createGameOptions() {
			vm.options = {};
			vm.result = '';
			vm.options.startScreen = {};
			vm.options.stepCounter = 0;
			vm.options.restartButton = {};
			vm.gameField = [];
			vm.options.turnStatusInfo = {};
			vm.options.container = {};
		};
		createGameOptions();
        this.restart = function () {
            document.body.innerHTML = '';
            createGameOptions();
            vm.createStartScreen();
        };
        debugger;
        this.start = function() {
            vm.options.playerStep = 1;
            var target = document.getElementById("numberOfCellsId");
            vm.options.startScreen.selectedCells =  target.options[target.selectedIndex].value;
            document.body.innerHTML = '';
            vm.fieldCreate();

        };

		this.elementFactory = function(parent, tag) {
			var element = document.createElement(tag);
			parent.appendChild(element);
			return element;
        };
		
        this.fieldCreate = function () {
            var Cells = this.options.startScreen.selectedCells;
            var container = this.elementFactory(document.body,'div');
            container.style.width = Cells * 80 + 'px';
            container.style.height = Cells * 80 + 'px';
            container.style.margin = 'auto';
            for( var j = 0; j <= Cells - 1; j++ ){
                var line = [];
                for ( var i = 0; i <= Cells - 1; i++ ){
                    var block = {
                        element: vm.elementFactory(container, 'div'),
                        position: j.toString() + i.toString(),
                        value:''
                    };
                    block.element.id = j.toString() + i.toString();
                    block.element.onclick = action;
                    block.element.innerHTML = '&nbsp;';
                    this.setStyleForBlock(block.element, Cells);
                    line.push(block);
                }
                this.gameField.push(line);
            }
            var restartButton = this.elementFactory(document.body,'button');
            restartButton.innerHTML = 'Restart';
            restartButton.onclick = this.restart;

            this.options.turnStatusInfo = this.elementFactory(document.body,'h3');
            this.options.turnStatusInfo.style.color = 'red';
            this.options.turnStatusInfo.innerHTML = 'Player ' + vm.options.playerStep + ' turn'
        };

        this.createStartScreen = function(){
            document.body.style.textAlign = 'center';
            document.body.style.marginTop = '80px';
            this.options.startScreen.topic = this.elementFactory(document.body,'h1');
            this.options.startScreen.topic.innerHTML = 'Settings : ';
            this.options.startScreen.numberToWin=document.createElement('select');
            this.options.startScreen.numberToWin.style.marginRight = '10px';
            this.options.startScreen.numberToWin.style.padding = '5px';
            this.options.startScreen.numberToWin.id = 'numberToWinId';
            this.options.startScreen.numberOfCells = document.createElement('select');
            this.options.startScreen.numberOfCells.style.marginRight = '10px';
            this.options.startScreen.numberOfCells.style.padding = '5px';
            this.options.startScreen.numberOfCells.id = 'numberOfCellsId';
            // this.options.startScreen.spaTowin
            for( var i = 3; i <= 10; i++){
                var optionElement = this.elementFactory(this.options.startScreen.numberOfCells,'option');
                optionElement.value = i;
                optionElement.text = i + 'x' + i;
            }
            for (var count = 3; count <= 6; count++){
            	var optionElementcount = this.elementFactory(this.options.startScreen.numberToWin,'option');
				optionElementcount.value = count;
                optionElementcount.text = count;
            }
            var spanGrid = this.elementFactory(document.body,'span');
            document.body.appendChild(this.options.startScreen.numberOfCells);
            var spaTowin = this.elementFactory(document.body,'span');
            document.body.appendChild(this.options.startScreen.numberToWin);
            spanGrid.innerHTML="Grid : ";
            spaTowin.innerHTML="To win for : ";
            var startButton = this.elementFactory(document.body,'button');
            startButton.innerHTML = 'Start game';
            startButton.onclick = this.start;
        };
        this.setStyleForBlock = function (block, cells) {

            block.style.width = cells* 69 / cells + 'px';
            block.style.height = cells* 69 / cells + 'px';
            block.style.border = 'solid';
            block.style.borderColor = 'gray';
            block.style.display = 'inline-block';
            block.style.fontSize = cells* 50 / cells + 'px';
        };
        this.createStartScreen();   

		function action() {
			if (this.nodeName == 'DIV') {
				vm.options.stepCounter++;
				vm.changeTurnStatusInfo();
				var blockPositionX = this.id[0];
				var blockPositionY = this.id[1];
				vm.gameField[blockPositionX][blockPositionY].element.innerHTML = step();
				vm.gameField[blockPositionX][blockPositionY].value = this.innerHTML;
				this.onclick = null;
				vm.checkGame();

			}
  		
        }

        console.log(vm);
	}
	var game = new Game();

})();