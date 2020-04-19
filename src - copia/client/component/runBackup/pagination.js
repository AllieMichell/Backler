import React, { Component}  from 'react'
import {
         Grid,
        Button
        } from '@material-ui/core'

import './pagination.css'


function Pagination(props){
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(props.totalLogs /props.LogPerPage); i++){
        pageNumbers.push(i)
    }

    return(
        <Grid className='Grid' container justify='center'>
            <div className='buttonContainer' style={{background:'white', borderRadius:5}}>
            {
                pageNumbers.map(number => (
                    <Button onClick={props.paginate} className='button'  style={{padding:2, margin:7}}> 
                        {number}
                    </Button>
                ))
            }
            </div>
            
        </Grid>
    )
}


export default Pagination;