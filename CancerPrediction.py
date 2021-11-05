import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)

import seaborn as sns
from sklearn.svm import SVC
import matplotlib
import matplotlib.pyplot as plt
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.tree import DecisionTreeClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.feature_selection import SelectKBest
from sklearn.feature_selection import chi2
from sklearn.metrics import f1_score,confusion_matrix
from sklearn.metrics import accuracy_score, precision_score, recall_score, f1_score, roc_auc_score, classification_report
import pickle
#from dataprep.eda import create_report
import warnings
warnings.filterwarnings('ignore')

class CancerPrediction:
    def load_data(self):
         data = pd.read_csv("data.csv")
         data.drop(['Unnamed: 32', 'id'],axis = 1 ,inplace = True)
         data.isnull().sum().sum()
         data["diagnosis"] = [1 if i.strip() == "M" else 0 for i in data.diagnosis]
         return data

    def selectFeatures(self,data):
         #select_feature = SelectKBest(chi2, k=10).fit(data.drop('diagnosis',axis = 1 ), data['diagnosis'])
         #select_feature.transform(data.drop('diagnosis',axis = 1))
         #selected_columns = np.array(data.drop('diagnosis',axis = 1).columns)[select_feature.get_support()]
         #selected_columns=['concave points_worst','perimeter_worst','concave points_mean','radius_worst','perimeter_mean','area_worst','radius_mean','area_mean','concavity_mean','concavity_worst']
         #Selected_df = pd.DataFrame(select_feature.transform(data.drop('diagnosis',axis = 1)),columns=selected_columns)
         Selected_df=data[['concave points_worst','perimeter_worst','concave points_mean','radius_worst','perimeter_mean','area_worst','radius_mean','area_mean','concavity_mean','concavity_worst']]
         y = data.diagnosis
         return Selected_df,y

    def log_transform(self,col):
        return np.log1p(col[0])

    def trainAndTestData(self,Selected_df,y):
        X_train, X_test, y_train, y_test = train_test_split(Selected_df, y, test_size=0.2, random_state=42)
        return X_train, X_test, y_train, y_test

    def logreg(self,X_train, X_test, y_train, y_test):
        clf = LogisticRegression(random_state=0).fit(X_train, y_train)
        #y_pred = clf.predict(X_test)
        pickle.dump(clf, open('model.pkl','wb'))
        model = pickle.load(open('model.pkl','rb'))
        y_pred = model.predict(X_test)
        print(y_pred)
        print(f"Classsification Report:{classification_report(y_test,y_pred)}")
        confmat = confusion_matrix(y_test,y_pred)
        sns.heatmap(confmat,annot=True,fmt="d")

    def svc(self,X_train, X_test, y_train, y_test):
        svc = SVC(kernel = 'linear', random_state = 0).fit(X_train,y_train)
        pickle.dump(svc, open('svc.pkl','wb'))
        #y_pred_svc_v= svc.predict(X_v)
        #print(f"Classsification Report(Validation set):\n{classification_report(y_v,y_pred_svc_v)}")
        y_pred_svc= svc.predict(X_test)
        print(f"Classsification Report(Test set):\n{classification_report(y_test,y_pred_svc)}")

if __name__ == "__main__":
 cancerPrediction=CancerPrediction()
 data=cancerPrediction.load_data()
 Selected_df,y=cancerPrediction.selectFeatures(data)
 print(Selected_df.head(5))
 list_columns= list(Selected_df.columns)
 li=list_columns
 for i in li:
    Selected_df[i]=Selected_df[[i]].apply(cancerPrediction.log_transform, axis=1)
 print(Selected_df.head(5))
 X_train, X_test, y_train, y_test=cancerPrediction.trainAndTestData(Selected_df,y)

 cancerPrediction.svc(X_train, X_test, y_train, y_test)
 

 