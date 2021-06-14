import React from 'react';
import {BrowserRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import Routes from './Routes';
import Layer from '../components/Layer'
import {connect} from "react-redux";
require("../../static/css/front.less");

const reducer = ({ main }) => ({ main });

class index extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <BrowserRouter>
                <Layer>
                    {renderRoutes(Routes)}
                </Layer>
            </BrowserRouter>
        )
    }
}
export default  connect(reducer)(index);
