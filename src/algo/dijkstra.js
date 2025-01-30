export function dijkstra(grid, start, finish){
    const visitednodes= [];
    start.distance=0;
    const unvisitednodes= getnodes(grid);
    while(unvisitednodes.length!==0){
        sortnodes(unvisitednodes);
        const closestnode=unvisitednodes.shift();
        if( closestnode.isWall) continue;

        if(closestnode.distance===Infinity) return visitednodes
        closestnode.isVisited=true;
        visitednodes.push(closestnode);
        if(closestnode===finish) return visitednodes;
        updateunvisitedneighbour(grid,closestnode);

    }
}

export function sortnodes(unvisitednodes){
    //by dist.
    unvisitednodes.sort((A,B)=> A.distance -B.distance);
}


export function updateunvisitedneighbour(grid,node){
    const neighbours=unvisitedneighbour(node,grid);
    for(const neighbour of neighbours){
        neighbour.distance=node.distance +1;
        neighbour.previousNode=node;
    }
}

function unvisitedneighbour(node,grid) {
    const neighbors = [];
    const {col, row} = node;
    if (row > 0) neighbors.push(grid[row - 1][col]);
    if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
    if (col > 0) neighbors.push(grid[row][col - 1]);
    if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

export function getnodes(grid){
    const nodes=[];
    for(const row of grid){
        for(const node of row){
            nodes.push(node);
        }
    }
    return nodes
}
export function getNodesInShortestPathOrder(finishNode) {
    const nodesInShortestPathOrder = [];
    let currentNode = finishNode;
    while (currentNode !== null) {
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }