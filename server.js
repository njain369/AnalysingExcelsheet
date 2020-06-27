import path from 'path';
var express = require('express');
var mysql = require('mysql');
const excel=require('exceljs');
let port = process.env.PORT || 3000;
const url=process.env.NODE_ENV==`production`?``:"http://localhost:3000";

var app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(function(req,res,next){
 res.header('Access-Control-Allow-Origin', "*");
 res.header('Access-Control-Allow-Methods','GET,PUT,POST,DELETE');
 res.header('Access-Control-Allow-Headers', 'Content-Type');
 next();
});
if(process.env.NODE_ENV=='production'){
    app.use(express.static(path.resolve(__dirname,`./dist`)));
    app.get('/*',(req,res)=>{
        res.sendFile(path.resolve('index.html'));
    });
}

var connection = mysql.createPool({
    host:'us-cdbr-east-06.cleardb.net',
    port:3306,
    user:'b3ef2efda41813',
    password:'44f4c812',
    database:'heroku_4a6cdaac807847d'
})
// var connection = mysql.createConnection({
//   host:'',
//   port:3306,
//   user:'root',
//   password:'',
//   database:'nptel'
// })
// connection.connect(function(error){

//     if(!!error){
//         console.log(error); 
//        } else{
//         console.log('Connectd');
//        }
// });
// connection.on('error',function(err){
//   console.log("caught this error"+err.toString());
// });

app.post('/send',(req, res) => {
  console.log("In here");
  //var data1=JSON.parse(req.body);
  var i;					
  console.log(req.body.year);
  console.log(req.body.rows.length);
  console.log(req.body.coursename.length);
  for(i=0;i<req.body.coursename.length;i++){
    if(req.body.coursename[i]){
     let data1={c_name:req.body.coursename[i],elite_performance:req.body.elite[i],
       elitegold:req.body.elitegold[i],success_completed:req.body.successComp[i],below40:req.body.below40[i],	
       elitesilver:req.body.elitesilver[i],year:req.body.year};
       console.log(data1);
    let sql = "INSERT INTO analysis1 set ?";

      let query2 = connection.query(sql, data1,(err, results) => {
        if(!!err){
          console.log(err); 
        }        

      });
    }
  }

      				
  console.log('in query3');

    let data2={"total_elite":req.body.elitesum,"totalelitesilver":req.body.elitesilversum,
      "total_gold":req.body.elitegoldsum,"total_success":req.body.successCompsum,
      "year":req.body.year,"below40":req.body.below40sum};
      console.log(req.body.elitesum);
      					
      let sql3 = "INSERT INTO totalanalysis set ?";
      let query3 = connection.query(sql3, data2,(err, results) => {
        if(!!err){
          console.log(err); 
         }
      
    });

  let data = {roll: req.body.rows.roll, name: req.body.rows.name, lastname: req.body.rows.lastname};
  for(i=1;i<1000;i++){
    console.log(req.body.rows[i][0]);
     if(!req.body.rows[i][0]){
        break;
      } 
    
    let data={course_id:req.body.rows[i][1],c_name:req.body.rows[i][2],roll_no:req.body.rows[i][3],name:req.body.rows[i][4],
      email_id:req.body.rows[i][5],dob:req.body.rows[i][6],role:req.body.rows[i][7],department:req.body.rows[i][8]
      ,year_of_passing:req.body.rows[i][9],clg_roll_no:req.body.rows[i][10],score_assign:req.body.rows[i][11],
      exam_score:req.body.rows[i][12],final_score:req.body.rows[i][13],certificate_type:req.body.rows[i][14],
      topper:req.body.rows[i][15],year:req.body.year};
    let sql1 = "INSERT INTO result set ?";
    let query1 = connection.query(sql1, data,(err, results) => {
      // if(!!err){
      //   console.log(err); 
      // }        
    });
  }



    res.redirect(url+'/dashboard');
   
  });
  app.get("/analysisreport",(req,res)=>{
    res.download("\analysis.xlsx");
});

