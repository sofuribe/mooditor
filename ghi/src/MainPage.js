import React from 'react'
import { Link } from "react-router-dom";

function MainPage(){
    return (
        <>
            <h1 className='text-center pt-10 text-5xl'>welcome to mooditor!</h1>
            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 flex items-center">
                    <img className="align-top h-auto" src="img/testing.png" alt="people talking" />
                </div>
                <div className="w-full md:w-2/3">
                    <div className=' h-96 mt-12 mx-12 bg-orange-200 text-black py-2 px-4 rounded items-start'>
                    <h2 className="text-3xl text-center pt-5 mt-5">who we are</h2>
                    <p className="text-m text-center m-10 mx-16">Lorem ipsum dolor sit amet, velit definitiones definitionem eu his, at oratio persius dissentiet nam. Habemus abhorreant cum in, summo fabellas ei vim, nam ea facilis erroribus corrumpit. Mel eius </p>
                        <div className="flex justify-center items-center">
                        <Link to="signup">
                            <button className="bg-orange-400 hover:ring-2 ring-orange-100 text-black py-2 px-4 rounded-full">create an account</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default MainPage;
