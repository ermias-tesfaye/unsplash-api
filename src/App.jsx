import { useEffect, useState } from 'react';

function App() {
  const API_KEY = import.meta.env.VITE_UNSPLASH_API_KEY;
  const [images, setImages] = useState([]);
  const [search, setSearch] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('office');

  const URL = `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${query}`;

  const getImage = async () => {
    try {
      const response = await fetch(URL, {
        headers: {
          Authorization: `Client-ID ${API_KEY}`,
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const result = data.results;
      console.log(result);
      setImages(result);
    } catch (error) {
      console.error('Error fetching data from Unsplash:', error);
      setImages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    getImage();
  }, [query]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  };

  return (
    <main className="bg-[#fdf5f1] min-h-screen px-2 py-8 flex flex-col items-center justify-center font-main">
      {isLoading ? (
        <div className="flex items-center justify-center h-full">
          <p className="text-2xl font-bold">Loading...</p>
        </div>
      ) : (
        <section className="mx-auto max-w-[1000px] w-full">
          <h1 className="text-center text-3xl font-extrabold tracking-wider my-4">
            Unsplash API Image Generator
          </h1>
          <form
            action=""
            onSubmit={handleSubmit}
            className="flex justify-center gap-4 my-16 max-w-[800px] mx-auto"
          >
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              className="w-[70%] rounded-md px-4"
            />
            <button
              type="submit"
              className="inline-block w-[20%] bg-[#9e2fdc] text-white text-lg font-bold py-2 rounded-lg"
            >
              Search
            </button>
          </form>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {images.length > 0 ? (
              images.map((image) => (
                <div
                  key={image.id}
                  className="overflow-hidden rounded h-[300px]"
                >
                  <img
                    src={image.urls.small}
                    alt={image.description}
                    className="object-cover w-full h-full"
                  />
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center  ">
                <p className="text-center font-bold my-16 text-2xl">
                  No images found
                </p>
              </div>
            )}
          </div>
        </section>
      )}
    </main>
  );
}

export default App;
