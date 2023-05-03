import React from "react";
// import { Link} from "react-router-dom";

function Resources() {
    return (
    <>
        <div className="min-h-screen">
            <div className="flex font">
                <div className="md:w-1/2 flex items-center">
                    <div>
                        <h1 className="text-5xl ml-12 mt-10 text-teal-700">
                            Resources
                        </h1>
                        <div className="ml-12 my-3 text-xl">
                            <p>
                                Let's set you up for success
                            </p>
                        </div>

                        <div className="ml-12 mr-10 leading-relaxed">
                            <p>
                                At Mooditor we believe mental health is a crucial aspect of our overall
                                well-being. It affects how we think, feel, and behave in our daily lives.
                                Whether you are struggling with anxiety, depression, or any other mental
                                health issue, it is important to seek help and support. This resource page
                                provides a range of helpful tools and information to assist you on your
                                mental health journey. From therapy and medication options to self-care
                                strategies and support groups, we aim to provide you with the resources you
                                need to improve your mental health and live a happier, healthier life.
                            </p>
                        </div>
                    </div>
                </div>


                <div className="md:w-1/2 flex ml-10 mt-10 mr-10">
                    <div className="mx-12">

                        <div className="">
                            <h2 className="text-3xl mb-3 text-teal-700">Find a therapist near you on Psychology Today</h2>
                            <a className="hover:text-sky-900" href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer">www.psychologytoday.com</a>
                            <p className="mt-3 leading-relaxed">
                                Psychology Today's Therapy Directory lists clinical professionals, psychiatrists
                                and treatment centers who provide mental health services in the US and internationally.
                            </p>
                        </div>

                        <div className="my-8">
                            <h2 className="text-3xl mb-3 text-teal-700">988 Crisis Lifeline</h2>
                            <a className="hover:text-sky-900" href="https://988lifeline.org/" target="_blank" rel="noopener noreferrer">988lifeline.org</a>
                            <p className="mt-3 leading-relaxed">
                                988 Suicide & Crisis Lifeline provides free and confidential emotional
                                support to people in suicidal crisis or emotional distress 24 hours a day,
                                7 days a week, across the United States.

                            </p>
                        </div>

                        <div className="my-8">
                            <h2 className="text-3xl mb-3 text-teal-700">Crisis Textline</h2>
                            <a className="hover:text-sky-900" href="https://www.crisistextline.org/" target="_blank" rel="noopener noreferrer">https://www.crisistextline.org/</a>
                            <p className="mt-3 leading-relaxed">
                                Crisis Text Line serves anyone, in any type of crisis, providing access to free, 24/7 support.
                            </p>
                        </div>

                        <div className="my-5">
                            <h2 className="text-3xl mb-3 text-teal-700">Mental Health Resource Center</h2>
                            <a className="hover:text-sky-900" href="https://jedfoundation.org/mental-health-resource-center/" target="_blank" rel="noopener noreferrer">https://jedfoundation.org/mental-health-resource-center/</a>
                            <p className="mt-3 leading-relaxed">
                                The Jed Foundation is a non-profit organization that protects emotional health and prevents
                                suicide for teens and young adults in the United States. JED partners with high schools and
                                colleges to strengthen their mental health, substance misuse and suicide prevention programs and systems.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
    );
}
export default Resources;
