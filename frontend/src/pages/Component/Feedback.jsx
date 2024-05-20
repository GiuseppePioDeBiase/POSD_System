function Feedback(){
  return (
      <div className="max-w-5xl mx-auto mt-16 flex w-full flex-col border rounded-lg bg-white p-9 h-50">
        <h2 className="title-font mb-1 text-5xl font-medium text-gray-900 text-center">Feedback</h2>
        <p className="mb-7 leading-relaxed text-gray-600 text-center">Lascia un feedback sulla tua personale esperienza sul sito
          with us!
        </p>
        <div className="mb-4">
          <label htmlFor="Text" className="text-sm leading-7 text-2xl text-gray-600">Oggetto</label>
          <input type="text" id="text" name="Oggetto"
                 className="w-full rounded border border-gray-300 bg-white py-1 px-3 text-base leading-8 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"/>
        </div>
        <div className="mb-4">
          <label htmlFor="message" className="text-sm leading-7  text-2xl text-gray-600">Messaggio</label>
          <textarea id="message" name="message"
                    className="h-64 w-full resize-none rounded border border-gray-300 bg-white py-1 px-3 text-base leading-6 text-gray-700 outline-none transition-colors duration-200 ease-in-out focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"></textarea>
        </div>
        <button
            className="rounded border-40 bg-purple-500 py-3 px-6 text-lg text-white hover:bg-green-600 focus:outline-none">Invia
        </button>
      </div>
  );

}

export default Feedback