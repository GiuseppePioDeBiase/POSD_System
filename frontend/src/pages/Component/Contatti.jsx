
function Contatti(){
    return (
        <div className="container mx-auto mt-5 p-6 flex justify-center">
            <div className="grid grid-cols-3 gap-6">



                <div className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer `}>

                    <h2 className="text-xl font-bold">Lorenzo Calarese</h2>
                    <p className="mt-2">Frontend developper</p>
                    <p>Email di lavoro: l.calabrese28@studebti.uniba.it</p>

                </div>
                <div className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer `}>
                    <h2 className="text-xl font-bold">Francesco Conforti</h2>
                    <p className="mt-2">Backend developper</p>
                    <p>Email di lavoro: f.conforti9@studenti.uniba.it</p>
                </div>

                <div className={`bg-white shadow-md rounded-lg p-4 hover:bg-gray-100 cursor-pointer `}>
                    <h2 className="text-xl font-bold">Giuseppe pio De biase</h2>
                    <p className="mt-2">Frontend developper</p>
                    <p>Email di lavoro: g.debiase5@studenti.uniba.it</p>
                </div>
            </div>
        </div>

    );
}

export default Contatti