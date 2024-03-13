
const express = require('express')
const path = require('path')
const ejs = require('ejs');
const mysql = require('mysql')
const port=5000;
const { format, addDays,parse } = require('date-fns');
const bodyparser = require('body-parser')
const app = express()

const data=require('./data.js')

require('dotenv').config()

 app.use(bodyparser.urlencoded({extended:false}))
 const dire=path.join(__dirname,'./public');
 app.use(express.static(dire))

  let length1=3,length2=3;
 const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test",
    port:3306
  });
  db.connect((err)=>{
    if(err)
      console.log('not connected')
    else
    console.log('connected')
  }
  )
//  app.engine('hbs', exphb({extname:'.hbs'}));
app.set('views', './views');
 app.set('view engine','ejs')
 
//  home

app.get('/',(req,res)=>{
  let query1="select * from event_club where date1>DATE(NOW()-1)"
  let query2="select * from event_association where date1>DATE(NOW()-1)"
  let query3="select * from event_club where date1<DATE(NOW())"
  let query4="select * from event_association where date1<DATE(NOW())"
  db.query(query1,(err,result)=>{
    if(err){
      console.log(err)
      res.end('error 404')
    }
    else{
      
      db.query(query2,(err,result1)=>{
        if(err){
          console.log(err)
          res.end('error 404')
        }
        else{
          db.query(query3,(err,result2)=>{
            if(err){
              console.log(err)
              res.end('error 404')
            }
            else{
              db.query(query4,(err,result3)=>{
                if(err){
                  console.log(err)
                  res.end('error 404')
                }
                else{
                  let up=data.combine1(result,result1)
                  let past=data.combine2(result2,result3)
                  res.render('home_1',{up:up,past:past,resultclub1:result,resultassociation1:result1,resultclub2:result2,resultassociation2:result3,length1:length1,length2:length2})
                }
              })
            }
          })
        }
      })
      
    }
  })
  
})

          
         
// club
app.get('/clubs',(req,res)=>{
    res.render('clubs')
})
// associations
app.get('/associations',(req,res)=>{
  res.render('associations')
})
app.get('/pastevents',(req,res)=>{
  res.render('pastevents')
})

// })
// past events view
app.get('/past_club_event_view/:club/:event/:date',(req,res)=>{
  let club=req.params.club
  let event=req.params.event
  let date=req.params.date
  
  let date_1 = new Date(date);
  const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
 
  let query="select * from event_club where clubname=? and eventname=? and date1=?"
  db.query(query,[club,event,date2],(err,result)=>{
        if(err){
          console.log(err)
          res.end('error 404')
        }
        else{
          
          if(result.length>0){
               
              res.render('past_event_club',{user:result[0]})
        }
          else
            res.render('past_event_club',{user:{}})
        }
  })
})
// past asssociation event view
app.get('/past_association_event_view/:association/:event/:date',(req,res)=>{
  let association=req.params.association
  let event=req.params.event
  let date=req.params.date
  let date_1 = new Date(date);
  const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
  
  let query="select * from event_association where associationname=? and eventname=? and date1=?"
  db.query(query,[association,event,date2],(err,result)=>{
        if(err){
          console.log(err)
          res.end('error 404')
        }
        else{
          if(result.length>0)
              res.render('past_event_association',{user:result[0]})
          else
            res.render('past_event_association',{user:{}})
        }
  })
})
app.get('/upcoming_club_event_view/:club/:event/:date',(req,res)=>{
  let club=req.params.club
  let event=req.params.event
  let date=req.params.date
  
  let date_1 = new Date(date);
  const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
  
  let query="select * from event_club where clubname=? and eventname=? and date1=?"
  db.query(query,[club,event,date2],(err,result)=>{
        if(err){
          console.log(err)
          res.end('error 404')
        }
        else{
          
          if(result.length>0){
               
              res.render('upcoming_club_event',{user:result[0]})
        }
          else
            res.render('upcoming_club_event',{user:{}})
        }
  })
})
// past asssociation event view
app.get('/upcoming_association_event_view/:association/:event/:date',(req,res)=>{
  let association=req.params.association
  let event=req.params.event
  let date=req.params.date
  let date_1 = new Date(date);
  const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
  let query="select * from event_association where associationname=? and eventname=? and date1=?"
  db.query(query,[association,event,date2],(err,result)=>{
        if(err){
          console.log(err)
          res.end('error 404')
        }
        else{
          if(result.length>0)
              res.render('upcoming_association_event',{user:result[0]})
          else
            res.render('upcoming_association_event',{user:{}})
        }
  })
})
// registartion
app.get('/regclub/:club/:event/:date',(req,res)=>{
      let club=req.params.club
      let event=req.params.event
      let date=req.params.date
      
      res.render('regclubevent',{club:club,event:event,date:date,msg:""})
     
})

