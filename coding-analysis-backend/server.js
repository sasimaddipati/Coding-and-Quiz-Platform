const exp = require('express');
const expressAsyncHandler = require('express-async-handler');
const cors = require('cors');
const { MongoClient } = require('mongodb');
const app = exp();
app.use(cors());
app.use(exp.json());
const axios = require('axios');

const mClient = new MongoClient('mongodb+srv://sasimaddipati65:xxxxxxxxxx@cluster0.obnki.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
let register;
mClient.connect()
    .then((connectionObj) => {
        const fsddb = connectionObj.db('web-quiz');
        register = fsddb.collection('register-users');
        zoneCodes = fsddb.collection('All-created-zones')
        quiz = fsddb.collection('quiz')
        contest = fsddb.collection('coding')
        quizscore = fsddb.collection('private-score-quiz')
        app.listen(3300, () => console.log("HTTP server started at port 3300")); 
    });        
 //const axios = require('axios');

  
app.post('/compile', expressAsyncHandler(async (req, res) => {
    const { language, code } = req.body;
   console.log(language, code)
    if (!language || !code) {
        return res.status(400).send({ message: 'Language and code are required' });
    }

    const jdoodleUrl = 'https://api.jdoodle.com/v1/execute';
    const jdoodleClientId = 'eba0b13e954f5f17c2c7006bca63047d';
    const jdoodleClientSecret = '16b33f93e0ba204e2758a2ddfc7d8160135b2b0ef42fec7cb4a10a00a2d24e4f';

    const requestData = {
        script: code,
        language: language,
        versionIndex: '0', 
        clientId: jdoodleClientId,
        clientSecret: jdoodleClientSecret,
    };
    try {
        console.log('h')
        const response = await axios.post(jdoodleUrl, requestData);
        console.log(response)
        const { output, error } = response.data;
        if (error) {
            return res.status(400).send({ message: 'Compilation Error', error });
        }
        res.send({ message: 'Execution successful', output });
    } catch (error) {
        res.status(500).send({ message: 'Server Error', error: error.message });
    }
}));
//checktestcases and compile
app.post(
  '/compile-checktestcase',
  expressAsyncHandler(async (req, res) => {
    const { code, language, input } = req.body; // Extract data from request body

    console.log(`Received: Language - ${language}, Code - ${code}`);

    if (!language || !code) {
      return res.status(400).send({ message: 'Language and code are required' });
    }
    const jdoodleUrl = 'https://api.jdoodle.com/v1/execute';
    const jdoodleClientId = 'ceac88f927da3a197a9cacebbd94b1ff';
    const jdoodleClientSecret = '650a6f1ad5e02904cbb66ebe4cfc2cae7b3c7d3743e1ca3a32ed499b304bbfe8';

    const requestData = {
      script: code,
      stdin: input,
      language: language,
      versionIndex: '0', 
      clientId: jdoodleClientId,
      clientSecret: jdoodleClientSecret,
    };

    try {
      console.log('Sending request to JDoodle...');
      const response = await axios.post(jdoodleUrl, requestData); // Send POST request to JDoodle

      const { output, error, statusCode, cpuTime, memory } = response.data; // Destructure response data
      console.log('JDoodle Response:', response.data);

      if (statusCode !== 200) {
        return res.status(400).send({ message: 'Compilation Error', error });
      }

      res.send({
        message: 'Execution successful',
        output, 
        cpuTime, 
        memory,
      });
    } catch (err) {
      console.error('JDoodle API Error:', err);
      res.status(500).send({ message: 'Server Error', error: err.message });
    }
  })
);

//add to skillspace quiz to database
app.post('/quiz', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    const result = await quiz.insertOne({item})
    res.send({message:"good"})
}));
app.post('/get-quiz', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    const result = await quiz.find().toArray();
    res.send({message:"good",quiz:result})
}));
//attemp skillspace quiz question
app.post('/get-quiz-question-skillspace', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    console.log(item.name)
    const result = await quiz.find({"item.name":item.name}).toArray();
    console.log(result)
    res.send({message:"good",quiz:result})
}));
//attemp skillspace contest question
app.post('/get-contest-question-skillspace', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    console.log(item.name)
    const result = await contest.find({"item.name":item.name}).toArray();
    console.log(result)
    res.send({message:"good",contest:result})
}));
//add to skillspace contest to database
app.post('/contest', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    const username = req.params.username;
    const result = await contest.insertOne({item})
    res.send({message:"good"})
}));
app.post('/get-contest', expressAsyncHandler(async (req, res) => {
    const item = req.body;
    const result = await contest.find().toArray();
    res.send({message:"good",contest:result})
}));

