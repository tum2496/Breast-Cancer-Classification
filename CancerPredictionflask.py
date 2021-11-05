from flask import Flask,jsonify
import numpy as np
import pandas as pd
import pickle 
import json
from flask_cors import CORS, cross_origin
from flask import request
from twilio.rest import Client
app = Flask(__name__)
cors = CORS(app)
#auth token for Twilio trial account changing on daily basis.Make sure to change and run
account_sid ='AC64206d20e1b11dc96240ecadaf2c3be6'
auth_token = '9a0929cb7848c0d68a72045c6a8234ff'
client = Client(account_sid, auth_token)
#cors = CORS(app, resources={"*": {"origins": "*"}})
#CORS(app)
model = pickle.load(open('svc.pkl', 'rb'))
@app.route("/predictCancer",methods=['POST'])
#@cross_origin()
def cancerPrediction():
    
    print(request.is_json)
    content=request.get_json(force=True)
    predValues=[[content['concavePointsWorst'],content['perimeterWorst'],content['concavePointsMean'],content['radiusWorst'],content['perimeterMean'],content['areaWorst'],content['radiusMean'],content['areaMean'],content['concavityMean'],content['concavityWorst']]]
    print(predValues)
    df = pd.DataFrame (predValues, columns = ['concavePointsWorst','perimeterWorst','concavePointsMean','radiusWorst','perimeterMean','areaWorst','radiusMean','areaMean','concavityMean','concavityWorst'])
    print(df.head(1))
    cols = df.select_dtypes(exclude=['float']).columns
    df[cols] = df[cols].apply(pd.to_numeric, downcast='float', errors='coerce')
    print(df.dtypes)
    for i in df:
     df[i]=df[[i]].apply(log_transform, axis=1)
    
    print(df)
    pred2=model.predict(df)
    #pred=model.predict([[17.99,	10.38,	122.80,	1001.0,	8.589,	153.40,	25.38,	17.33,	184.60,	2019.0]])
    #pred1=model.predict([[13.54,	14.36,	87.46,	566.3,	2.058,	23.56,	15.11,	19.26,	99.70,	711.2]])
    print(pred2[0])
    result=pred2[0]
    msg=""
    if result==0:
        msg='Benign'
    else:
        msg='Malignant'

    message = client.messages.create(
                              body=msg,
                              from_='+14122754329‬',
                              to='+14027801331‬'

                          )
    print(message.sid)                      
    return str(result)
def log_transform(col):
    #print(col)
    return np.log1p(col[0])