app.post('/regclub_post/:club/:event/:date',(req,res)=>{
   
    let club=req.params.club
    let event=req.params.event
    let date=req.params.date
    let date_1 = new Date(date);
    const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
     let email=req.body.email
     let name=req.body.name
     let regno=Number(req.body.regno)
     let rollno=Number(req.body.rollno)
     let course=req.body.course
     let year=req.body.year
     let branch=req.body.branch
    let contactno=req.body.contact
    let query1="select * from student_reg_club where clubname=? and eventname=? and date=? and regno=?"
    db.query(query1,[club,event,date2,regno],(err,result)=>{
      if(err){
          console.log(err)
          res.send('not submitted')
      }
      else{
         if(result.length>0){
          res.render('regclubevent',{club:club,event:event,date:date,msg:"Already Registered!"})
          return
         }
         else{

        
          if(course.length===12 || year.length===11 || branch.length===13 || contactno.length!=10){
             res.render('regclubevent',{club:club,event:event,date:date,msg:"Enter Valid Details"})
           return
         }
         contactno=Number(req.body.contact)
         let query = "insert into student_reg_club (clubname,eventname,date,email,name,regno,rollno,course,year,branch,contactno) values(?,?,?,?,?,?,?,?,?,?,?)"
         db.query(query,[club,event,date2,email,name,regno,rollno,course,year,branch,contactno],(err,result)=>{
         if(err){
            console.log(err)
            res.send('unsuccesfull')
          }
          else{
            res.send('succesfully submitted')
         }
       })
     }
    }
    })
})

app.get('/regassociation/:association/:event/:date',(req,res)=>{
  let association=req.params.association
      let event=req.params.event
      let date=req.params.date
  res.render('regassociationevent',{association:association,event:event,date:date,msg:""})
 
})

app.post('/regassociation_post/:association/:event/:date',(req,res)=>{
  let association=req.params.association
  let event=req.params.event
  let date=req.params.date
  let date_1 = new Date(date);
  const date2 = format(addDays(date_1, 0), 'yyyy-MM-dd');
 let email=req.body.email
 let name=req.body.name
 let regno=Number(req.body.regno)
 let rollno=Number(req.body.rollno)
 let course=req.body.course
 let year=req.body.year
 let branch=req.body.branch
let contactno=req.body.contact
let query1="select * from student_reg_association where associationname=? and eventname=? and date=? and regno=?"
    db.query(query1,[association,event,date2,regno],(err,result)=>{
      if(err){
          console.log(err)
          res.send('unsuccessfull')
      }
      else{
         if(result.length>0){
          res.render('regassociationevent',{association:association,event:event,date:date,msg:"Already Registered!"})
          return
         }
         else{
             if(course.length===12 || year.length===11 || branch.length===13 || contactno.length!=10){
                res.render('regassociationevent',{association:association,event:event,date:date,msg:"Enter Valid Details"})
                return
                }
             contactno=Number(req.body.contact)
              let query = "insert into student_reg_association  values(?,?,?,?,?,?,?,?,?,?,?)"
              db.query(query,[association,event,date2,email,name,regno,rollno,course,year,branch,contactno],(err,result)=>{
              if(err){
                  console.log(err)
                    res.send('not submitted')
              }
             else{
                res.send('succesfully submitted')
             }
             })
       }
      }
   })
})
// login
app.get('/admin',(req,res)=>{
  res.render('login',{name:''});
})
// app.get('/lights',(req,res)=>{
//   res.render('flowinglights')
// })
// app.get('/diplametro',(req,res)=>{
//   res.render('diplametro')
// })
// app.get('/intramural',(req,res)=>{
//   res.render('intramural')
// })
app.post('/login',(req,res)=>{
    let username=req.body.username
    let password=req.body.password
    console.log(data.check(username,password))
    if(data.check(username,password))
       res.redirect('/adminpage1')
    else
     res.render('login',{name:'Invalid username or password'})
})
// register for club event
app.get('/addclub_event',(req,res)=>{
  res.render('addclub_event')
})
app.post('/addclub_event_post',(req,res)=>{
    let club=req.body.clubname
    let event =req.body.event
    let date=req.body.date
    let from = req.body.from
    let to = req.body.to
    let venue = req.body.venue
    let guest=req.body.guest
    let description = req.body.description
    let imagepath=req.body.image
    let query1 = "insert into event_club values(?,?,?,?,?,?,?,?,?)"
    db.query(query1,[club,event,date,from,to,venue,guest,description,imagepath],(err,result)=>{
      if(err)
        res.send('your submission unsuccessfull')
      else{
        res.send('your submission successfull')
      }
    })
})