app.get("/downstd",(req,res)=>{
  res.download("\anlaysis1.xlsx");
})

app.get("/selectstd",function(req,res){
  connection.query("select * from registration",function(error,results){
    if(error){
      res.status(400).send('error in database operation');
    }else{
      let workbook = new excel.Workbook();
      let worksheet = workbook.addWorksheet('Analysis');
   
   worksheet.columns = [
    {header:'Name',key:'Name',width:'20'},
    {header:'Lastname',key:'Lastname',width:'10'},
    {header:'DOB',key:'DOB',width:'10'},
    {header:'Rollno',key:'Rollno',width:'10'},
    {header:'Caste',key:'Caste',width:'10'},
    {header:'Gender',key:'Gender',width:'10'},
    {header:'Email',key:'Email',width:'30'},
    {header:'Phone',key:'Phone',width:'20'},
    {header:'Year',key:'Year',width:'10'},
    {header:'Branch',key:'Branch',width:'10'},
    {header:'StudentFaculty',key:'StudentFaculty',width:'15'},
    {header:'Coursename',key:'Coursename',width:'20'},
    
   ];
   
   worksheet.addRows(results);
   workbook.xlsx.writeFile("anlaysis1.xlsx")
   .then(function () {
       console.log("file saved!");
   });
   
      res.send({results:results});
  }       
    
  })
})
  app.get("/selectall",function(req,res){
    connection.query("select * from analysis1",function(error,results){
    if(error){
        res.status(400).send('error in database operation');
    }else{

        let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Analysis');
     
     worksheet.columns = [
       {header:'CourseName',key:'c_name',width:'40'},
       {header:'Elite Performance',key:'elite_performance',width:'10'},
       {header:'Elite Gold',key:'elitegold',width:'10'},
       {header:'Elite Silver',key:'elitesilver',width:'10'},
       {header:'Completed',key:'success_completed',width:'10'},
       {header:'Below 40',key:'below40',width:'10'},
       {header:'Year',key:'year',width:'10'}
     ];
     
     worksheet.addRows(results);
     workbook.xlsx.writeFile("analysis.xlsx")
     .then(function () {
         console.log("file saved!");
     });
     
        res.send({results:results});
    }       
    });
  });
    
app.get("/piedata",function(req,res){
  connection.query("select Sum(total_elite) as total_elite,Sum(totalelitesilver) as totalelitesilver,Sum(total_gold) as total_gold,Sum(total_success) as total_success,Sum(below40) as below40 from totalanalysis",function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
      console.log(results);
      res.send({results:results});
  }       
  });
});


app.post("/piedatayear",function(req,res){
  var sql4="select * from totalanalysis where 1";
  if(!req.body.null1){
    sql4="select * from totalanalysis";
  }
  else{
    if(req.body.year!=='Select Year'){
      sql4+=" and Year=\'"+req.body.year+"\'";    
    }
  }
  connection.query(sql4,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
      console.log(results);
      res.send({results:results});
  }       
  });
});