// add the new register
app.post('/user-register', expressAsyncHandler(async (req, res) => {
    const details = req.body;
    const result = await register.insertOne({ details }); 
    res.send({ message: 'User registered', payload: details });
}));
//login check
app.post('/user-login', expressAsyncHandler(async (req, res) => {
    const details = req.body;
    const result = await register.findOne({$and:[{"details.data.username" : details.data.username },{"details.data.password" : details.data.password}]}); 
    res.send({ message: 'User login', payload: result}); 
}));
//add new class zone:
app.post('/add-class-zone/:username', expressAsyncHandler(async (req, res) => {
    const details = req.body;
    const username = req.params.username;
    const create_by_name = await register.findOne({"details.data.username":username},{"details.data.first_name" : 1})
    console.log(create_by_name.details.data.first_name);
    const result = await zoneCodes.insertOne({zone : details,Author:create_by_name.details.data.first_name});
    const result2 = await register.updateOne({"details.data.username":username}
        ,{$push:{"createzone":details }})
        const result1 = await register.findOne({"details.data.username":username});
    res.send({ message: 'User login', payload: result1}); 
}));
//post zones to main base:
app.post('/post-created-zone/:username', expressAsyncHandler(async (req, res) => {
    const details = req.body;
    const username = req.params.username;
    const result2 = await register.findOne({"details.data.username":username})
    res.send({ message: 'User login', payload: result2}); 
}));
//selecting created zones from the main base:
app.post('/delete-created-zone/:username',expressAsyncHandler(async (req, res) => {
     const details = req.body;
     const username = req.params.username;
     const result = await register.findOne({"details.data.username":username});
    const arr = result.createzone;
    const k = arr.filter((ele)=>ele.zonename.zonename!==details.zonename);
    const result1 = await register.updateOne({"details.data.username":username},{$set:{createzone:k}})
    const result2 = await register.findOne({"details.data.username":username});
     res.send({mes:"hello",payload:result2})
}));
// assigning the quiz and contest into the unassign in register:
app.post('/addto-unassign-contest/:username', expressAsyncHandler(async (req, res) => {
          const k = req.body;
          const username = req.params.username;
          const result = await register.updateOne({"details.data.username":username},{$push:{"item":{k}}})
          res.send({message:"good"})
}));
app.post('/addto-unassign-quiz/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const username = req.params.username;
    const result = await register.updateOne({"details.data.username":username},{$push:{"item":{k}}})
    res.send({message:"good"})
}));
//get unassign items from unassign component
app.post('/get-unassign-item/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const username = req.params.username;
    const result = await register.findOne({"details.data.username":username})
    res.send({message:"sucess",payload:result.item})
}));
//assign to the upcoming
app.post('/assign-to-upcoming/:username', expressAsyncHandler(async (req, res) => {
    const m = req.body;
    const username = req.params.username;
    const result1 = await zoneCodes.updateOne({"zone.zonename.zonename":m.item.k.zonename},{$push:{"new":{m}}})
    const result = await register.findOne({"details.data.username":username})
    const x = result.item;
    const y = x.filter((it)=>it.k.name!==m.item.k.name);
    const result8 = await register.updateOne({"details.data.username":username},{$set:{item:y}})
    res.send({message:"hi",payload:y});
}));
//get the upcoming contest:
app.post('/get-upcoming-item/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const username = req.params.username;
     const result = await zoneCodes.findOne({"zone.zonename.zonename":k.zonename})
     //console.log(result.new)
     res.send({message:"hello",payload:result.new});
    }));
