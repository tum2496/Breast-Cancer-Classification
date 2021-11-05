# Breast Cancer Prediction
## Description
> We are going to predict most likely women is prone to breast cancer based on the features selected. We are going to use different algorithms with different features and come up with solution by taking features and algorithm which gives better prediction.
## Attribute Information
1) ID number. 
2) Diagnosis (M = malignant, B = benign)

Ten real-valued features are computed for each cell nucleus:  

a) radius (mean of distances from center to points on the perimeter)\
b) texture (standard deviation of gray-scale values)\
c) perimeter\
d) area\
e) smoothness (local variation in radius lengths)\
f) compactness (perimeter^2 / area - 1.0)\
g) concavity (severity of concave portions of the contour)\
h) concave points (number of concave portions of the contour)\
i) symmetry\
j) fractal dimension ("coastline approximation" - 1)\

The mean, standard error and "worst" or largest (mean of the three
largest values) of these features were computed for each image,
resulting in 30 features. For instance, field 3 is Mean Radius, field
13 is Radius SE, field 23 is Worst Radius.
## Dataset
[Kaggle Dataset](https://www.kaggle.com/uciml/breast-cancer-wisconsin-data)


## Data Pre-Processing
The target was converted into 0 and 1.
Skewness is removed for the selected features using log function.

## Feature Engineering
We have tried using different functions like selecting the k best features, PCA to see if which of them offer better accuracy.
## Model
Different models have been tried like Logistic Regerssion, Random Forest Classifier, Decision Tree Classifier, K Neighbors Classifier, Gaussian Naive Bayes and SVM Classifier. 

SVM CLassifier with kernel as linear gives us the best accuracy

## Project Timeline
1. We did initial exploration and used a base model Logistic regression where we were getting an accuracy of 95%. 
2. Later we tried to see if accuracy increases with other models and it did increase to 96% being the highest.
3. Next we tried Select K best features where we experimented with different number of features and achieved highest accuracy of 97% with SVM linear kernel.
4. After that we tried PCA, where we tried to find the best value for the number fo components by plotting the explained variance with the number of features and also tried with different explained variance(95%-99%) and we achieved a accurcay of 98%.
5. We also removed the skewness and tried using the top 10 correlated features and it also got an accuracy of 98% SVM (Kernel Linear).
## Contributions
  
* Bharath Jagini (015260232) - Front-End API, Random Forest Classifier and Decision Tree Classifier
  
* Premchand Jayachandran (015326428) - PCA, SVM and Gaussian NB.

* Tanay Ganeriwal (015278042) - Data Visualization(Finding correlation bar graph and plotting histograms) and KNN
  
* Tejas Mahajan (015319421) - Initial Data exploration, removing skewness and Logistic regression.

