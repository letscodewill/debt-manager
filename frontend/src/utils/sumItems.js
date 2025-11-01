export default function sumValues(array){
    let sum = 0
    for(let i =0; i< array.length; i++){
        sum = sum + array[i].valor
    }
    return sum
}