//  register for association event
app.get('/addassociation_event',(req,res)=>{
  res.render('addassociation_event')
})
app.post('/addassociation_event_post',(req,res)=>{
    let association=req.body.associationname
    let event =req.body.event
    let date=req.body.date
    let from = req.body.from
    let to = req.body.to
    let venue = req.body.venue
    let guest=req.body.guest
    let imagepath=req.body.image
    let description = req.body.description
    let query1 = "insert into event_association values(?,?,?,?,?,?,?,?,?)"
    db.query(query1,[association,event,date,from,to,venue,guest,description,imagepath],(err,result)=>{
      if(err)
        res.send('your submission unsuccessfull')
      else{
        res.send('your submission successfull')
      }
    })
})
// registration for club
app.get('/club_reg',(req,res)=>{
    res.render('club_reg')
})

app.post('/club_post',(req,res)=>{
    let name=req.body.clubname
    let email=req.body.email
    let incharge=req.body.name
    
    let query1 = "insert into clubs values(?,?,?)"
    db.query(query1,[name,email,incharge],(err,result)=>{
        if(err)
          res.send('not submitted')
        else
           res.send('your submission successfull')
    })
})

// association reg
app.get('/association_reg',(req,res)=>{
  res.render('association_reg')
})

app.post('/association_post',(req,res)=>{
  let name=req.body.as_name
  let branch=req.body.branch
  let email=req.body.email
  let incharge=req.body.name
  
  let query1 = "insert into associations values(?,?,?,?)"
  db.query(query1,[name,branch,email,incharge],(err,result)=>{
      if(err)
        res.send('not submitted')
      else
        res.send('your submission successfull')
  })
})

// student club
app.get('/student_club',(req,res)=>{
  res.render('student_club',{msg:''})
})

app.post('/student_club_post',(req,res)=>{
      let clubname=req.body.clubname
      let name=req.body.name
      let regno=Number(req.body.regno)
      let rollno=Number(req.body.rollno)
      let branch=req.body.branch
      let position=req.body.position
      let email=req.body.email
      let year=req.body.year
      let contact=+req.body.contactno
      let query1 = "insert into student_club values(?,?,?,?,?,?,?,?,?)"
      db.query(query1,[clubname,name,regno,rollno,branch,position,email,contact,year],(err,result)=>{
      if(err)
            res.render('student_club',{msg:'Enter Valid Details'})
      else
      res.send('your submission successfull')
  })
})

// student association
app.get('/student_association',(req,res)=>{
  res.render('student_association',{msg:''})
})

app.post('/student_association_post',(req,res)=>{
      let clubname=req.body.clubname
      let name=req.body.name
      let regno=Number(req.body.regno)
      let rollno=Number(req.body.rollno)
      let position=req.body.position
      let email=req.body.email
      let year=req.body.year
      let contact=+req.body.contactno
      let query1 = "insert into student_association values(?,?,?,?,?,?,?,?)"
      db.query(query1,[clubname,name,regno,rollno,position,email,contact,year],(err,result)=>{
      if(err)
        res.render('student_association',{msg:'Enter Valid Details'})
      else
      res.send('your submission successfull')
  })
})

