const db = require("../config")
let nodemailer = require('nodemailer');
var sql=""
const getDevice=(req,res)=>{
    const search=req.query.searchtxt
    sql=`SELECT * FROM jsw.jsw_devices WHERE location_name LIKE '%${search}%' OR device_id LIKE '%${search}%'`
    db.query(sql,(err,result)=>{
        if(err)console.log(err);
        res.json(result)
    })
}
const getNotifications=(req,res)=>{
    const device_id=req.query.device_id
    if(device_id=="All"){
        sql=`SELECT * FROM jsw_notifications where status=1 `
    }else{
        sql=`SELECT * FROM jsw_notifications where status=1 AND device_id="${device_id}"`
    }
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const updateNotification=(req,res)=>{
sql=`UPDATE jsw_notifications SET status =0 where dates="${req.query.dates}"`
db.query(sql,(err,result)=>{
    if(err)res.json(err)
    res.json(result)
})
}

const getDeviceLevels=(req,res)=>{
    const level=req.query.level
    if(level==0){
        sql="SELECT * FROM jsw.jsw_devices"
        db.query(sql,(err,result)=>{
            if(err)res.json(err)
            // console.log(result[0]);
            res.json(result)
        })

    }else{
        sql=`SELECT * FROM jsw.jsw_devices where location_type="${level}"`
        db.query(sql,(err,result)=>{
            if(err)res.json(err)
            res.json(result)
        })
    }
}
const getAllThreshold=(req,res)=>{
    var {StartDate,EndDate}=req.query
    sql=`SELECT * FROM jsw_threshold where  dates >="${StartDate}" AND dates <="${EndDate}"`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const deviceAgainstThreshold =(req,res)=>{
    var {StartDate,EndDate,device_id}=req.query
    sql=`SELECT * FROM jsw_threshold where  dates >="${StartDate}" AND dates <="${EndDate}" AND devices_id="${device_id}"`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const getDeviceLocation=(req,res)=>{
    var arr=req.body.locations.split(',');
    const placeholders = arr.map(() => '?').join(',');
    const query = `SELECT DISTINCT device_id, location_name FROM jsw.jsw_devices WHERE device_id IN (${placeholders})`;
    

db.query(query, arr, function (error, results, fields) {
  if (error) throw error;
  res.json(results); // This will output the results of the query
});
}

// http://localhost:5000/device/insertDeviceData?device_id=001&co_data=10&raw_value=3
const insertDeviceData=(req,res)=>{
    const {co_data, device_id, raw_value}=req.query
    const values = [device_id,co_data, raw_value];
    sql="INSERT INTO jsw_data (dates, device_id, co_data, raw_value) VALUES(Now(),?,?,?)"
    db.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error inserting data: ', error);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    });
}
// http://localhost:5000/device/insertDeviceThreshold?devices_id=001&co_data=10&peak_duration=3
const insertDeviceThreshold=(req,res)=>{
    const {co_data, devices_id, peak_duration}=req.query
    const values = [devices_id,co_data, peak_duration];
    sql="INSERT INTO jsw_threshold (dates, devices_id, co_data, peak_duration) VALUES(Now(),?,?,?)"
    db.query(sql, values, (error, results, fields) => {
      if (error) {
        console.error('Error inserting data: ', error);
        res.status(500).send('Error inserting data');
        return;
      }
      console.log('Data inserted successfully');
      res.status(200).send('Data inserted successfully');
    });
}
const GetFactor=(req,res)=>{
    const device_id=req.query.device_id
    sql=`SELECT * FROM jsw_factor where device_id="${device_id}"`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetEmailAlerts=(req,res)=>{
    const {device_id,co2}=req.query
    sql=`SELECT * FROM jsw_email_alerts where device_id="${device_id}"`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetDeviceSettings=(req,res)=>{
    // sql="select jf.device_id,jf.factor,jf.Offset,jd.location_type,jd.location_id,jd.location_name,jf.threshold,jf.status1  from jsw_factor as jf inner join jsw_devices as jd where jf.device_id = jd.device_id"
    sql="SELECT jf.device_id,jf.factor,jf.Offset,jd.location_name,jf.threshold,jf.status1,CASE WHEN jd.location_type = 1 THEN 'High' WHEN jd.location_type = 2 THEN 'Medium' WHEN jd.location_type = 3 THEN 'Low' ELSE 'Unknown'END AS location_type FROM jsw_factor AS jf INNER JOIN jsw_devices AS jd ON jf.device_id = jd.device_id"
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetDeviceNotFactor=(req,res)=>{
    sql="SELECT d.dates,d.device_id,d.location_name,d.location_id FROM jsw_devices AS d LEFT JOIN jsw_factor AS f ON d.device_id = f.device_id WHERE f.device_id IS NULL OR d.device_id IS NULL"
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetDeviceNotEmailAlert=(req,res)=>{
    sql="SELECT d.dates,d.device_id,d.location_name,d.location_id FROM jsw_devices AS d LEFT JOIN jsw_email_alerts AS f ON d.device_id = f.device_id WHERE f.device_id IS NULL OR d.device_id IS NULL"
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetDeviceSettingsFreeSearch=(req,res)=>{
    const search=req.query.searchtxt
    sql=`SELECT jf.device_id,jf.factor,jf.Offset,jd.location_name,jf.threshold,jf.status1,CASE WHEN jd.location_type = 1 THEN 'High' WHEN jd.location_type = 2 THEN 'Medium' WHEN jd.location_type = 3 THEN 'Low' ELSE 'Unknown'END AS location_type FROM jsw_factor AS jf INNER JOIN jsw_devices AS jd ON jf.device_id = jd.device_id WHERE jd.location_name LIKE '%${search}%' OR jd.device_id LIKE '%${search}%'`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const GetEmailSettings=(req,res)=>{
    sql="SELECT jd.location_name,jd.device_id,jd.threshold2,jf.status2,jea.emails FROM jsw_email_alerts AS jea INNER JOIN jsw_devices AS jd ON jd.device_id = jea.device_id INNER JOIN jsw_factor AS jf ON jd.device_id = jf.device_id"
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        // console.log(result);
        res.json(result)
    })
}
const GetEmailsSettingsFreeSearch=(req,res)=>{
    const search=req.query.searchtxt
    sql=`SELECT jd.location_name,jd.device_id,jd.threshold2,jf.status2,jea.emails FROM jsw_email_alerts AS jea INNER JOIN jsw_devices AS jd ON jd.device_id = jea.device_id INNER JOIN jsw_factor AS jf ON jd.device_id = jf.device_id WHERE jd.location_name LIKE '%${search}%' OR jd.device_id LIKE '%${search}%'`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const InsertUser=(req,res)=>{
    var value=[req.body.username,req.body.password,req.body.roll,req.body.addedby]
    sql="INSERT INTO login (username, password, roll, addedby) VALUES (?,?,?,?)"
    db.query(sql,value,(err,result)=>{
        if(err)res.json(err)
        res.json({status:"success",message:"User Added Successfully"})
    })
}
const GetUser=(req,res)=>{
    sql="select * from login"
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
const RemoveUser=(req,res)=>{
    const id=req.query.id
    sql=`delete from login where id=${id}`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json({status:"success",message:"User Deleted Successfully"})
    })

}
const GetDeviceHighestCo2=(req,res)=>{
    const {StartDate,EndDate}=req.query
    sql=`CALL get_threshold_count("${StartDate}","${EndDate}")`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json({result:result[0]})
    })

}
const SendMails=async(req,res)=>{
    const {device_id,value}=req.query
    sql=`SELECT jd.location_name,jd.device_id,jd.threshold2,jf.status2,jea.emails FROM jsw_email_alerts AS jea INNER JOIN jsw_devices AS jd ON jd.device_id = jea.device_id INNER JOIN jsw_factor AS jf ON jd.device_id = jf.device_id WHERE jd.device_id="${device_id}"`
    db.query(sql,async(err,result)=>{
        if(err)res.json(err)
        // res.json(result)
    var emails=String(result[0].emails).split(',')
    const transporter=nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:"ganesanmbca@gmail.com",
            pass:"hfbt kqxn ynlj dula"
        }
      })
      let info = await transporter.sendMail({
        from: 'maheshlakshmipathi94@gmail.com', // Sender address
        to: emails, // List of receivers
        subject: "JSW Threshold Alert", // Subject line
        text: "Hello  This is an SMTP message with customizations", // Plain text body
      });
    res.json(info)

    })

    // let transporter = nodemailer.createTransport({
    //     host: "smtp-relay.brevo.com",
    //     port: 587,
    //     secure: false, // true for 465, false for other ports
    //     // auth: {
    //     //   authMethod: "apikey", // Specify API key authentication
    //     //   apiKey: "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" // Your Brevo API key
    //     // }
    //     auth: {
    //         user: "maheshlakshmipathi94@gmail.com",
    //         pass: "FXLaTA2K3P7YGxqM"
    //       }, connectionTimeout: 10000, // 10 seconds
    //       socketTimeout: 60000,     // 60 seconds
    //   });
    
      // Send mail with defined transport object
      
   
    
    //   console.log("Message sent: %s", info.messageId);
    

}

const UpdateEmailSettings=async(req,res)=>{
    const {threshold,device_id,emails,status2}=req.body
    console.log(threshold,device_id,emails,status2);
    sql=`CALL update_device_emailsandthreshold(${device_id},${threshold},"${emails}",${status2})`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json("Data Updated Successfully")
    })
}
const UpdateDeviceSettings=(req,res)=>{
    const {threshold,device_id,location,factor,offset,status1}=req.body
    console.log(threshold,device_id,location,offset,factor);
    sql=`CALL update_device_threshold(${device_id},${threshold},"${location}",${offset},${factor},${status1})`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json({result:result})
    })
}
const GetThreshold=(req,res)=>{
    const device_id=req.query.device_id
    sql=`select * from jsw_threshold where devices_id="${device_id}"`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })

}
const InsertFactorDeviceData=(req,res)=>{
const query = 'INSERT INTO jsw_factor (dates, device_id, factor, threshold, Offset, status1) VALUES (Now(), ?, ?, ?, ?, ?)';
// Define the values for the placeholders
const values = [req.body.device_id,req.body.factor,req.body.threshold,req.body.Offset,req.body.status1];
// Execute the query with the values
db.query(query, values, (error, results, fields) => {
  if (error) throw error;
  res.json('Inserted successfully');
});
}
// const InsertFactorEmailData=(req,res)=>{
//     const query = 'INSERT INTO jsw_email_alerts (dates, device_id, emails, status, added_by) VALUES  (Now(), ?, ?, ?, ?)';
//     // Define the values for the placeholders
//     const values = [req.body.device_id,req.body.emails,req.body.status,req.body.added_by];
//     // Execute the query with the values
//     db.query(query, values, (error, results, fields) => {
//       if (error) throw error;
//       res.json('Inserted successfully');
//     });
// }
const Login=(req,res)=>{
    const {username,password}=req.body
    console.log(req.body);
    sql=`SELECT * FROM jsw.login where username="${username}"`
    db.query(sql, (error, results, fields) => {
        if (error) throw error;
        if(results.length !==0){
            if(results[0].password==password){
                res.json({status:true,msg:"User Get Successfully",results});
            }else{
        res.json({status:false,msg:"User Password Wrong"});

            }
        }else{
        res.json({status:false,msg:"User Not Found"});

        }
      });
}
const InsertEmailAlertAndFactor=(req,res)=>{
    const {device_id,emails,status,added_by,threshold}=req.body
    sql=`CALL add_device_emailandfactor("${device_id}","${threshold}","${emails}","${status}","${added_by}")`
    db.query(sql,(err,result)=>{
        if(err)res.json(err)
        res.json(result)
    })
}
module.exports={
    getDevice,
    getNotifications,
    updateNotification,
    getDeviceLevels,
    getAllThreshold,
    getDeviceLocation,
    insertDeviceThreshold,
    insertDeviceData,
    GetEmailAlerts,
    GetFactor,
    SendMails,
    GetDeviceSettings,
    GetEmailSettings,
    InsertUser,
    GetUser,
    RemoveUser,
    UpdateEmailSettings,
    UpdateDeviceSettings,
    GetDeviceHighestCo2,
    GetDeviceSettingsFreeSearch,
    GetEmailsSettingsFreeSearch,
    GetThreshold,
    deviceAgainstThreshold,
    GetDeviceNotFactor,
    GetDeviceNotEmailAlert,
    InsertFactorDeviceData,
    // InsertFactorEmailData,
    Login,
    InsertEmailAlertAndFactor

}