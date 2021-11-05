import { Component } from 'react';
import "./CancerPrediction.css"
import axios from 'axios';




class CancePrediction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            predictCancerReq: {
                concavePointsWorst:0.2654 ,
                perimeterWorst: 184.6,
                concavePointsMean:0.1471,
                radiusWorst: 25.38,
                perimeterMean: 122.8,
                areaWorst: 2019,
                areaMean: 1001,
                radiusMean:17.99,
                concavityMean: 0.3001,
                concavityWorst: 0.7119,
            },
            predictCancerResult: 0,
            predictResult:""
        }
    }
    concavePointsWorstChanged=(e) => {
        const predictCancerReq = this.state.predictCancerReq;
        predictCancerReq.concavePointsWorst = e.target.value;
        this.setState({
            predictCancerReq: predictCancerReq
        })
    }
    perimeterWorstChanged = (e) => {
            const predictCancerReq = this.state.predictCancerReq;
            predictCancerReq.perimeterWorst = e.target.value;
            this.setState({
                predictCancerReq: predictCancerReq
            })
        }
        concavePointsMeanChanged =(e) => {
            const predictCancerReq = this.state.predictCancerReq;
            predictCancerReq.concavePointsMean = e.target.value;
            this.setState({
                predictCancerReq: predictCancerReq
            })
        }
        radiusWorstChanged = (e) => {
            const predictCancerReq = this.state.predictCancerReq;
            predictCancerReq.radiusWorst = e.target.value;
            this.setState({
                predictCancerReq: predictCancerReq
            })
        }
        perimeterMeanChanged = (e) => {
            const predictCancerReq = this.state.predictCancerReq;
            predictCancerReq.perimeterMean = e.target.value;
            this.setState({
                predictCancerReq: predictCancerReq
            })
        }
     
        areaWorstChanged = (e) => {
            const predictCancerReq = this.state.predictCancerReq;
            predictCancerReq.areaWorst = e.target.value;
            this.setState({
                predictCancerReq: predictCancerReq
            })
        }

    radiusMeanChanged = (e) => {
        const predictCancerReq = this.state.predictCancerReq;
        predictCancerReq.radiusMean = e.target.value;
        this.setState({
            predictCancerReq: predictCancerReq
        })
    }
    areaMeanChanged = (e) => {
        const predictCancerReq = this.state.predictCancerReq;
        predictCancerReq.areaMean = e.target.value;
        this.setState({
            predictCancerReq: predictCancerReq
        })
    }
    concavityMeanChanged= (e) => {
        const predictCancerReq = this.state.predictCancerReq;
        predictCancerReq.concavityMean = e.target.value;
        this.setState({
            predictCancerReq: predictCancerReq
        })
    }
    concavityWorstChanged= (e) => {
        const predictCancerReq = this.state.predictCancerReq;
        predictCancerReq.concavityWorst = e.target.value;
        this.setState({
            predictCancerReq: predictCancerReq
        })
    }
  
   
    predictCancer = async () => {
        console.log(this.state.predictCancerReq)
        const validated = await this.validateValues();
        if (validated) {
            axios
                .post(
                    "http://127.0.0.1:5000/predictCancer", this.state.predictCancerReq
                )
                .then(response => {
                    console.log("Status Code : ", response.status);
                    if (response.status === 200) {
                        console.log(response);
                        this.setState({
                            predictCancerResult: response.data
                        })
                        if (response.data === 1) {
                          
                            this.setState({
                                predictResult:'Malignant'
                            })

                        }
                        else
                        this.setState({
                            predictResult:'Benign'
                        })
                     

                    }
                })
                .catch(error => {
                    console.log(error.response);

                });
        }
    }

    validateValues = () => {
        return new Promise((resolve, reject) => {
            const check = new RegExp("[+-]?([0-9]*[.])?[0-9]+$");
          
            if (check.exec(this.state.predictCancerReq.concavePointsWorst) === null) {
                alert("Please enter proper value for concave points worst")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.perimeterWorst) === null) {
                alert("Please enter proper value for perimeter worst")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.concavePointsMean) === null) {
                alert("Please enter proper value for concave points mean")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.radiusWorst) === null) {
                alert("Please enter proper value for radius worst")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.perimeterMean) === null) {
                alert("Please enter proper value for perimeter mean")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.areaWorst) === null) {
                alert("Please enter proper value for area worst")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.radiusMean) === null) {
                alert("Please enter proper value for radius mean")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.areaMean) === null) {
                alert("Please enter proper value for area mean")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.concavityMean) === null) {
                alert("Please enter proper value for concavity mean")
                return resolve(false);
            }
            if (check.exec(this.state.predictCancerReq.concavityWorst) === null) {
                alert("Please enter proper value for concavity worst")
                return resolve(false);
            }
            if (this.state.predictCancerReq.radiusMean>28.11 ||this.state.predictCancerReq.radiusMean<6.981) {
                alert("Please enter radius mean value between 6.98 and 28.11")
                return resolve(false);
            }



            if (this.state.predictCancerReq.areaWorst>4254 ||this.state.predictCancerReq.areaWorst<185.2) {
                alert("Please enter area worst value between 185.2 and 4254")
                return resolve(false);
            } if (this.state.predictCancerReq.perimeterWorst>251.2 ||this.state.predictCancerReq.perimeterWorst<50.41) {
                alert("Please enter perimeter worst value between 50.41 and 251.2")
                return resolve(false);
            } if (this.state.predictCancerReq.concavePointsWorst>0.291 ||this.state.predictCancerReq.concavePointsWorst<0) {
                alert("Please enter concave points worst value between 0 and 0.291")
                return resolve(false);
            } if (this.state.predictCancerReq.concavePointsMean>0.2012 ||this.state.predictCancerReq.concavePointsMean<0) {
                alert("Please enter concave points mean value between 0 and 0.2012")
                return resolve(false);
            } if (this.state.predictCancerReq.areaMean>2501 ||this.state.predictCancerReq.areaMean<143.5) {
                alert("Please enter area mean value between 143.5 and 2501")
                return resolve(false);
            } if (this.state.predictCancerReq.radiusWorst>36.04 ||this.state.predictCancerReq.radiusWorst<7.93) {
                alert("Please enter radius worst value between 7.93 and 36.04")
                return resolve(false);
            } if (this.state.predictCancerReq.concavityMean>0.4268 ||this.state.predictCancerReq.concavityMean<0) {
                alert("Please enter concavity mean value between 0 and 0.4268")
                return resolve(false);
            }
            if (this.state.predictCancerReq.perimeterMean>188.5 ||this.state.predictCancerReq.perimeterMean<43.79) {
                alert("Please enter perimeter mean value between 43.79 and 188.5")
                return resolve(false);
            } if (this.state.predictCancerReq.concavityWorst>1.252||this.state.predictCancerReq.concavityWorst<0) {
                alert("Please enter concavity worst value between 0 and 1.252")
                return resolve(false);
            }

            
            return resolve(true);
        })
    }
    render() {
        let result=null;
        if(this.state.predictResult.length>0)
        {
            if(this.state.predictCancerResult===0)
            {
                result= <span className="safe"> {this.state.predictResult}</span>
            }
            else
            result= <span className="risk"> {this.state.predictResult}</span>

        }
        return (
            <div className="predictionFeatures">
                <h1>Breast Cancer Prediction</h1>
                <div className="predGridContainer">

                    <div className="predDetails1">
                        <div className="editConcavePointsWorst">
                            <span className="predLabels" >Concave Points Worst</span><br />

                            <input type="text" name="concavePointsWorst" className="predData" style={{ height: '30px', marginTop: '15px' }} value={this.state.predictCancerReq.concavePointsWorst} onChange={this.concavePointsWorstChanged} />
                        </div>
                        <div className="editPerimeterWorst">
                            <span className="predLabels">Perimeter Worst</span><br />
                            <input type="text" name="perimeterWorst" className="predData" value={this.state.predictCancerReq.perimeterWorst} onChange={this.perimeterWorstChanged} />
                        </div>
                        <div className="editConcavePointsMean">
                            <span className="predLabels" >Concave Points Mean</span><br />

                            <input type="text" name="concavePointsMean" className="predData" style={{ height: '30px', marginTop: '15px' }} value={this.state.predictCancerReq.concavePointsMean} onChange={this.concavePointsMeanChanged} />
                        </div>
                        <div className="editRadiusWorst">
                            <span className="predLabels">Radius Worst</span><br />
                            <input type="text" name="radiusWorst" className="predData" value={this.state.predictCancerReq.radiusWorst} onChange={this.radiusWorstChanged} />
                        </div>

                        <div className="editPerimeterMean">
                            <span className="predLabels">Perimeter Mean</span><br />
                            <input type="text" name="perimeterMean" className="predData" value={this.state.predictCancerReq.perimeterMean} onChange={this.perimeterMeanChanged} />
                        </div>

                    </div>
                    <div className="predDetails2">
                        
                        <div className="editAreaWorst">
                            <span className="predLabels">Area Worst</span><br />
                            <input type="text" name="areaWorst" className="predData" value={this.state.predictCancerReq.areaWorst} onChange={this.areaWorstChanged} />
                        </div>



                        <div className="editRadiusMean">
                            <span className="predLabels">Radius Mean</span><br />
                            <input type="text" name="radiusMean" className="predData" value={this.state.predictCancerReq.radiusMean} onChange={this.radiusMeanChanged} />
                        </div>


                        <div className="editAreaMean">
                            <span className="predLabels">Area Mean</span><br />
                            <input type="text" name="areaMean" className="predData" value={this.state.predictCancerReq.areaMean} onChange={this.areaMeanChanged} />
                        </div>

                        <div className="editConcavityMean">
                            <span className="predLabels">Concavity Mean</span><br />
                            <input type="text" name="concavityMean" className="predData" value={this.state.predictCancerReq.concavityMean} onChange={this.concavityMeanChanged} />
                        </div>
                        <div className="editConcavityWorst">
                            <span className="predLabels">Concavity Worst</span><br />
                            <input type="text" name="concavityWorst" className="predData" value={this.state.predictCancerReq.concavityWorst} onChange={this.concavityWorstChanged} />
                        </div>

                    </div>

                </div>
                <button className="predictBtn" onClick={this.predictCancer}>Predict</button>
          <br/><br/>
        {result}
            </div>
        );
    }
}

export default CancePrediction;