// student participated in club event  data
app.get('/club_participated',(req,res)=>{
  
        res.render('club_student_data',{condition:false,users:{},msg:""})
})


app.post('/clubevent_participated_data',(req,res)=>{
  
    let club=req.body.clubname
    let event=req.body.event
    let date=req.body.date
    let query="select * from student_reg_club where clubname=? and eventname=? and date=?"
    // let query=" select * from student_reg_club"
     db.query(query,[club,event,date],(err,result)=>{
   
      if(result.length>0)
        res.render('club_student_data',{condition:true,users:result,msg:""})
     else
      res.render('club_student_data',{condition:false,users:result,msg:"no data found"})
      
   })
 
})
//  student participated in association event data
app.get('/association_participated',(req,res)=>{
  
  res.render('association_student_data',{condition:false,users:{},msg:""})
})


app.post('/associationevent_participated_data',(req,res)=>{

let association=req.body.associationname
let event=req.body.event
let date=req.body.date
let query="select * from student_reg_association where associationname=? and eventname=? and date=?"
// let query=" select * from student_reg_club"
db.query(query,[association,event,date],(err,result)=>{

if(result.length>0)
  res.render('association_student_data',{condition:true,users:result,msg:""})
else
res.render('association_student_data',{condition:false,users:result,msg:"no data found"})

})

})

// club event data
app.get('/event_club_data',(req,res)=>{
  res.render('event_club_data',{condition:false,users:{},msg:""})
})
// club event data post
 app.post('/event_club_data_post',(req,res)=>{
  let club=req.body.clubname
  let event=req.body.event
  let date=req.body.date
  if(club!='Select Club'){
      if(event!=''){
           if(date!=''){
            let query="select * from event_club where clubname=? and eventname=? and date1=? "
             db.query(query,[club,event,date],(err,result)=>{
              if(err){
                res.send('error status 404')
                return 
              }
              else{
                if(result.length>0)
                  res.render('event_club_data',{condition:true,users:result,msg:""})
                else
                res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
              }
            })
           }
           else{
             
               let query="select * from event_club where clubname=? and eventname=?"
               db.query(query,[club,event],(err,result)=>{
               if(err){
                 res.send('error status 404')
                 return 
               }
              else{
                if(result.length>0)
                  res.render('event_club_data',{condition:true,users:result,msg:""})
                else
                res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
              
              }
            })
           }
      }
      else{
        if(date!=''){
          let query="select * from event_club where clubname=? and date1=? "
          db.query(query,[club,date],(err,result)=>{
           if(err){
             res.send('error status 404')
             return 
           }
           else{
            if(result.length>0)
               res.render('event_club_data',{condition:true,users:result,msg:""})
            else
              res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
        
           }
         })
        }
        else{
          let query="select * from event_club where clubname=? "
          db.query(query,[club],(err,result)=>{
           if(err){
             res.send('error status 404')
             return 
           }
           else{
            if(result.length>0)
               res.render('event_club_data',{condition:true,users:result,msg:""})
            else
               res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
        
           }
         })
        }
      }
  }
  else{
     if(event!=''){
       if(date!=''){
              let query="select * from event_club where eventname=? and date1=?"
              db.query(query,[event,date],(err,result)=>{
              if(err){
                 res.send('error status 404')
                 return 
             }
             else{
              if(result.length>0)
                   res.render('event_club_data',{condition:true,users:result,msg:""})
              else
                res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
          
              }
            })
         }
         else{
          let query="select * from event_club where eventname=?"
          db.query(query,[event],(err,result)=>{
          if(err){
             res.send('error status 404')
             return 
         }
         else{
             if(result.length>0)
                 res.render('event_club_data',{condition:true,users:result,msg:""})
            else
               res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
      
          }
        })
         }
     }
     else{
      if(date!=''){
        let query="select * from event_club where  date1=?"
        db.query(query,[date],(err,result)=>{
        if(err){
           res.send('error status 404')
           return 
       }
       else{
        if(result.length>0)
             res.render('event_club_data',{condition:true,users:result,msg:""})
        else
           res.render('event_club_data',{condition:false,users:result,msg:"No date related to your search"})
    
        }
      })
      }
       else{
        res.render('event_club_data',{condition:false,users:{},msg:"No data realted to your search"})
       }
     }
  }
 })

 // association event data
 app.get('/association_event_data',(req,res)=>{
  res.render('association_event_data',{condition:false,users:{},msg:""})
 })
