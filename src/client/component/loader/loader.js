import React, {Component} from 'react';
import './loader.scss'
import Lottie from 'react-lottie'
import loadData from './11496-hourglass.json'
import Backup from './BACKUP.json'

const defaultOptions = {
    loop : true,
    autoplay: true,
    rendererSettings:{
        preserveAspectRatio: 'xMidYMid slice'
    }
}
export default class Loader extends Component{
    render(){
        return(
            <div>
                <Lottie options={{animationData:Backup, ...defaultOptions }}/>
            </div>
        )
    }
}