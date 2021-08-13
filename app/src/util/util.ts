
export const combinationSum = function(candidates: number[], target: number) {
    let ans: number[][] = []
    if(candidates === null || candidates.length === 0)
        return ans;
    
    candidates.sort((a, b) => a - b);

    let current: number[] = []
    findNumbers(candidates, target, 0, current, ans);
    return ans;
};

const findNumbers = function(candidates: number[], target: number, i: number, current: number[], ans: number[][]){
    if(target === 0){
        const temp = current.slice();
        ans.push(temp);
        return;
    }
    
    for(let j=i; j<candidates.length; j++){
        if(target < candidates[j])
            return;
        current.push(candidates[j]);
        findNumbers(candidates, target - candidates[j], j, current, ans);
        current.pop();
    }
}


// getXX(avail)
// const 
// combinationSum([5, 10, 20], 140);

// console.log(combinationSum([5, 10, 20], 140))
