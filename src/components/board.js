import React,{Component} from 'react';
import Tile from './tile';
export default class Board extends Component {

    constructor(props){
        super(props);
        this.state = {
            boardSizeI: 80,
            boardSizeJ: 40,
            board: [],
            styles: {
                left: 0,
                top: 0,
                position: 'absolute'
            },
            position: {
                i:0,
                j:0
            },
            generations: 0
    };
        this.timer = 0;
        this.pauseGame = this.pauseGame.bind(this);
        this.startGame = this.startGame.bind(this);
        this.clearBoard = this.clearBoard.bind(this);
        this.toggle = this.toggle.bind(this);

    }
    componentDidMount() {
        this.generateInitialBoardState();
        this.timer = setInterval(this.tick.bind(this), 500);

    }
    componentWillUnmount() {
        clearInterval(this.timer);
    }
    startGame () {
            if(!this.timer) {
                this.timer = setInterval(this.tick.bind(this),500)
            }

    }
    pauseGame () {

        clearInterval(this.timer);
        this.timer = 0;


    }
    clearBoard () {

       this.generateBoardState(true);
        this.setState({generations: 0});
        this.pauseGame();

    }
    tick() {

       this.generateBoardState();
   }
    generateInitialBoardState() {
        let {boardSizeI, boardSizeJ } =  this.state;
        let board = [];
        for (let i = 0; i < boardSizeI; i++) {
            board.push([]);
            for (let j = 0; j <boardSizeJ; j++){
                let style =  {
                    top: 10*j,
                    left: 10*i
                };
                let positions = {
                    i,j
                };
                let deadOrAlive = 0;
                if (this.getRandNumber(0,5) === 5 ) {
                    deadOrAlive = 1;
                }
                board[i].push({style, deadOrAlive,positions});
            }

        }
        return this.setState({board});

    }
    generateBoardState(clear=false) {
        let { board} = this.state ;
        let nextBoard = [];
        for (let i = 0; i < board.length; i ++) {
            nextBoard.push([]);
            for (let j = 0; j < board[i].length; j++) {
                let sum = (this.getSumOfNeighbors(board,i,j));

                nextBoard[i].push(Object.assign({},board[i][j]));
                if(!clear) {
                    nextBoard[i][j]["deadOrAlive"] = this.decideIfNextIsDeadOrAlive(sum, board[i][j].deadOrAlive);

                }  else {
                    nextBoard[i][j]["deadOrAlive"] = 0;

                }

            }
        }
       this.setState({board: nextBoard,generations: this.state.generations + 1});

    }
    decideIfNextIsDeadOrAlive(sumOfNeighbors, currentDeadOrAlive) {

        if (currentDeadOrAlive === 0) {
            if ( sumOfNeighbors === 3) {
                return 1;
            } else {
                return 0;
            }
        }

        if (currentDeadOrAlive === 1) {
            if ( sumOfNeighbors === 2 || sumOfNeighbors === 3) {
                return 1 ;
            } else {
                return 0 ;
            }
        }
    }
    toggle(tile) {
        //this needs major refactoring because we are basically mutating state before setting it
        if (tile.deadOrAlive) {
            tile.deadOrAlive = 0;
            this.setState(tile);
        } else {
            tile.deadOrAlive = 1;
            this.setState(tile);
        }



    }
    getSumOfNeighbors(arr,i,j) {
        //we are looking for 8 neighbors here, if neighbors are out of bounds we will assume them dead


        let neighbors = [arr[i][j-1],arr[i][j+1]];
        if (arr[i+1]) {
            neighbors.push(arr[i+1][j],arr[i+1][j+1],arr[i+1][j-1]);
        }
        if (arr[i-1]) {
            neighbors.push(arr[i-1][j],arr[i-1][j+1],arr[i-1][j-1]);
        }
        // console.log(neighbors)
        // console.log(`i=${i} j=${j} lengthOfNeighbors= ${neighbors.length}`);
        let sum = neighbors.reduce((sum,neighbor)=> {

            if (neighbor) {
                sum += neighbor.deadOrAlive;
                return sum;
            }
            return sum;
        },0);
        // console.log(sum);
        return sum;


    }
    getRandNumber(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    generateBoard () {

        if(!this.state.board) {
              return ".... please wait";
        } else {
            let expandedBoard =  this.state.board.reduce((prev,currArr) => {
                prev.push(...currArr);
                return prev;
            },[]);

            return expandedBoard.map((boardTileSchematic,i) => {

                let cName = 'tile';
                if (boardTileSchematic.deadOrAlive === 0) {
                    cName += ' dead';
                } else {
                    cName += ' alive';
                }
                return  <Tile toggle={ () => this.toggle(boardTileSchematic)} cName={cName} key={i} style={boardTileSchematic.style} i={boardTileSchematic.positions.i} j={boardTileSchematic.positions.j}/>
            });

        }

    }
    render() {
        return (

            <div className="board" >
               <h3> Generation: {this.state.generations} </h3>;
                { this.generateBoard()}

                <button onClick={this.startGame}>START</button>
                <button onClick={this.pauseGame}>PAUSE</button>
                <button onClick={this.clearBoard}>CLEAR BOARD</button>

            </div>


        )
    }
}