// association event data post
app.post('/association_event_data_post',(req,res)=>{
  let association=req.body.associationname
  let event=req.body.event
  let date=req.body.date
  if(association!='Select Association'){
      if(event!=''){
           if(date!=''){
            let query="select * from event_association where associationname=? and eventname=? and date1=? "
             db.query(query,[association,event,date],(err,result)=>{
              if(err){
                res.send('error status 404')
                return 
              }
              else{
                if(result.length>0)
                  res.render('association_event_data',{condition:true,users:result,msg:""})
                else
                res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
              }
            })
           }
           else{
               let query="select * from event_association where associationname=? and eventname=?"
               db.query(query,[association,event],(err,result)=>{
               if(err){
                 res.send('error status 404')
                 return 
               }
              else{
                if(result.length>0)
                  res.render('association_event_data',{condition:true,users:result,msg:""})
                else
                res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
              
              }
            })
           }
      }
      else{
        if(date!=''){
          let query="select * from event_association where associationname=? and date1=? "
          db.query(query,[association,date],(err,result)=>{
           if(err){
             res.send('error status 404')
             return 
           }
           else{
            if(result.length>0)
               res.render('association_event_data',{condition:true,users:result,msg:""})
            else
              res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
        
           }
         })
        }
        else{
          let query="select * from event_association where associationname=? "
          db.query(query,[association],(err,result)=>{
           if(err){
             res.send('error status 404')
             return 
           }
           else{
            if(result.length>0)
               res.render('association_event_data',{condition:true,users:result,msg:""})
            else
               res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
        
           }
         })
        }
      }
  }
  else{
     if(event!=''){
       if(date!=''){
              let query="select * from event_association where eventname=? and date1=?"
              db.query(query,[event,date],(err,result)=>{
              if(err){
                 res.send('error status 404')
                 return 
             }
             else{
              if(result.length>0)
                   res.render('association_event_data',{condition:true,users:result,msg:""})
              else
                res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
          
              }
            })
         }
         else{
          let query="select * from event_association where eventname=?"
          db.query(query,[event],(err,result)=>{
          if(err){
             res.send('error status 404')
             return 
         }
         else{
             if(result.length>0)
                 res.render('association_event_data',{condition:true,users:result,msg:""})
            else
               res.render('association_event_data',{condition:false,users:{},msg:"No date related to your search"})
      
          }
        })
         }
     }
     else{
      if(date!=''){
        let query="select * from event_association where  date1=?"
        db.query(query,[date],(err,result)=>{
        if(err){
           res.send('error status 404')
           return 
       }
       else{
        if(result.length>0)
             res.render('association_event_data',{condition:true,users:result,msg:""})
        else
           res.render('association_event_data',{condition:false,users:result,msg:"No date related to your search"})
    
        }
      })
      }
       else{
        res.render('association_event_data',{condition:false,users:{},msg:"No data related to your search"})
       }
     }
  }
 })
// search club event
 app.get('/update_club_event',(req,res)=>{
    res.render('updateclubevent',{condition:false,msg:""})
 })

 app.post('/update_club_search_event',(req,res)=>{
  let club=req.body.clubname
  let event=req.body.event
  let date=req.body.date
  let query="select * from event_club where clubname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[club,event,date],(err,result)=>{
 
    if(result.length>0)
      res.render('updateclubevent',{condition:true,users:result[0],msg:""})
   else
    res.render('updateclubevent',{condition:false,users:result,msg:"no data found"})
    
 })
 })
