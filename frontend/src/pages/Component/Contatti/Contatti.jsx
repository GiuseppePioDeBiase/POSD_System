// eslint-disable-next-line no-unused-vars
import "./Contatti.css"
function Contatti() {
    return (
        <>
            <div className="container mx-auto py-8">
                <div className="text-center mb-8">

                    <h2 className="text-3xl font-semibold">Il Terzetto</h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">

                    <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s"
                         style={{visibility: 'visible', animationDelay: '0.2s', animationName: 'fadeInUp'}}>
                        {/* Team Thumb */}
                        <div className="advisor_thumb">
                            <img src="Lorenzo.jpg" alt="Lorenzo Calabrese"/>
                        </div>
                        {/* Team Details */}
                        <div className="single_advisor_details_info">
                            <h6>Lorenzo Calabrese</h6>
                            <p className="designation">Frontend</p>
                        </div>
                    </div>
                    {/* Single Advisor */}
                    <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.3s"
                         style={{visibility: 'visible', animationDelay: '0.3s', animationName: 'fadeInUp'}}>
                        {/* Team Thumb */}
                        <div className="advisor_thumb">
                            <img src="Kekko.jpg" alt="Francesco Conforti"/>

                        </div>
                        {/* Team Details */}
                        <div className="single_advisor_details_info">
                            <h6>Francesco Conforti</h6>
                            <p className="designation">Backend nel tempo libero, gestisco le cacate che produciamo!</p>
                        </div>
                    </div>
                    {/* Single Advisor */}
                    <div className="single_advisor_profile wow fadeInUp" data-wow-delay="0.4s"
                         style={{visibility: 'visible', animationDelay: '0.4s', animationName: 'fadeInUp'}}>
                        {/* Team Thumb */}
                        <div className="advisor_thumb">
                            <img src="peppe.png" alt="Giuseppe Pio De Biase"/>

                        </div>
                        {/* Team Details */}
                        <div className="single_advisor_details_info">
                            <h6>Giuseppe Pio Debiase</h6>
                            <p className="designation">Frontend</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Contatti