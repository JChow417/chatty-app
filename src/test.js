var str = 'SOMTHING 1111 http://www.w3schools.com/css/trolltunga.jpg http://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg SOMTHING 2222'
var re = /(https?:\/\/\S*\.(?:png|jpe?g|gif))/i;
var newArr = str.split(re);

console.log(newArr);

SOMTHING 1111 http://www.w3schools.com/css/trolltunga.jpg http://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg SOMTHING 2222
http://www.w3schools.com/css/trolltunga.jpg http://cdn.arstechnica.net/wp-content/uploads/2016/02/5718897981_10faa45ac3_b-640x624.jpg SOMTHING 2222
http://www.w3schools.com/css/trolltunga.jpg