//  update club event
 app.post('/update_club_event_post/:club/:event/:date',(req,res)=>{
  let club=req.params.club
  let event=req.params.event
  let date=req.params.date
  console.log(date)
  // const { format, addDays } = require('date-fns');
  const date_1 = new Date(date);
  date = format(addDays(date_1, 0), 'yyyy-MM-dd');
  let date1=req.body.date
  let from=req.body.from
  let to=req.body.to
  let venue=req.body.venue
  if(date1!=""){
   let query="update event_club set date1=?,from1=?,to1=?,venue=? where clubname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[date1,from,to,venue,club,event,date],(err,result)=>{
     
    if(err){
      console.log(err)
      res.send('unsuccessfull')
    }
   else
    res.send('successfull')
   
 })}
 else {
  let query="update event_club set from1=?,to1=?,venue=? where clubname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[from,to,venue,club,event,date],(err,result)=>{
     
    if(err){
      console.log(err)
      res.send('unccessfull')
    }
   else
      res.send('successfull')
   })}
})
  // delete club event
  app.get('/delete_club_event/:club/:event/:date',(req,res)=>{
    let club=req.params.club
    let event=req.params.event
    let date=req.params.date
    const date_1 = new Date(date);
  date = format(addDays(date_1, 0), 'yyyy-MM-dd');
    let query = 'delete from event_club where clubname=? and eventname=? and date1=?'
    db.query(query,[club,event,date],(err,result)=>{
      if(err)
        res.send('deletion unsuccessfull')
      else
        res.send('deletion successfull')
    })
  })
//  association search for updation or deletion
  app.get('/update_association_event',(req,res)=>{
    res.render('updateassociationevent',{condition:false,msg:""})
 })

 app.post('/update_association_search_event',(req,res)=>{
  let association=req.body.associationname
  let event=req.body.event
  let date=req.body.date
  let query="select * from event_association where associationname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[association,event,date],(err,result)=>{
 
    if(result.length>0)
      res.render('updateassociationevent',{condition:true,users:result[0],msg:""})
   else
    res.render('updateassociationevent',{condition:false,users:result,msg:"no data found"})
    
 })
 })
//  update association event
 app.post('/update_association_event_post/:association/:event/:date',(req,res)=>{
  let association=req.params.association
  let event=req.params.event
  let date=req.params.date
  console.log(date)
  // const { format, addDays } = require('date-fns');
  const date_1 = new Date(date);
  date = format(addDays(date_1, 0), 'yyyy-MM-dd');
  let date1=req.body.date
  let from=req.body.from
  let to=req.body.to
  let venue=req.body.venue
  if(date1!=""){
   let query="update event_association set date1=?,from1=?,to1=?,venue=? where associationname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[date1,from,to,venue,association,event,date],(err,result)=>{
     
    if(err){
      console.log(err)
      res.send('unsuccessfull')
    }
   else
    res.send('successfull')
   
 })}
 else {
  let query="update event_association set from1=?,to1=?,venue=? where associationname=? and eventname=? and date1=?"
  // let query=" select * from student_reg_club"
   db.query(query,[from,to,venue,association,event,date],(err,result)=>{
     
    if(err){
      console.log(err)
      res.send('unccessfull')
    }
   else
      res.send('successfull')
   })}
})
  // delete association event
  app.get('/delete_association_event/:association/:event/:date',(req,res)=>{
    let association=req.params.association
    let event=req.params.event
    let date=req.params.date
    const date_1 = new Date(date);
  date = format(addDays(date_1, 0), 'yyyy-MM-dd');
    let query = 'delete from event_association where associationname=? and eventname=? and date1=?'
    db.query(query,[association,event,date],(err,result)=>{
      if(err)
        res.send('deletion unsuccessfull')
      else
        res.send('deletion successfull')
    })
  })
// update search club
app.get('/update_club',(req,res)=>{
  res.render('updateclub',{condition:false,msg:""})
})

