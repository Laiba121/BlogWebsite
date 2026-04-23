import { useEffect, useState } from "react"
import { getArticles, getCategories } from "../api"
import { Link } from "react-router-dom"

export default function HomePage() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])

  useEffect(() => {
    getArticles().then(setArticles)
    getCategories().then(setCategories)
  }, [])

  const latest = articles.slice(0, 3)
  const featured = articles.filter(a => a.featured)

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white px-10 py-16">
        <h1 className="text-4xl font-bold mb-2">
          CareerPulse Blog 🚀
        </h1>
        <p className="text-lg">
          Learn skills. Build career. Stay updated.
        </p>
      </section>

      {/* TOP SECTION */}
      <section className="px-10 py-10 grid md:grid-cols-3 gap-6">

        {/* LEFT - LATEST */}
        <div className="md:col-span-2">

          <div className="flex justify-between mb-4">
            <h2 className="text-2xl font-bold">Latest Articles</h2>

            <Link to="/articles" className="text-blue-600 font-semibold">
              View More →
            </Link>
          </div>

          <div className="space-y-4">
            {latest.map(a => (
              <Link
                key={a.slug}
                to={`/articles/${a.slug}`}
                className="bg-white flex gap-4 p-3 rounded shadow hover:shadow-lg"
              >
                <img
                  src={a.image}
                  className="w-24 h-24 object-cover rounded"
                />

                <div>
                  <h3 className="font-bold">{a.title}</h3>
                  <p className="text-sm text-gray-500">
                    {a.category} • {a.readTime}
                  </p>
                  <p className="text-sm text-gray-600">
                    {a.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* RIGHT HERO BOX */}
        <div className="bg-white p-5 rounded shadow text-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1995/1995574.png"
            className="w-32 mx-auto"
          />
          <h3 className="font-bold mt-4">Build Your Career</h3>
          <p className="text-sm text-gray-500">
            Learn high-income skills
          </p>
        </div>
      </section>

      {/* FEATURED */}
      <section className="px-10 py-10">
        <h2 className="text-2xl font-bold mb-6">⭐ Featured Articles</h2>

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map(a => (
            <Link
              key={a.slug}
              to={`/articles/${a.slug}`}
              className="bg-white rounded shadow hover:shadow-xl overflow-hidden"
            >
              <img src={a.image} className="h-40 w-full object-cover" />

              <div className="p-4">
                <h3 className="font-bold">{a.title}</h3>
                <p className="text-sm text-gray-600">
                  {a.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="px-10 py-10 bg-white">
        <h2 className="text-2xl font-bold mb-6">Browse Categories</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map(c => (
            <div
              key={c.slug}
              className="bg-gray-100 p-4 text-center rounded hover:bg-blue-100"
            >
              {c.name}
            </div>
          ))}
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="px-10 py-12 bg-blue-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">
          Subscribe to Newsletter
        </h2>
        <p className="mb-4">
          Get weekly career tips
        </p>

        <input
          className="p-2 rounded text-black"
          placeholder="Enter email"
        />
      </section>

    </div>
  )
}