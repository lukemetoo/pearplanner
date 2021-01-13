import React from 'react'
import loadingGif from './loading.gif'

function LoadingGif(props) {

    return (
        <div>
            <img class="loadingGif" src={loadingGif} alt="Loading your class data..." />
        </div>
    );
}

export default LoadingGif;