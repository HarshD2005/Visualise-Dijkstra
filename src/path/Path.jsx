
import React, { Component } from "react";
import Node from "./Node/Node";
import "./Path.css";
import { dijkstra, getNodesInShortestPathOrder } from "../algorithms/dijkstra";

const start_row=5;
const start_col=5;
const fin_row=10;
const fin_col=20;

export default class Path extends Component {
    constructor(props) {
        super(props);
        this.state = {
            grid: [],
        };
    }
    

    componentDidMount() {
        const grid = this.createGrid();
        this.setState({ grid });
      }
      
    createGrid() {
        const grid = [];
        for (let row = 0; row < 20; row++) {
          const currentRow = [];
          for (let col = 0; col < 50; col++) {
            currentRow.push({
              row,
              col,
              isStart: row === start_row && col === start_col,
              isFinish: row === fin_row && col === fin_col,
              isWall: false,
              distance: Infinity,
              isVisited: false,
              previousNode: null,
            });
          }
          grid.push(currentRow);
        }
        return grid;
      }
      
    animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder) {
        for (let i = 0; i <= visitedNodesInOrder.length; i++) {
          if (i === visitedNodesInOrder.length) {
            setTimeout(() => {
              this.animateShortestPath(nodesInShortestPathOrder);
            }, 10 * i);
            return;
          }
          setTimeout(() => {
            const node = visitedNodesInOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-visited';
          }, 10 * i);
        }
      }

    visualizeDijkstra(){
        const{grid}=this.state;
        const startNode = grid[start_row][start_col];
        const finishNode = grid[fin_row][fin_col];
        const visitedNodesInOrder = dijkstra(grid, startNode, finishNode);
        const nodesInShortestPathOrde = getNodesInShortestPathOrder(finishNode);
        this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrde);

    }

    animateShortestPath(nodesInShortestPathOrder) {
        for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
          setTimeout(() => {
            const node = nodesInShortestPathOrder[i];
            document.getElementById(`node-${node.row}-${node.col}`).className =
              'node node-shortest-path';
          }, 50 * i);
        }
      }
    render() {
        const { grid, mouseIsPressed } = this.state;
      
        return (
          <>
            <button onClick={() => this.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </button>
            <div className="grid">
              {grid.map((row, rowIdx) => (
                <div key={rowIdx} className="row">
                  {row.map((node, nodeIdx) => (
                    <Node
                      key={`${rowIdx}-${nodeIdx}`}
                      {...node}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={() => this.handleMouseDown(node.row, node.col)}
                      onMouseEnter={() => this.handleMouseEnter(node.row, node.col)}
                      onMouseUp={() => this.handleMouseUp()}
                    />
                  ))}
                </div>
              ))}
            </div>
          </>
        );
      }
      
    }