app.post('/update_search_club',(req,res)=>{
let club=req.body.clubname
let query="select * from clubs where name=? "

 db.query(query,[club],(err,result)=>{

  if(result.length>0)
    res.render('updateclub',{condition:true,users:result[0],msg:""})
 else
  res.render('updateclub',{condition:false,users:result,msg:"no data found"})
  
})
})
//  update club
app.post('/update_club_post/:club',(req,res)=>{
  let club=req.params.club
  let email=req.body.email
  let incharge=req.body.incharge

 let query="update clubs set email=? ,incharge=? where name=?"

 db.query(query,[email,incharge,club],(err,result)=>{
   
  if(err){
    console.log(err)
    res.send('unsuccessfull')
  }
 else
  res.send('successfull'+result.affectedRows)
 })

})
// delete club
app.get('/delete_club/:club',(req,res)=>{
  let club=req.params.club
  let query = 'delete from clubs where name=? '
  db.query(query,[club],(err,result)=>{
    if(err)
      res.send('deletion unsuccessfull')
    else
      res.send('deletion successfull')
  })
})
// update association
app.get('/update_association',(req,res)=>{
  res.render('updateassociation',{condition:false,msg:""})
})
// search association
app.post('/update_search_association',(req,res)=>{
let association=req.body.associationname
let query="select * from associations where name=? "

 db.query(query,[association],(err,result)=>{

  if(result.length>0)
    res.render('updateassociation',{condition:true,users:result[0],msg:""})
 else
  res.render('updateassociation',{condition:false,users:result,msg:"no data found"})
  
})
})
// update association
app.post('/update_association_post/:association',(req,res)=>{
  let association=req.params.association
  let email=req.body.email
  let incharge=req.body.incharge

 let query="update associations set email=? ,incharge=? where name=?"

 db.query(query,[email,incharge,association],(err,result)=>{
   
  if(err){
    console.log(err)
    res.send('unsuccessfull')
  }
 else
  res.send('successfull')
 })

})
// delete association
app.get('/delete_association/:association',(req,res)=>{
  let association=req.params.association
  let query = 'delete from associations where name=? '
  db.query(query,[association],(err,result)=>{
    if(err)
      res.send('deletion unsuccessfull')
    else
      res.send('deletion successfull')
  })
})
// update club member
app.get('/update_clubmember',(req,res)=>{
  res.render('updateclubmember',{condition:false,msg:""})
})

app.post('/update_search_clubmember',(req,res)=>{
let club=req.body.clubname
let regno=req.body.regno

let query="select * from student_club where clubname=? and regno=?"

 db.query(query,[club,regno],(err,result)=>{

  if(result.length>0)
    res.render('updateclubmember',{condition:true,users:result[0],msg:""})
 else
  res.render('updateclubmember',{condition:false,users:result,msg:"no data found"})
  
})
})
//  update club memeber
app.post('/update_clubmember_post/:club/:regno',(req,res)=>{
let club=req.params.club
let regno=req.params.regno
let rollno=req.body.rollno
let year=req.body.year
let branch=req.body.branch
let position=req.body.position
let contact=req.body.contact
let email=req.body.email
 let query="update student_club set rollno=?,year=?,branch=?,position=?,email=?,contact=? where clubname=? and regno=?"

 db.query(query,[rollno,year,branch,position,email,contact,club,regno],(err,result)=>{
   
  if(err){
    console.log(err)
    res.send('unsuccessfull')
  }
 else
  res.send('successfull')
 
})

})
// delete club member
app.get('/delete_clubmember/:club/:regno',(req,res)=>{
  let club=req.params.club
  let regno=req.params.regno
  let query = 'delete from student_club where clubname=? and regno=?'
  db.query(query,[club,regno],(err,result)=>{
    if(err)
      res.send('deletion unsuccessfull')
    else
      res.send('deletion successfull')
  })
})
// update association member
app.get('/update_associationmember',(req,res)=>{
  res.render('updateassociationmember',{condition:false,msg:""})
})