app.post("/filterdata",function(req,res){
  console.log("In here"); 
  var sql5="select * from analysis1 where 1";
  console.log(req.body);
  if(!req.body.null1){
    sql5="select * from analysis1";
  }
  else{
    if(req.body.class1!=='Certificate-Type'){
      sql5="select c_name,"+req.body.class1+" from  analysis1 where 1"
    }

    if(req.body.year!=='Select Year'){
      sql5+=" and year=\'"+req.body.year+"\'";    
    }  
  }
  console.log(sql5);
  connection.query(sql5,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
    let workbook = new excel.Workbook();
        let worksheet = workbook.addWorksheet('Analysis');
     if(req.body.year!=='Select Year'){
     worksheet.columns = [
       {header:'CourseName',key:'c_name',width:'40'},
       {header:req.body.class1 ,key:req.body.class1,width:'10'},
       {header:'Year',key:'year',width:'10'}
     ];}
     else{
      worksheet.columns = [
        {header:'CourseName',key:'c_name',width:'40'},
        {header:'Elite Performance',key:'elite_performance',width:'10'},
        {header:'Elite Gold',key:'elitegold',width:'10'},
        {header:'Elite Silver',key:'elitesilver',width:'10'},
        {header:'Completed',key:'success_completed',width:'10'},
        {header:'Below 40',key:'below40',width:'10'},
        {header:'Year',key:'year',width:'10'}
      ];
      
     }
     
     worksheet.addRows(results);
     workbook.xlsx.writeFile("analysis.xlsx")
     
      console.log(results);
      res.send({results:results});
  }       
  });
});

app.post("/studentdata",function(req,res){
  console.log("In here"); 
  var sql5="select * from registration where 1";
  console.log(req.body);
  if(!req.body.null1){
    sql5="select * from registration";
  }
  else{
    if(req.body.dep!=='Select Department'){
      sql5+=" and Branch=\'"+req.body.dep+"\'";    
    }
    if(req.body.class1!=='Select Class'){
      sql5+=" and Year=\'"+req.body.class1+"\'";    
    }    
    if(req.body.year!=='Select Year'){
      sql5+=" and Year=\'"+req.body.year+"\'";    
    }  
  }
  console.log(sql5);
  connection.query(sql5,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
  console.log("I am inside printing excel.")
    let workbook = new excel.Workbook();
    let worksheet = workbook.addWorksheet('Analysis');
 
 worksheet.columns = [
  {header:'Name',key:'Name',width:'20'},
  {header:'Lastname',key:'Lastname',width:'10'},
  {header:'DOB',key:'DOB',width:'10'},
  {header:'Rollno',key:'Rollno',width:'10'},
  {header:'Caste',key:'Caste',width:'10'},
  {header:'Gender',key:'Gender',width:'10'},
  {header:'Email',key:'Email',width:'30'},
  {header:'Phone',key:'Phone',width:'20'},
  {header:'Year',key:'Year',width:'10'},
  {header:'Branch',key:'Branch',width:'10'},
  {header:'StudentFaculty',key:'StudentFaculty',width:'15'},
  {header:'Coursename',key:'Coursename',width:'20'},
  
 ];
 
 worksheet.addRows(results);
 workbook.xlsx.writeFile("anlaysis1.xlsx")
 .then(function () {
     console.log("file saved!");
 });

      console.log(results);
      res.send({results:results});
  }       
  }); 
});
//Truncating table REST API

app.post("/truncatefilter",function(req,res){
  var sql="TRUNCATE TABLE heroku_4a6cdaac807847d.analysis1";
  connection.query(sql,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
    console.log("DOne with deletion in filter");
      console.log(results);
      res.send({results:results});
  }       
  });
});

app.get("/truncatetotal",function(req,res){
  var sql="TRUNCATE TABLE heroku_4a6cdaac807847d.totalanalysis";
  connection.query(sql,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
      console.log("Deleted Total Congo");
      res.send({results:results});
  }       
  });
});

app.get("/truncatestd",function(req,res){
  var sql="TRUNCATE TABLE heroku_4a6cdaac807847d.registration";
  connection.query(sql,function(error,results){
  if(error){
      res.status(400).send('error in database operation');
  }else{
      console.log(results);
      res.send({results:results});
  }       
  });
});
app.listen(port);

// app.get('/',function(req,resp){
//     var sql = "INSERT INTO mySampleTable VALUES ('3', 'Ashitosh','Jaswani')";
// connection.query(sql,function(error,rows,fields){
//     if(!!error){
//         console.log('Error in the query'); 
//        } else{
//         console.log('sucess');
//        }
// });
// });
//route for insert data