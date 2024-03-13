

const usersname=["nikhil","kowshik"]
const password=["nikhil@28","kowshik@66"]

function check(name,pasword){
   for(let i=0;i<usersname.length;i++){
    if(usersname[i]===name){
        if(password[i]===pasword)
          return true;
    }
   }
   return false;
}

  let today = new Date();
let year = today.getFullYear();
let month = today.getMonth() + 1;
let day = today.getDate();

if (month < 10) {
  month = "0" + month;
}

if (day < 10) {
  day = "0" + day;
}

let currentDate = year + "-" + month + "-" +"07";


function getdate(){
   return currentDate;
}
function combine1(club,association){
   let combine=club.concat(association)
   combine.sort((a,b)=>a.date1-b.date1)
   return combine

}
function combine2(club,association){
   let combine=club.concat(association)
   combine.sort((a,b)=>b.date1-a.date1)
   return combine

}
// function upevents(club,association){
   
//    let combine=club.concat(association)
//    combine.sort((a,b)=>a.date1-b.date1)
//    combine.forEach(user=>{
//       console.log(user)
//    })
//    let subset = combine.filter((obj) =>{if(obj.date1-today)
//           return false;
//           else
//             return true;
//                }
//    );
//    console.log("!........upevents!\n")
//    subset.forEach(user=>{
      
//     console.log(user+" ")
//     })
//    return subset
// }

// function pastevents(club,association){
   
//    let combine=club.concat(association)
//    combine.sort((a,b)=>a.date1-b.date1)
//    let subset = combine.filter((obj) => {
//       const itemDate = new Date(obj.date1);
//        return itemDate.getTime() > today.getTime();
//    })
//    console.log("jhj")
//    combine.forEach(user=>{
//       const itemDate = new Date(user.date1);
//       console.log(itemDate.getTime() > today.getTime())
//    })
//    console.log("!..........less than!\n")
//    subset.forEach(user=>{
//       console.log(user)
//    })
//    return subset
// }

module.exports.check=check;
// module.exports.upevents=upevents;
// module.exports.pastevents=pastevents;
// module.exports.getdate=getdate;
module.exports.combine1=combine1;
module.exports.combine2=combine2;