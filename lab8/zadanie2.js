'use strict';

function sum(x,y) {
    return x+y;
}

function sum_strings(a) {
    let sum = 0;
    let x = 0;
    for (const key of a) {
      x = parseInt(key);
      if (!isNaN(x)){
        sum += x;
      }
    }
    return sum
}

function digits(s){
    let tab = [0,0];
    for (const key of s) {
      let x = parseInt(key);
      if(!isNaN(x)) {
        if (x % 2 == 1) tab[0] += x;
        else tab[1] += x;
      }
    }
    return tab
}

function letters(s) {
    let tab = [0,0];
    for (const key of s) {
      if (/^[a-z]$/.test(key)) {tab[0]+=1;}
      else if (/^[A-Z]$/.test(key)) {tab[1]+=1;}
    }
    return tab;
}
