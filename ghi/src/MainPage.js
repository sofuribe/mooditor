import React from 'react'
import { Link } from "react-router-dom";

function MainPage(){
    return (
        <div className="min-h-screen">
            <h1 className='text-center mt-14 text-5xl'>welcome to mooditor!</h1>
            <div className="flex flex-wrap my-8 mx-4">
                <div className="w-full md:w-1/3 flex items-center">
                    <img className="align-top h-96 flex-shrink-0" src="img/brainGif2.gif" alt="people talking"/>
                </div>
                <div className="w-full md:w-2/3 flex items-center">
                    <div className=' h-96 mt-12 bg-orange-200 rounded-md text-black items-start max-w-screen-lg mx-auto px-8'>
                    <h2 className="text-3xl text-center pt-8 mt-5 underline underline-offset-4 decoration-2">who we are</h2>
                    <p className="text-m text-center m-10">Lorem ipsum dolor sit amet, velit definitiones definitionem eu his, at oratio persius dissentiet nam. Habemus abhorreant cum in, summo fabellas ei vim, nam ea facilis erroribus corrumpit. Mel eius Lorem ipsum dolor sit amet, velit definitiones definitionem eu his, at oratio persius dissentiet nam. Habemus abhorreant cum in, summo fabellas ei vim, nam ea facilis erroribus corrumpit. Mel eius</p>
                        <div className="flex justify-center items-center">
                        <Link to="signup">
                            <button className="bg-orange-400 hover:ring-2 hover:-translate-y-2 ring-black text-black py-5 px-4 rounded-full font-bold">create an account</button>
                        </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-black h-1 my-24"></div>
                <div className="text-center text-4xl mb-8">what you'll find</div>
                <div className="flex flex-col justify-center  md:flex-row md:justify-center md:items-stretch text-xl">
                    <div className="flex items-center flex-col md:mx-20 py-8 hover:-translate-y-5">
                        <div className="w-64 h-64 bg-teal-700 rounded-full"></div>
                        <div className="mt-14 text-center">track how you are feeling</div>
                    </div>
                    <div className="flex items-center flex-col mx-4 md:mx-20 py-8 hover:-translate-y-5">
                        <div className="w-64 h-64 bg-teal-700 rounded-full"></div>
                        <div className="mt-14 text-center">set daily goals</div>
                    </div>
                    <div className="flex items-center flex-col mx-4 md:mx-20 py-8 hover:-translate-y-5">
                        <div className="w-64 h-64 bg-teal-700 rounded-full"></div>
                        <div className="mt-14 text-center">reflect on your day</div>
                    </div>
                </div>
            <div className="bg-black h-1 my-24"></div>
                <div className="text-center text-4xl mb-8 my-28">mindful creators</div>
                <div className="bg-orange-200 rounded-md p-16 mx-16">
                    <div className="flex flex-col justify-center md:flex-row md:justify-center md:items-stretch text-xl mt-4">
                        <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                            <div className="w-52 h-52 bg-teal-700 rounded-full border-2 border-black"></div>
                            <div className="mt-10 font-bold text-center">Sofia Uribe</div>
                            <div className="mt-2 text-center text-base">Software Engineer</div>
                        </div>
                        <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                            <div className="w-52 h-52 bg-teal-700 rounded-full border-2 border-black"></div>
                            <div className="mt-10 font-bold text-center">Jackie Liu</div>
                            <div className="mt-2 text-center text-base">Software Engineer</div>
                        </div>
                        <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                            <div className="w-52 h-52 bg-teal-700 rounded-full border-2 border-black"></div>
                            <div className="mt-10 font-bold text-center">Terence Wong</div>
                            <div className="mt-2 text-center text-base">Software Engineer</div>
                        </div>
                        <div className="flex items-center flex-col mx-4 md:mx-10 md:my-0 my-4 hover:-translate-y-5">
                            <div className="w-52 h-52 bg-teal-700 rounded-full border-2 border-black"></div>
                            <div className="mt-10 font-bold text-center">Brooke Crockett</div>
                            <div className="mt-2 text-center text-base">Software Engineer</div>
                        </div>
                    </div>
                </div>
        </div>
    )
}

export default MainPage;

            {/* <div className="my-28">
                <div className="bg-orange-200 h-20 border-t-4 border-b-4 border-black">
                    <div className="text-center text-4xl"></div>
                </div>
            </div> */}