//get completed contests:
app.post('/get-completed-item/:username', expressAsyncHandler(async (req, res) => {
    const { zonename } = req.body;
    const username = req.params.username; 
    let currentDate = new Date();
    let date = currentDate.getDate();
    let month = currentDate.getMonth() + 1; 
    let year = currentDate.getFullYear();
    let hours = currentDate.getHours();
    let minutes = currentDate.getMinutes();
    let currentDateString = `${year}-${month < 10 ? '0' + month : month}-${date < 10 ? '0' + date : date}`;
    let currentTimeString = `${hours < 10 ? '0' + hours : hours}:${minutes < 10 ? '0' + minutes : minutes}`;
    const result = await zoneCodes.findOne({ "zone.zonename.zonename": zonename });
    if (result && result.new) {
        let expiredItems = []; 
        let validItems = [];
        for (let item of result.new) {
            if (currentDateString >    item.m.Data?.date1 || (currentDateString ===    item.m.Data?.date1 && currentTimeString >    item.m.Data?.time1)) {
                await zoneCodes.updateOne(
                    { "zone.zonename.zonename": zonename },
                    { $push: { "completed": item  } }
                );
            } else {
                 validItems.push(item)
            }
        }
        await zoneCodes.updateOne(
            { "zone.zonename.zonename": zonename },
            { $set: { new: validItems } }
        );
        const result3 = await zoneCodes.findOne({ "zone.zonename.zonename": zonename });

        console.log(result3.completed);
        res.status(200).json({
            message: 'Items updated',
            expiredItems: result3.completed, 
            validItems: result3.new 
        });
    } 
}));
//join into classzone:
app.post('/join-withcode/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const username = req.params.username;
    //console.log(k)
    const res1 = await zoneCodes.findOne({"zone.code":k.data.input_code});
    //console.log(res1)
    if(res1!==null){
         const res2 = await register.updateOne({"details.data.username":username},{$push:{"joined":res1}})
    }
    const res3 = await register.findOne({"details.data.username":username})
    //console.log(res3.joined)
    res.send({message:"suc",joined:res3.joined});
}));
//get joincodes
app.post('/get-join-withcode/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    console.log('hi')
    const username = req.params.username;
    const res3 = await register.findOne({"details.data.username":username})
    console.log(res3)
    res.send({message:"suc",joined:res3.joined});
}));
//delete join
app.post('/delete-join/:username', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const username = req.params.username;
    const res3 = await register.findOne({"details.data.username":username})
    const temp = res3.joined;
    //console.log(k.zone," ",temp)
    const temp1 = temp.filter((ite)=>ite.zone.code!==k.zone.zone.code);
    const res4 = await register.updateOne({"details.data.username":username},{$set:{"joined":temp1}});
    //console.log(temp1)
    res.send({message:"suc",joined:temp1});
}));
//open join
app.post('/open-join/:zone', expressAsyncHandler(async (req, res) => {
    const k = req.body;
    const zone = req.params.zone;
    console.log(zone)
    const res3 = await zoneCodes.findOne({"zone.zonename.zonename":zone})
    res.send({message:"suc",open:res3});

}));
//add score the quiz:
app.post('/add-quiz-score/:username', expressAsyncHandler(async (req, res) => {
    const {zone,name,score} = req.body;
      const username = req.params.username;
      const res3 = await quizscore.find({name:name,zonename:zone}).toArray();
      console.log(res3)
      if(res3.length === 0){
     const result = await quizscore.updateOne(
        { zonename: zone, name: name },
        {
          $push: { scores: { username, score } },
        },
        { upsert: true } // This will create a new document if no match is found
      );
      res.send({mes:"not attempted",sol:1});  
    }
    else{
        res.send({mes:"already attempted",sol:0});  
    }
}));
//get-result :
app.post('/get-result/:username', expressAsyncHandler(async (req, res) => {
    const {zone,name} = req.body;
      const username = req.params.username;
      const res3 = await quizscore.findOne({name:name,zonename:zone});
      console.log(res3)
      if(res3===null)
         res.send({sol:"NOT ATTEMPTED"});
        let c;
    const k = res3.scores;
    for(let i=0;i<k.length;i++){
          if(k[i].username===username){
              c = k[i].score;
              break;
          }

    }
    if(c.length!==undefined){
          let m = 0;
          for(let i=0;i<c.length;i++){
              if(c[i]===1)
                 m++;
          }
          res.send({sol: `${m}/${c.length} Solved`})
    }
    else
    res.send({sol: `${c} Accuracy`})
}));
app.post('/analysis', expressAsyncHandler(async (req, res) => {
    const {zone,name} = req.body;
      const username = req.params.username;
      console.log(name," ",zone);
      const res3 = await quizscore.findOne({name:name,zonename:zone});
      console.log(res3)
      res.send({data:res3})
}));



