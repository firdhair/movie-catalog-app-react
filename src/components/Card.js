import React from 'react';
const Card = (props) => {
    //console.log("ini card")
    const {final2, final} = props;
    const movieWrapper = document.querySelector(".movie-wrapper");
    console.log("final2: ",final2, ", final: ", final)
    return(
         <div>
            {final2.filter(function(info, i){
                //console.log("info i: ",i)
                let id = info.i
                
                console.log("ini info: ", id)
                if(i === 0){
                    return false
                }
                return true;
            }).map((info) => {
            return(
                movieWrapper.innerHTML += `
                    <div class="col-6 col-sm-6 col-md-6 col-lg-4 kartu">
                        <div class="card-body">
                            <img src="${info.poster}" key={}>
                            <h5 class="card-title">${info.title}  ${info.year}</h5>
                            <p>${info.plot}</p>
                        </div>
                    </div>
                    `
            )
            })}
        </div>
    )
}

export default Card