app.post('/update_search_associationmember',(req,res)=>{
let club=req.body.clubname
let regno=req.body.regno

let query="select * from student_association where association=? and regno=?"

 db.query(query,[club,regno],(err,result)=>{

  if(result.length>0)
    res.render('updateassociationmember',{condition:true,users:result[0],msg:""})
 else
  res.render('updateassociationmember',{condition:false,users:result,msg:"no data found"})
  
})
})
//  update association memeber
app.post('/update_associationmember_post/:association/:regno',(req,res)=>{
let association=req.params.association
let regno=req.params.regno
let rollno=req.body.rollno
let year=req.body.year

let position=req.body.position
let contact=req.body.contact
let email=req.body.email
 let query="update student_association set rollno=?,year=?,position=?,email=?,contact=? where association=? and regno=?"

 db.query(query,[rollno,year,position,email,contact,association,regno],(err,result)=>{
   
  if(err){
    console.log(err)
    res.send('unsuccessfull')
  }
 else
  res.send('successfull')
 
})

})
// delete association member
app.get('/delete_associationmember/:association/:regno',(req,res)=>{
  let association=req.params.association
  let regno=req.params.regno
  let query = 'delete from student_association where association=? and regno=?'
  db.query(query,[association,regno],(err,result)=>{
    if(err)
      res.send('deletion unsuccessfull')
    else
      res.send('deletion successfull')
  })
})
// club members data
app.get('/club_member_data',(req,res)=>{
  res.render('clubmembersdata',{condition:false,users:{},msg:""})
})
app.post('/club_member_data_post',(req,res)=>{
  let club=req.body.clubname
  let regno=req.body.regno
  if(club!="Select Club"){
    if(regno!=""){
         let query='select * from student_club where clubname=? and regno=?'
         db.query(query,[club,regno],(err,result)=>{
 
          if(result.length>0)
            res.render('clubmembersdata',{condition:true,users:result,msg:""})
         else
            res.render('clubmembersdata',{condition:false,users:result,msg:"no data found"})
          
     })
    }
     else{
      let query='select * from student_club where clubname=?'
      db.query(query,[club],(err,result)=>{

       if(result.length>0)
         res.render('clubmembersdata',{condition:true,users:result,msg:""})
      else
         res.render('clubmembersdata',{condition:false,users:result,msg:"no data found"})
      })
     } 
  }
  else{
    if(regno!=""){
      let query='select * from student_club where regno=?'
      db.query(query,[regno],(err,result)=>{

       if(result.length>0)
         res.render('clubmembersdata',{condition:true,users:result,msg:""})
      else
         res.render('clubmembersdata',{condition:false,users:result,msg:"no data found"})
       
  })
 }
  else{
      res.render('clubmembersdata',{condition:false,users:{},msg:"you have not choosed any thing"})
  } 
  }
})
// association members data

app.get('/association_member_data',(req,res)=>{
  res.render('associationmembersdata',{condition:false,users:{},msg:""})
})
app.post('/association_member_data_post',(req,res)=>{
  let association=req.body.associationname
  let regno=req.body.regno
  if(association!="Select Association"){
    if(regno!=""){
         let query='select * from student_association where association=? and regno=?'
         db.query(query,[association,regno],(err,result)=>{
 
          if(result.length>0)
            res.render('associationmembersdata',{condition:true,users:result,msg:""})
         else
            res.render('associationmembersdata',{condition:false,users:result,msg:"no data found"})
          
     })
    }
     else{
      let query='select * from student_association where association=?'
      db.query(query,[association],(err,result)=>{

       if(result.length>0)
         res.render('associationmembersdata',{condition:true,users:result,msg:""})
      else
         res.render('associationmembersdata',{condition:false,users:result,msg:"no data found"})
      })
     } 
  }
  else{
    if(regno!=""){
      let query='select * from student_association where regno=?'
      db.query(query,[regno],(err,result)=>{

       if(result.length>0)
         res.render('associationmembersdata',{condition:true,users:result,msg:""})
      else
         res.render('associationmembersdata',{condition:false,users:result,msg:"no data found"})
       
  })
 }
  else{
      res.render('associationmembersdata',{condition:false,users:{},msg:"you have not choosed any thing"})
  } 
  }
})
// logout 
app.get('/logout',(req,res)=>{
  res.redirect('/')
})
//  admin page
app.get('/adminpage1',(req,res)=>{
  res.render('adminpage1')
})

app.listen(port,(err)=>{
    if(err)
      console.log('not listening')
    else
    console.log('listening')
})

app.get('/past_showmore',(req,res)=>{
  length2=length2+3;
  res.redirect('/')
})
app.get('/past_showless',(req,res)=>{
  if(length2>3)
   length2=length2-3;
  res.redirect('/')
})
app.get('/up_showmore',(req,res)=>{
  length1=length1+3;
  res.redirect('/')
})
app.get('/up_showless',(req,res)=>{
  if(length1>3)
    length1=length1-3;
  res.redirect('/')
})