import React, { useState, useEffect } from 'react';
import vid1 from './Videos/frog.mp4';
import vid2 from './Videos/fashion.mp4';
import vid3 from './Videos/tree.mp4';
import vid4 from './Videos/water.mp4';
import Video from './Video';


function Ioa() {
    //contains all the video sources
    const [sources, setSources] = useState([{ url: vid1 }, { url: vid2 }, { url: vid3 }, { url: vid4 }]);

    //this function contains the function we want to give every element being oberved
    //when the element intersects the screen i.e it is present on screen with more than threshold
    //then this work will be done
    const callback = entries => {
        entries.forEach(element => {
            console.log(element);
            let el = element.target.childNodes[0];
            //we are using this inside play function because play is asynchronous and will occur async if called like that
            //so that is why we are calling is like that
            el.play().then(() => {
                //if this video is  not in viewport then pause it
                if (!el.paused && !element.isIntersecting) {
                    el.pause();
                }
            })
        });
    }

    //making our observer which will observe and so the callback work if element is present more than threshold
    const observer = new IntersectionObserver(callback, {
        threshold: 0.9,
    });

    //using this to mount the observer to each element 
    //we have to do this once that is why we are using empty array
    useEffect(() => {
        console.log('effect');
        let elements = document.querySelectorAll('.videos');
        elements.forEach(el => {
            observer.observe(el);
        })

    }, []);
    return (
        <div className='video-container'>
            <div className='videos'>
                <Video source={sources[0].url} />
            </div>
            <div className='videos'>
                <Video source={sources[1].url} />

            </div>
            <div className='videos'>
                <Video source={sources[2].url} />
            </div>
            <div className='videos'>
                <Video source={sources[3].url} />

            </div>
            {/* {
                sources.map((sObj) => {
                    console.log(sObj);
                    <div className='videos'>
                        <Video source={sObj.url} />
                    </div>
                })
            } */}
        </div>
    )
}

export default Ioa
