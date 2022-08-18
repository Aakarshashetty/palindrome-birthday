function reverseStr(str){

    var splitStr = str.split('');//returns array of string
    var reverse = splitStr.reverse();//returns reversed array[because we can't reverse a string directly so we split into array and reverse it and join it]
    var joinStr = reverse.join('');//returns joined array

    //in single line
    // var reverse = str.split('').reverse().join('');
    return joinStr;
}
function isPalindrome(str){
    var reverse = reverseStr(str);
    return reverse === str;
}
function dateToString(date){
    var dateStr = {day: '', month: '', year:''};
    if(date.day < 10){
        dateStr.day = '0'+date.day;
    }
    else{
       dateStr.day = date.day.toString();
    }
    if(date.month < 10){
        dateStr.month = '0'+date.month;
    }
    else{
        dateStr.month = date.month.toString();
    }
    dateStr.year = date.year.toString();
    return dateStr;
}
function dateFormats(date){
   
    var ddmmyyyy = date.day + date.month + date.year;
  var mmddyyyy = date.month + date.day + date.year;
  var yyyymmdd = date.year + date.month + date.day;
  var ddmmyy = date.day + date.month + date.year.slice(-2);
  var mmddyy = date.month + date.day + date.year.slice(-2);
  var yyddmm = date.year.slice(-2) + date.day + date.month;

  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
}
function checkPalindromeForFormats(date){
    var dateFormatsList = dateFormats(date);
    var palindromeList = [];
    for(let i = 0; i<dateFormatsList.length;i++){
        var res = isPalindrome(dateFormatsList[i])
        palindromeList.push(res);
        
    }
    return palindromeList;
}
function isLeapYear(year){
    if(year % 400 === 0){
        return true;
    }
    if(year % 100 === 0){
        return false;
    }
    if(year % 4 === 0){
        return true;
    }
    return false;
}
function getNextDate(date){
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;
    var noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    
    //for febraury
    if(month === 2){
        if(isLeapYear(year)){
            if(day>29){
                day = 1;
                month = 3;
            }
        }
        else{
            if(day>28){
                day = 1;
                month = 3;
            }
        }
    }
    else{
    //for remaining months
    if(day>noOfDays[month-1]){// since index starts with '0'
        day = 1;
        month++;
    }
}
    if(month>12){
        month = 1;
        year++;
    }
    return {day, month, year};
}

function nextPalindromeDate(date){
    var ctr = 0;
    var nextdate = getNextDate(date);
    while (1) {
        ctr++;  
        var dateStr = dateToString(nextdate);
        var resultList = checkPalindromeForFormats(dateStr);
        for(let i = 0; i<resultList.length;i++){
            if(resultList[i]){
                return [ctr, nextdate];
            }
            
        }
        nextdate = getNextDate(nextdate);
    }
}
function getPreviousDate(date){
    var day = date.day - 1;
    var month = date.month; //4 ==> month-1=3==>month-2=2
    var year = date.year;
    var noOfDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if(month === 3){ // for feb
        if(isLeapYear(year)){
            if(day<1){
                day = 29;
                month = 2;
            }
        }
        else{
            if(day<1){
                day = 28;
                month = 2
            }
        }
    }
    else{//for another months
        if(day<1){
            day = noOfDays[month-1];
            month--;
        }
    }
    if(month<1){
        month = 12;
        year--;
    }
    return {day, month, year};
}
function getPreviousPalindromeDate(date){
    var ctr = 0;
    var previousDate = getPreviousDate(date);
    while(1){
        ctr++;
        var dateStr = dateToString(previousDate);
        var resultList = checkPalindromeForFormats(dateStr);
        for(let i = 0;i< resultList.length;i++){
            if(resultList[i]){
                return [ctr, previousDate];
            }
        }
        previousDate = getPreviousDate(previousDate);
    }
}

const bdy  = document.querySelector('#date');
const showBtn = document.querySelector('.show-btn');
const output = document.querySelector('.output');

const showPalindrome = () => {
    var dateInput = bdy.value;
    if(dateInput !== ''){
        var date = dateInput.split("-");
        var year = date[0];
        var month = date[1];
        var day = date[2];

        var date = {
            day: Number(day),
            month: Number(month),
            year: Number(year)
        };

        var dateStr = dateToString(date);
        var list = checkPalindromeForFormats(dateStr);
        var palindrome = false;

        for(let i=0;i<list.length;i++){
            if(list[i]){
                palindrome = true;
            }
        }
        if(!palindrome){
            const res1 = nextPalindromeDate(date);
            const res2 = getPreviousPalindromeDate(date);
            if(res1[0]<res2[0]){
                output.innerText = `The nearest palindrome date is ${res1[1].day} - ${res1[1].month} - ${res1[1].year}, you missed by ${res1[0]}`;
            }
            else{
                output.innerText = `The nearest palindrome date is ${res2[1].day} - ${res2[1].month} - ${res2[1].year}, you missed by ${res2[0]}`;
            }
        }
        else{
            output.innerText = "Woow you birthday is a palindrome!"
        }
    }
};
showBtn.addEventListener("click", showPalindrome);
